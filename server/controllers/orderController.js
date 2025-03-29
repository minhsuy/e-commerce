import asyncHandler from "express-async-handler";
import slugify from "slugify";
import dotenv from "dotenv";
import Order from "../models/ordersModel.js";
import User from "../models/userModel.js";
import Coupon from "../models/couponModel.js";

dotenv.config();
export const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) await User.findByIdAndUpdate(_id, { address, cart: [] });

  const user = await User.findById(_id);
  if (!user) throw new Error("Cart is empty , can not create a order !");
  const rs = await Order.create({
    products,
    total,
    orderBy: _id,
    address,
    status,
  });
  return res.status(200).json({
    message: rs ? true : false,
    rs: rs,
  });
});
export const updateStatusOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  if (!oid) throw new Error("Missing id order !");
  const { status } = req.body;
  if (!status) throw new Error("Missing status order !");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    message: response ? true : false,
    response: response,
  });
});
export const getUserOrder = asyncHandler(async (req, res) => {
  // const { _id } = req.user;
  // const response = await Order.find({ orderBy: _id }).populate("orderBy");
  // return res.status(200).json({
  //   message: response ? true : false,
  //   data: response,
  // });
  const { _id } = req.user;
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  let formatedQueries = JSON.parse(queryString);
  // filter
  if (req.query && req?.query?.title) {
    formatedQueries.title = { $regex: req?.query?.title, $options: "i" };
  }
  let queryCommand = Order.find({ orderBy: _id, ...formatedQueries }).populate(
    "orderBy"
  );
  const page = +req.query.page || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  try {
    const response = await queryCommand;
    const counts = await Order.find({
      orderBy: _id,
      ...formatedQueries,
    }).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts: response ? counts : "0",
      data: response ? response : "No data found",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getOrderByAdmin = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  let formatedQueries = JSON.parse(queryString);
  // filter
  if (req.query && req?.query?.status) {
    formatedQueries.status = { $regex: req?.query?.status, $options: "i" };
  }
  const q = { formatedQueries };
  let queryCommand = Order.find(q).populate("orderBy");
  // sorting
  if (req.query && req.query?.sort) {
    let sorting = req?.query?.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sorting);
  }
  // fields limiting
  if (req.query && req.query?.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  const page = +req.query.page || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  try {
    const response = await queryCommand;
    const counts = await Order.find(q).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts: response ? counts : "0",
      data: response ? response : "No data found",
    });
  } catch (error) {
    throw new Error(error);
  }
});

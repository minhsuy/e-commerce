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
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    message: response ? true : false,
    response: response,
  });
});
export const getOrderByAdmin = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    message: response ? true : false,
    response: response,
  });
});

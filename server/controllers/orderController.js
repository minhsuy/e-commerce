import asyncHandler from "express-async-handler";
import slugify from "slugify";
import dotenv from "dotenv";
import Order from "../models/ordersModel.js";
import User from "../models/userModel.js";
import Coupon from "../models/couponModel.js";

dotenv.config();
export const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const user = await User.findById(_id).select("cart").populate("cart.product");
  if (!user) throw new Error("User not found , can not create a bill !");
  const products = user?.cart?.map((item) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color,
    price: item.product.price,
  }));
  if (!products) throw new Error("Not found item on cart !");
  let total = user?.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  if (coupon) {
    const checkCoupon = await Coupon.findOne({ name: coupon });
    if (!checkCoupon) throw new Error("Coupon not found!");
    if (Date.now() > checkCoupon.expiry) throw new Error("Coupon has expired!");
    total =
      Math.round((total * (1 - +checkCoupon.discount / 100)) / 1000) * 1000;
    const response = await Order.create({
      products,
      total,
      orderBy: _id,
      coupon: checkCoupon._id,
    });
    return res.status(200).json({
      message: response ? true : false,
      response,
    });
  }
  const response = await Order.create({ products, total, orderBy: _id });
  return res.status(200).json({
    message: response ? true : false,
    response,
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

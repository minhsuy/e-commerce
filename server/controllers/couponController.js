import asyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";
import dotenv from "dotenv";
dotenv.config();
export const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs !");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +(expiry * 24 * 60 * 60 * 1000),
  });
  return res.status(200).json({
    message: response
      ? "Create a new coupon successfully !"
      : "Create failed !",
    data: response ? response : "Not found !",
  });
});
export const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    message: response ? "Get all coupon successfully !" : "Create failed !",
    data: response ? response : "Not found !",
  });
});
export const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.expiry) {
    req.body.expiry = Date.now() + +(req.body.expiry * 24 * 60 * 60 * 1000);
  }
  if (req.body.discount) {
    req.body.discount = +req.body.discount;
  }
  const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
  return res.status(200).json({
    message: response ? "Update coupon successfully !" : "Updated failed !",
    data: response ? response : "Not found !",
  });
});
export const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) throw new Error("Missing coupon id!");
  const response = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    message: response ? "Delete coupon successfully !" : "Delete failed !",
  });
});

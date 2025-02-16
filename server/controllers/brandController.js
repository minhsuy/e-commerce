import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import dotenv from "dotenv";
dotenv.config();
export const createNewBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await Brand.create({ title });
  return res.status(200).json({
    message: result ? "Create a new brand successfully " : "Failed",
    result,
  });
});
export const getBrands = asyncHandler(async (req, res) => {
  const result = await Brand.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    message: result ? "Sucess" : "Failed",
    result,
  });
});
export const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await Brand.findByIdAndUpdate(bid, { title }, { new: true });
  return res.status(200).json({
    message: result ? "Update Sucess" : "Failed",
    result,
  });
});
export const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const result = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    message: result ? "Delete Sucess" : "Failed",
  });
});

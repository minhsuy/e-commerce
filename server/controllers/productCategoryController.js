import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ProductCategory from "../models/productCategoryModel.js";
import dotenv from "dotenv";
dotenv.config();
export const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await ProductCategory.create({ title });
  return res.status(200).json({
    message: result ? "Create a new category successfully " : "Failed",
    result,
  });
});
export const getCategories = asyncHandler(async (req, res) => {
  const result = await ProductCategory.find();
  return res.status(200).json({
    message: result ? "Success" : "Failed",
    result,
  });
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await ProductCategory.findByIdAndUpdate(
    pcid,
    { title },
    { new: true }
  );
  return res.status(200).json({
    message: result ? "Update Sucess" : "Failed",
    result,
  });
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const result = await ProductCategory.findByIdAndDelete(pcid);
  return res.status(200).json({
    message: result ? "Delete Sucess" : "Failed",
  });
});

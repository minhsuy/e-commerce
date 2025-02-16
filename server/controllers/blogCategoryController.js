import asyncHandler from "express-async-handler";
import slugify from "slugify";
import dotenv from "dotenv";
import BlogCategory from "../models/blogModel.js";
dotenv.config();
export const createBlogCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await BlogCategory.create({ title });
  return res.status(200).json({
    message: result ? "Create a new category successfully " : "Failed",
    result,
  });
});
export const getBlogCategories = asyncHandler(async (req, res) => {
  const result = await BlogCategory.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    message: result ? "Sucess" : "Failed",
    result,
  });
});
export const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const { title } = req.body;
  if (!title) throw new Error("Missing title !");
  const result = await BlogCategory.findByIdAndUpdate(
    bcid,
    { title },
    { new: true }
  );
  return res.status(200).json({
    message: result ? "Update Sucess" : "Failed",
    result,
  });
});
export const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const result = await BlogCategory.findByIdAndDelete(bcid);
  return res.status(200).json({
    message: result ? "Delete Sucess" : "Failed",
  });
});

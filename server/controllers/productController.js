import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
export const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs !");
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct ? newProduct : "Create a new product failed",
  });
});
export const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  if (!product)
    return res.status(404).json({
      message: "Product not found !",
    });
  return res.status(200).json({
    success: product ? true : false,
    message: product ? product : "Failed",
  });
});
// filtering , sorting & pagination
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products)
    return res.status(404).json({
      message: "Product not found !",
    });
  return res.status(200).json({
    success: products ? true : false,
    message: products ? products : "Failed",
  });
});
export const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs !");
  }
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  if (!updatedProduct)
    return res.status(404).json({
      message: "Product not found !",
    });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    message: updatedProduct ? updatedProduct : "Failed",
  });
});
export const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = await Product.findByIdAndDelete(pid);
  if (!updatedProduct)
    return res.status(404).json({
      message: "Product not found !",
    });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    message: updatedProduct ? updatedProduct : "Failed",
  });
});

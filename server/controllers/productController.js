import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import dotenv from "dotenv";
dotenv.config();
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
export const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  const formatedQueries = JSON.parse(queryString);
  // filter
  if (req.query && req?.query?.title) {
    formatedQueries.title = { $regex: req?.query?.title, $options: "i" };
  }
  let queryCommand = Product.find(formatedQueries);
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
  /* pagination : 
       + limit : số phần tử lấy về 1 lần gọi api
       + skip : 2 (bỏ qua 2 phần tử đầu tiên -> lấy từ phần tử thứ 3 )
    */
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  try {
    const response = await queryCommand;
    const counts = await Product.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts: response ? counts : "0",

      data: response ? response : "No data found",
    });
  } catch (error) {
    throw new Error(error);
  }
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
export const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs !");

  const ratingProduct = await Product.findById(pid);
  if (!ratingProduct) throw new Error("Product not found!");

  const alreadyRating = ratingProduct?.ratings?.some(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRating) {
    await Product.updateOne(
      { _id: pid, "ratings.postedBy": _id },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      { $push: { ratings: { star, comment, postedBy: _id } } },
      { new: true }
    );
  }
  // sum ratings :
  const updatedProduct = await Product.findById(pid);
  const totalStart =
    Math.round(
      (updatedProduct?.ratings?.reduce((sum, item) => sum + item.star, 0) *
        10) /
        updatedProduct?.ratings?.length
    ) / 10;
  updatedProduct.totalRatings = totalStart;
  await updatedProduct.save();
  return res
    .status(200)
    .json({ success: true, message: "Rating successfully!" });
});

export const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");
  if (!pid) throw new Error("Missing product id");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((item) => item.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedProduct: response ? response : "Can not updated",
  });
});

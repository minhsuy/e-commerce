import asyncHandler from "express-async-handler";
import slugify from "slugify";
import dotenv from "dotenv";
import Blog from "../models/blog.js";
dotenv.config();
export const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    message: response ? "Create a new post successfully " : "Failed",
    createdBlog: response ? response : "Cannot create a new blog ",
  });
});
export const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const { rid } = req.body;
  console.log(rid);
  if (!bid) throw new Error("Missing id of blog!");
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    message: response ? "Updated post successfully " : "Failed",
    updatedBlog: response ? response : "Cannot updated ",
  });
});
export const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    message: response ? "Get all post successfully " : "Failed",
    updatedBlog: response ? response : "Cannot get ",
  });
});

/*
  Khi nguời dùng like 1 bài blog :
 * 1 . check xem ng dùng có dislike hay không -> bỏ dislike
  2 . nếu k dislike : 
    + có like chưa -> thì bỏ like
    + chưa like -> thêm like
*/

export const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing blog id!");
  const blog = await Blog.findById(bid);
  if (!blog) throw new Error("Blog not found !");
  const alreadyDislike = blog.dislikes.find((item) => item.toString() === _id);
  if (alreadyDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
        $push: { likes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Like successfully" : "Failed",
    });
  }
  const alreadyLike = blog.likes.find((item) => item.toString() === _id);
  if (alreadyLike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Unlike successfully" : "Failed",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Like successfully" : "Failed",
    });
  }
});

export const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing blog id!");
  const blog = await Blog.findById(bid);
  if (!blog) throw new Error("Blog not found !");
  const alreadLike = blog.likes.find((item) => item.toString() === _id);
  if (alreadLike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
        $push: { dislikes: _id },
      },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Dislike successfully" : "Failed",
    });
  }
  const alreadyDislike = blog.dislikes.find((item) => item.toString() === _id);
  if (alreadyDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Undislike successfully" : "Failed",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      message: response ? "Dislike successfully" : "Failed",
    });
  }
});

// populate
export const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firstname lastname")
    .populate("dislikes", "firstname lastname");
  return res.status(200).json({
    message: blog ? "Successfully" : "Failed",
    rs: blog,
  });
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    message: blog ? "Delete Successfully" : "Delete Failed",
  });
});

import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategories,
  updateBlogCategory,
} from "../controllers/blogCategoryController.js";

const blogCategoryRouter = express.Router();
// create a new product category
blogCategoryRouter.post("/", verifyAccessToken, isAdmin, createBlogCategory);

// get all category
blogCategoryRouter.get("/", getBlogCategories);

// update category
blogCategoryRouter.put(
  "/:bcid",
  verifyAccessToken,
  isAdmin,
  updateBlogCategory
);

// delete category
blogCategoryRouter.delete(
  "/:bcid",
  verifyAccessToken,
  isAdmin,
  deleteBlogCategory
);

export default blogCategoryRouter;

import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/productCategoryController.js";

const productCategoryRouter = express.Router();
// create a new product category
productCategoryRouter.post("/", verifyAccessToken, isAdmin, createCategory);

// get all category
productCategoryRouter.get("/", getCategories);

// update category
productCategoryRouter.put("/:pcid", verifyAccessToken, isAdmin, updateCategory);

// delete category
productCategoryRouter.delete(
  "/:pcid",
  verifyAccessToken,
  isAdmin,
  deleteCategory
);

export default productCategoryRouter;

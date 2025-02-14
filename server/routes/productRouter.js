import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";

const productRouter = express.Router();
// create a new product
productRouter.post("/", verifyAccessToken, isAdmin, createProduct);

// get all products
productRouter.get("/", getProducts);

// updated product

productRouter.put("/:pid", verifyAccessToken, isAdmin, updateProduct);

// delete product

productRouter.delete("/:pid", verifyAccessToken, isAdmin, deleteProduct);

//get one product
productRouter.get("/:pid", getProduct);

export default productRouter;

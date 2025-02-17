import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  ratings,
  updateProduct,
  uploadImagesProduct,
} from "../controllers/productController.js";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import uploadCloud from "../config/cloudinary.config.js";
const productRouter = express.Router();
// create a new product
productRouter.post("/", verifyAccessToken, isAdmin, createProduct);

// get all products
productRouter.get("/", getProducts);

// rating
productRouter.put("/ratings", verifyAccessToken, ratings);

// updated product

productRouter.put("/:pid", verifyAccessToken, isAdmin, updateProduct);
// upload image
productRouter.put(
  "/uploadimage/:pid",
  verifyAccessToken,
  isAdmin,
  uploadCloud.array("images", 10),
  uploadImagesProduct
);

// delete product

productRouter.delete("/:pid", verifyAccessToken, isAdmin, deleteProduct);

//get one product
productRouter.get("/:pid", getProduct);

export default productRouter;

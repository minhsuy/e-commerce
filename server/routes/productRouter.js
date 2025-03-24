import express from "express";
import {
  addVariant,
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
productRouter.post(
  "/",
  verifyAccessToken,
  isAdmin,
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    {
      name: "thumb",
      maxCount: 1,
    },
  ]),
  createProduct
);

// get all products
productRouter.get("/", getProducts);

// rating
productRouter.put("/ratings", verifyAccessToken, ratings);

// add varriants
productRouter.post(
  "/varriant/:pid",
  verifyAccessToken,
  isAdmin,
  uploadCloud.fields([
    {
      name: "thumb",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  addVariant
);
// updated product

productRouter.put(
  "/:pid",
  verifyAccessToken,
  isAdmin,
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  updateProduct
);
// upload image
productRouter.put(
  "/uploadimage/:pid",
  verifyAccessToken,
  isAdmin,
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  uploadImagesProduct
);

// delete product

productRouter.delete("/:pid", verifyAccessToken, isAdmin, deleteProduct);

//get one product
productRouter.get("/:pid", getProduct);

export default productRouter;

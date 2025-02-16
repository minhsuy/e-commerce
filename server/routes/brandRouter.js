import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createNewBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandController.js";

const brandRouter = express.Router();
// create a new brand
brandRouter.post("/", verifyAccessToken, isAdmin, createNewBrand);

// get all brand
brandRouter.get("/", getBrands);

// update brand
brandRouter.put("/:bid", verifyAccessToken, isAdmin, updateBrand);

// delete brand
brandRouter.delete("/:bid", verifyAccessToken, isAdmin, deleteBrand);

export default brandRouter;

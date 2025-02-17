import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createNewCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "../controllers/couponController.js";

const couponRouter = express.Router();
// create a new brand
couponRouter.post("/", verifyAccessToken, isAdmin, createNewCoupon);

// get a new coupon

couponRouter.get("/", getCoupon);

// update coupon

couponRouter.put("/:cid", verifyAccessToken, isAdmin, updateCoupon);

// delete coupon
couponRouter.delete("/:cid", verifyAccessToken, isAdmin, deleteCoupon);

export default couponRouter;

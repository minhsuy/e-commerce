import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createOrder,
  getOrderByAdmin,
  getUserOrder,
  updateStatusOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();
// create a new order
orderRouter.post("/", verifyAccessToken, createOrder);

// updated status order

orderRouter.put("/status/:oid", verifyAccessToken, isAdmin, updateStatusOrder);

// get order
orderRouter.get("/", verifyAccessToken, getUserOrder);

// get order by admin
orderRouter.get("/admin", verifyAccessToken, isAdmin, getOrderByAdmin);

export default orderRouter;

import { notFound } from "../middlewares/errorHandler.js";
import blogCategoryRouter from "./blogCategoryRouter.js";
import blogRouter from "./blogRouter.js";
import brandRouter from "./brandRouter.js";
import couponRouter from "./couponRouter.js";
import insert from "./insert.js";
import orderRouter from "./orderRouter.js";
import productCategoryRouter from "./productCategoryRouter.js";
import productRouter from "./productRouter.js";
import usersRouter from "./userRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/user", usersRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodCategory", productCategoryRouter);
  app.use("/api/blogCategory", blogCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/insert", insert);
};

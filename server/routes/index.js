import { notFound } from "../middlewares/errorHandler.js";
import productRouter from "./productRouter.js";
import usersRouter from "./userRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/user", usersRouter);
  app.use("/api/product", productRouter);
};

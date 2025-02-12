import { errHandler, notFound } from "../middlewares/errorHandler.js";
import usersRouter from "./userRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/user", usersRouter);
  app.use(notFound);
  app.use(errHandler);
};

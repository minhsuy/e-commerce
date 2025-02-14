import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbconnect.js";
import usersRouter from "./routes/userRoutes.js";
import { initRoutes } from "./routes/index.js";
import { errHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
dbConnect();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.use(notFound);
app.use(errHandler);
app.listen(port, () => {
  console.log(`Port:`, port);
});

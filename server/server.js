import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbconnect.js";
import usersRouter from "./routes/userRoutes.js";
import { initRoutes } from "./routes/index.js";
dotenv.config();

const app = express();
dbConnect();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
  console.log(`Port:`, port);
});

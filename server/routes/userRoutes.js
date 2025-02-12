import express from "express";
import { registerController } from "../controllers/userController.js";

const usersRouter = express.Router();
usersRouter.get("/", (req, res) => {
  res.send("Active");
});

usersRouter.post("/register", registerController);
export default usersRouter;

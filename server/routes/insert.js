import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import { insertCategory, insertProduct } from "../controllers/insertData.js";

const insert = express.Router();
insert.post("/", insertProduct);
insert.post("/cate", insertCategory);

export default insert;

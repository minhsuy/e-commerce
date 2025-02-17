import express from "express";
import { isAdmin, verifyAccessToken } from "../middlewares/verifyToken.js";
import {
  createNewBlog,
  deleteBlog,
  dislikeBlog,
  getBlog,
  getBlogs,
  likeBlog,
  updateBlog,
  uploadImageBlog,
} from "../controllers/blogController.js";
import uploadCloud from "../config/cloudinary.config.js";

const blogRouter = express.Router();
// create a new blog
blogRouter.post("/", verifyAccessToken, isAdmin, createNewBlog);

//  get all blog
blogRouter.get("/", getBlogs);

//get one blog

blogRouter.get("/one/:bid", getBlog);

// update blog
blogRouter.put("/:bid", verifyAccessToken, isAdmin, updateBlog);

// delete blog
blogRouter.delete("/:bid", verifyAccessToken, isAdmin, deleteBlog);

// like blog
blogRouter.put("/likes/:bid", verifyAccessToken, likeBlog);

//dislike blog

blogRouter.put("/dislike/:bid", verifyAccessToken, dislikeBlog);

// update image
blogRouter.put(
  "/image/:bid",
  verifyAccessToken,
  isAdmin,
  uploadCloud.single("image"),
  uploadImageBlog
);

export default blogRouter;

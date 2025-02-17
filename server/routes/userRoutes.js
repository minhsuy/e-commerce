import express from "express";
import {
  deleteUser,
  forgotPassword,
  getCurrent,
  getUsers,
  loginController,
  logOut,
  refreshAccessToken,
  registerController,
  resetPassword,
  updateCart,
  updateUser,
  updateUserAddress,
  updateUserByAdmin,
} from "../controllers/userController.js";
import {
  isAdmin,
  verifyAccessToken,
  verifyRefreshToken,
} from "../middlewares/verifyToken.js";

const usersRouter = express.Router();
// register user
usersRouter.post("/register", registerController);

// login user
usersRouter.post("/login", loginController);

// get user

usersRouter.get("/current", verifyAccessToken, getCurrent);

// update accesstoken
usersRouter.post("/refreshtoken", verifyRefreshToken, refreshAccessToken);

//logout

usersRouter.post("/logout", verifyRefreshToken, logOut);

// forgot password
usersRouter.get("/forgotpassword", forgotPassword);

// reset password
usersRouter.put("/resetpassword", resetPassword);

// get all user : admin role

usersRouter.get("/", verifyAccessToken, isAdmin, getUsers);

// delete user : admin role
usersRouter.delete("/", verifyAccessToken, isAdmin, deleteUser);

//update user : user
usersRouter.put("/current", verifyAccessToken, updateUser);

// update address

usersRouter.put("/address", verifyAccessToken, updateUserAddress);

// update cart
usersRouter.put("/cart", verifyAccessToken, updateCart);

// update user : admin role
usersRouter.put("/:uid", verifyAccessToken, isAdmin, updateUserByAdmin);

export default usersRouter;

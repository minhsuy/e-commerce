import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
export const registerController = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  const result = await User.create(req.body);
  return res.status(200).json({
    data: result ? true : false,
    message: "Register succesfully",
    result,
  });
});

import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/generateAndVerifyToken.js";
import dotenv from "dotenv";
dotenv.config();
export const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Token is missing!" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = await verifyToken({
    token,
    privateKey: process.env.JWT_SECRET,
  });
  req.user = decoded;
  next();
});
export const verifyRefreshToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies;
  if (!token.refreshToken) throw new Error("Refresh token is missing ");
  const decoded = await verifyToken({
    token: token.refreshToken,
    privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
  });
  req.user = decoded;
  next();
});

export const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  console.log(role);
  if (+role !== 0)
    return res.status(401).json({
      success: false,
      message: "REQUIRED ADMIN ROLE !",
    });
  next();
});

import jwt from "jsonwebtoken";
import { TokenType } from "../enum/TokenType.js";
import { signToken } from "../utils/generateAndVerifyToken.js";

export const generateAccessToken = async ({ _id, role }) => {
  return await signToken({
    payload: {
      _id,
      role,
      tokenType: TokenType.accessToken,
    },
    role,
    privateKey: process.env.JWT_SECRET,
    options: {
      expiresIn: "60m",
    },
  });
};
export const generateRefreshToken = async ({ _id }) => {
  return await signToken({
    payload: {
      _id,
      tokenType: "refresh",
    },
    privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
    options: {
      expiresIn: "7d",
    },
  });
};

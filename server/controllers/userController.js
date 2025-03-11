import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { truncate } from "fs";
import makeToken from "uniqid";
dotenv.config();

// register with email verify

export const registerController = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("Email này đã tồn tại  , hãy chọn email khác !");
  else {
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
      mobile,
    });
    const registerToken = newUser.createRegisterToken();
    await newUser.save();
    const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký email  .Link sẽ hết hạn sau 15p. <a href=${process.env.URL_SERVER}/api/user/finalregister/${registerToken}>Click here</a>`;
    const data = {
      email,
      html,
      subject: "Xác thực email",
    };
    await sendMail(data);
    return res.json({
      success: true,
      message: "Vui lòng kiểm tra email để xác thực đăng ký !",
    });
  }
});

export const finalregister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const verifyToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ registerToken: verifyToken });
  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
  }
  user.registerToken = "";
  await user.save();
  return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
});

// login user

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found!");
  }
  if (user.registerToken !== "") {
    throw new Error("Please verify your email");
  } else {
    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      throw new Error("Wrong password!");
    } else {
      const { _id, password, role, ...userData } = user.toObject();
      const refreshToken = await generateRefreshToken({ _id: _id });
      const accessToken = await generateAccessToken({ _id: _id, role });
      await User.findByIdAndUpdate(_id, { refreshToken }, { new: true });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login successfully!",
        accessToken,
        userData: userData ? userData : false,
      });
    }
  }
});
export const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id }).select(
    "-refreshTone -password -role"
  );
  return res.status(200).json({
    message: "Get profile successfully !",
    user,
  });
});
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await User.findById({ _id, refreshToken });
  const newAccessToken = await generateAccessToken({
    _id,
    role: response.role,
  });
  return res.status(200).json({
    message: response ? "Success" : "Failed",
    success: response ? true : false,
    newAccessToken: response ? newAccessToken : "",
  });
});
export const logOut = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { refreshToken } = req.cookies;
  const response = await User.findByIdAndUpdate(
    { _id, refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    message: response ? "Logout Success" : "Failed",
    success: response ? true : false,
  });
});

/* reset password (change password , forgot password) : 
  1 . client gửi lên email 
  2 . check email có hợp lệ không -> gửi mail + kèm link (password change token)
  3 .client check mail -> click vào link
  4 . client sẽ gửi api kèm token 
  5 . check token có giống vs token mà server gửi mail hay không
*/
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email address !");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found !");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = `Xin vui lòng click vào link dưới đây để  thay đổi mật khẩu của bạn.Link sẽ hết hạn sau 15p. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs ? true : false,
    message: rs ? "Hãy check mail của bạn !" : "Đã bị lỗi , hãy thử lại sau !",
  });
});
export const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Updated password" : "Something went wrong",
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
export const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing id user !");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email}`
      : "No user delete",
  });
});
export const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs !");
  const response = await User.findByIdAndUpdate(_id, body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const { body } = req;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs !");
  const response = await User.findByIdAndUpdate(uid, body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
export const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  if (!address) throw new Error("Missing address !");
  // const user = await User.findById(_id);
  // const checkAddressExisxting = user.address.find((item) => item === address);
  // if (checkAddressExisxting) {
  //   throw new Error("Address already exsiting !");
  // }
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
export const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing inputs");

  const user = await User.findById(_id);
  if (!user) throw new Error("User not found!");

  const productExistingOnCart = user?.cart?.find(
    (item) => item.product.toString() === pid
  );

  if (productExistingOnCart) {
    if (productExistingOnCart.color === color) {
      const response = await User.findOneAndUpdate(
        { _id, "cart.product": pid, "cart.color": productExistingOnCart.color },
        {
          $set: {
            "cart.$.quantity": quantity + productExistingOnCart.quantity,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: response.cart,
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: { cart: { product: pid, quantity, color } },
        },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        message: "Product Add To Cart successfully",
        response,
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: { cart: { product: pid, quantity, color } },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: "Product Add To Cart successfully",
      response,
    });
  }
});

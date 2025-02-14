import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = asyncHandler(async ({ email, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Dùng SSL
    secure: true, // Bắt buộc true khi dùng port 465
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Cuahangdientu" <${process.env.EMAIL_NAME}>`,
    to: email,
    subject: "Forgot password",
    html: html,
  });

  return info;
});

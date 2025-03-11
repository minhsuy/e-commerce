import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = asyncHandler(async ({ email, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Cuahangdientu" <${process.env.EMAIL_NAME}>`,
    to: email,
    subject,
    html: html,
  });

  return info;
});

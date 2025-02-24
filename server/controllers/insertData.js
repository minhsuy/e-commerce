import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import categoryData from "../../data/cate_brand.js";
import ProductCategory from "../models/productCategoryModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "../../data/data2.json");

if (!fs.existsSync(dataPath)) {
  console.error(` Không tìm thấy file ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Date.now(),
    description: product?.description,
    brand: product?.brand,
    price: product?.price
      ? Math.round(Number(product?.price.match(/\d/g).join("")) / 100)
      : 0,
    category: product?.category?.[1] || "Unknown",
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images || [],
    color:
      product?.variants?.find((el) => el.label === "Color")?.variants?.[0] ||
      "N/A",
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
  });
};

export const insertProduct = asyncHandler(async (req, res) => {
  try {
    const promises = data.map((product) => fn(product));
    await Promise.all(promises);
    return res.json({ message: "Dữ liệu đã được chèn thành công!" });
  } catch (error) {
    console.error("LỖI khi chèn dữ liệu:", error);
    return res
      .status(500)
      .json({ message: "Lỗi trong quá trình chèn dữ liệu" });
  }
});
const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};
export const insertCategory = asyncHandler(async (req, res) => {
  try {
    const promises = categoryData.map((cate) => fn2(cate));
    await Promise.all(promises);
    return res.json({ message: "Dữ liệu đã được chèn thành công!" });
  } catch (error) {
    console.error("LỖI khi chèn dữ liệu:", error);
    return res
      .status(500)
      .json({ message: "Lỗi trong quá trình chèn dữ liệu" });
  }
});

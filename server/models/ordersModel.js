import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Succeed"],
  },
  total: Number,
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

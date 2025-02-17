import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;

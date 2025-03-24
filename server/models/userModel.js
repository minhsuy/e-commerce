import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [0, 1],
      default: 1,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
      },
    ],
    address: {
      type: String,
      lowercase: true,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    registerToken: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th?id=OIP.-4nY2ID2ybM6f3UnHOPaeQHaFj&pid=Api&P=0&h=180",
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods = {
  isCorrectPassword: async function (password) {
    {
      return await bcrypt.compare(password, this.password);
    }
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
  createRegisterToken: function () {
    const registerToken = crypto.randomBytes(32).toString("hex");
    this.registerToken = crypto
      .createHash("sha256")
      .update(registerToken)
      .digest("hex");
    return registerToken;
  },
};
const User = mongoose.model("User", userSchema);
export default User;

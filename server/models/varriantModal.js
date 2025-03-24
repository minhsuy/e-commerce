import mongoose from "mongoose";
const varriantSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
});

const Varriant = mongoose.model("Varriant", varriantSchema);
export default Varriant;

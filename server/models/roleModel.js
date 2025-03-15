import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);
export default Role;

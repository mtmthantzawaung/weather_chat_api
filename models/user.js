const mongoose = require("mongoose");
const { USER_ROLES, ROLE_VALUES } = require("../utils/constants/role");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    role: { type: String, enum: ROLE_VALUES, default: USER_ROLES.USER },
    age: { type: Number },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Users", userSchema);

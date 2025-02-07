const mongoose = require("mongoose");
const { USER_ROLES, ROLE_VALUES } = require("../utils/constants/role");

// Delete the existing model if it already exists
if (mongoose.models.Users) {
  delete mongoose.models.Users;
}

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

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Exclude password
    delete ret.__v; // Exclude __v
    return ret;
  },
});

module.exports = mongoose.model("Users", userSchema);

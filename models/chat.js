const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true, ref: "User" },
    receiverId: { type: String, required: true, ref: "User" },
    message: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);

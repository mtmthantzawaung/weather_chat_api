const Chat = require("../models/Chat");

exports.saveMessage = async (senderId, receiverId, message) => {
  return await Chat.create({ senderId, receiverId, message });
};

exports.getMessages = async (userId, receiverId) => {
  return await Chat.find({
    $or: [
      { senderId: userId, receiverId: receiverId },
      { senderId: receiverId, receiverId: userId },
    ],
  }).sort({ createdAt: 1 });
};

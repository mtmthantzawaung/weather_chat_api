const Chat = require("../models/chat");

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

exports.getRecentMessages = async (userId) => {
  return await Chat.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort messages by latest first
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $gt: ["$senderId", "$receiverId"] },
            then: { senderId: "$senderId", receiverId: "$receiverId" },
            else: { senderId: "$receiverId", receiverId: "$senderId" },
          },
        },
        message: { $first: "$message" },
        senderId: { $first: "$senderId" },
        receiverId: { $first: "$receiverId" },
        createdAt: { $first: "$createdAt" },
      },
    },
    {
      $sort: { createdAt: -1 }, // Ensure the most recent conversations appear first
    },
    {
      $project: {
        _id: 0,
        senderId: 1,
        receiverId: 1,
        message: 1,
        createdAt: 1,
      },
    },
  ]);
};

const User = require("../models/User");
const { USER_ROLES } = require("../utils/constants/role");
const { successResponse, errorResponse } = require("../utils/responseUtils");

exports.getAllUsers = async (req, res) => {
  try {
    console.log("authenticated!");

    const users = await User.find();

    return successResponse(res, 200, "Get user successfully", users);
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    return successResponse(res, 200, "Get user successfully", user);
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message);
  }
};

exports.updateFcmToken = async (req, res) => {
  try {
    const { userId, fcmToken } = req.body;
    if (!userId || !fcmToken) {
      return errorResponse(res, 400, "User ID and FCM Token required");
    }
    await User.findByIdAndUpdate(userId, { fcmToken });
    return successResponse(res, 200, "FCM Token updated successfully");
  } catch (error) {
    return errorResponse(res, error.cod || 500, error.message, error);
  }
};

exports.removeFcmToken = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return errorResponse(res, 400, "User ID is required");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fcmToken: "" },
      { new: true }
    );
    if (!updatedUser) {
      return errorResponse(res, 404, "❌ User not found");
    }
    return successResponse(res, 200, "FCM Token removed successfully");
  } catch (error) {
    console.error("❌ Error removing FCM token:", error);
    return errorResponse(res, error.cod || 500, error.message, error);
  }
};

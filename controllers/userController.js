const User = require("../models/user");
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

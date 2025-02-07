const User = require("../models/user");
const { USER_ROLES } = require("../utils/constants/role");

exports.getAllUsers = async (req, res) => {
  try {
    console.log("authenticated!");

    const users = await User.find();

    res.status(200).json({
      message: "Welcome Authenticated User",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

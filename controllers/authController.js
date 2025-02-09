const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { USER_ROLES } = require("../utils/constants/role");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");
const { successResponse, errorResponse } = require("../utils/responseUtils");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    // Validate input
    if (!username || !email || !password || !age) {
      return errorResponse(res, 400, "All fields are required.");
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email is already in use.", {
        field: "email",
        error: "This email is already associated with another account.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: USER_ROLES.USER,
      age,
    });
    await newUser.save();

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return successResponse(res, 201, "User registered successfully!", {
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        age: newUser.age,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error", { error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user)
      return errorResponse(res, 400, "Email or password is incorrect.");

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return errorResponse(res, 400, "Email or password is incorrect.");

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return successResponse(res, 200, "User login successfully!", {
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error", { error: error.message });
  }
};

// Refresh-Token
exports.refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);

    return successResponse(res, 200, "Refresh successfully!", {
      accessToken,
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error", { error: error.message });
  }
};

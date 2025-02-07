const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { USER_ROLES } = require("../utils/constants/role");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    // Validate input
    if (!username || !email || !password || !age) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
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
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: "User registered successfully!",
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Refresh-Token
exports.refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

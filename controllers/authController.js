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

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refresh-Token
exports.refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

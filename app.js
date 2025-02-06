const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config(); // Load environment variables from .env

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successful"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Initial Routes
app.get("/", (req, res) => {
  res.send("Welcome from Weather Chat App");
});

// API Router
const userRoute = require("./routes/userRoute");
// const { json } = require("body-parser");
app.use("/api/users", userRoute);
const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

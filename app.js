require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Initial Routes
app.get("/", (req, res) => {
  res.send("Welcome from Weather Chat App");
});

// API Router
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/weather", require("./routes/weatherRoute"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

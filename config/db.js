const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successful"))
    .catch((err) => console.error("❌ DB connection error:", err));
};

module.exports = connectDB;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socket/socketHandler");

const app = express();
app.use(express.json());
app.use(cors());

// Create HTTP server
var server = http.createServer(app);
// Setup Socket.IO
var io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB();

// Handle Socket.IO
socketHandler(io);

// Initial Routes
app.get("/", (req, res) => {
  res.send("Welcome from Weather Chat App");
});

// API Router
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/weather", require("./routes/weatherRoute"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

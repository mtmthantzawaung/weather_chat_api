let onlineUsers = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send updated user list
    socket.on("userJoined", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("updateUserList", Array.from(onlineUsers.keys())); // Broadcast active users
    });

    // Send message
    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
      }
    });

    // disconnect
    socket.on("disconnect", () => {
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      });
      io.emit("updateUserList", Array.from(onlineUsers.keys())); // Update user list
      console.log("User disconnected:", socket.id);
    });
  });
};

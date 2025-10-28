const OnlineUsers = {};

const webSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("CreatePath", (userID) => {
      OnlineUsers[userID] = socket.id;
      console.log("Online Users", OnlineUsers);
    });

    socket.on("DeletePath", (userID) => {
      delete OnlineUsers[userID];
      console.log("Online Users", OnlineUsers);
    });

    socket.on("SendMessage", ({ from, to, text, timestamp }) => {
      const receiverSocketID = OnlineUsers[to];

      if (receiverSocketID) {
        // Deliver the message in real-time
        io.to(receiverSocketID).emit("ReceiveMessage", {
          from,
          to,
          text,
          timestamp,
        });

        // Also emit a lightweight notification so clients can show a toast/alert
        // Payload is minimal: sender id, text snippet and timestamp
        io.to(receiverSocketID).emit("NewMessageAlert", {
          from,
          text,
          timestamp,
        });
      }
    });
  });
};

export default webSocket;
// Map userId => Set of socketIds (supports multiple tabs/devices)
const OnlineUsers = {};
// Map socketId => userId (for easy cleanup on disconnect)
const SocketToUser = {};

const webSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("CreatePath", (userID) => {
      if (!OnlineUsers[userID]) OnlineUsers[userID] = new Set();
      OnlineUsers[userID].add(socket.id);
      SocketToUser[socket.id] = userID;
      console.log("Online Users", Object.fromEntries(Object.entries(OnlineUsers).map(([k, s]) => [k, Array.from(s)])));
    });

    socket.on("DeletePath", (userID) => {
      if (OnlineUsers[userID]) {
        OnlineUsers[userID].delete(socket.id);
        if (OnlineUsers[userID].size === 0) delete OnlineUsers[userID];
      }
      delete SocketToUser[socket.id];
      console.log("Online Users", Object.fromEntries(Object.entries(OnlineUsers).map(([k, s]) => [k, Array.from(s)])));
    });

    socket.on("SendMessage", ({ from, to, text, timestamp }) => {
      const receiverSet = OnlineUsers[to];

      if (receiverSet && receiverSet.size > 0) {
        // Deliver the message in real-time to all connected sockets for the receiver
        for (const receiverSocketID of receiverSet) {
          io.to(receiverSocketID).emit("ReceiveMessage", {
            from,
            to,
            text,
            timestamp,
          });

          // Lightweight notification for each socket
          io.to(receiverSocketID).emit("NewMessageAlert", {
            from,
            text,
            timestamp,
          });
        }
      }
    });

    socket.on("disconnect", () => {
      const userID = SocketToUser[socket.id];
      if (userID && OnlineUsers[userID]) {
        OnlineUsers[userID].delete(socket.id);
        if (OnlineUsers[userID].size === 0) delete OnlineUsers[userID];
      }
      delete SocketToUser[socket.id];
      console.log("Socket disconnected. Online Users:", Object.fromEntries(Object.entries(OnlineUsers).map(([k, s]) => [k, Array.from(s)])));
    });
  });
};

export default webSocket;
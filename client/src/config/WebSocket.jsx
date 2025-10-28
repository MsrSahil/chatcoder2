import { io } from "socket.io-client";

// ✅ Base URL (Render backend for production, localhost for dev)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4505";

// ✅ Socket instance
const socket = io(baseURL, {
  withCredentials: true,
  transports: ["websocket", "polling"], // force proper transports
  reconnection: true, // auto reconnect
  reconnectionAttempts: 5, // retry 5 times
  reconnectionDelay: 1000, // 1s delay between retries
});

export default socket;

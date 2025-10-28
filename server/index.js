import { config } from "dotenv";
config();

import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import webSocket from "./src/webSocket.js";

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://elegant-torte-03fc73.netlify.app", // Netlify frontend
];

// ✅ REST API CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // add OPTIONS
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "ChatApp Backend is running",
  });
});

// ✅ Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// ✅ Create HTTP server
const httpServer = http.createServer(app);

// ✅ Socket.IO with proper CORS
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// ✅ Initialize WebSocket logic
webSocket(io);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});

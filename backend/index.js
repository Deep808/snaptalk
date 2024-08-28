import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

import { connectToMongodb } from "./db/mongodb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// CORS configuration
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Main port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running on port ${PORT}`);
});

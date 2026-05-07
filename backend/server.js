import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { handleSocket } from "./socket/chatSocket.js";

// ✅ Load env FIRST
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Debug (IMPORTANT)
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/community", communityRoutes);

// ✅ MongoDB connection (better error handling)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌:", err.message));

// ✅ Create server for socket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://community-page-mern-iu6d.vercel.app/", // frontend URL
    methods: ["GET", "POST"]
  }
});

// ✅ Socket handler
handleSocket(io);

// ✅ Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});

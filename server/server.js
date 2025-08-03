import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// ✅ Serve the openapi.yaml file
app.get("/openapi.yaml", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.yaml"));
});

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working fine",
  });
});

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// Start server
app.listen(PORT, () => {
  console.clear();
  console.log("🚀 Server started on:", `http://localhost:${PORT}`);
});

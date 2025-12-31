import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON and allow CORS
app.use(express.json());
app.use(cors());

// Register auth routes
app.use("/auth", authRoutes);

// Register task routes
app.use("/api/tasks", tasksRoutes);

// Connect to database before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});

import express from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasksControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
export default router;

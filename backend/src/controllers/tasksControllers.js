import Task from "../models/Task.js";
import mongoose from "mongoose";

// Get tasks with time filter and return task list + statistics
export const getAllTasks = async (req, res) => {
  // Read filter from query string (default: today)
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  // Calculate start date based on selected time filter
  switch (filter) {
    case "today":
      // Start from beginning of today (00:00)
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;

    case "this-week":
      // Start from Monday of current week
      const mondayDate =
        now.getDate() - (now.getDay() - (now.getDay() === 0 ? 7 : 0));
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;

    case "this-month":
      // Start from first day of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all-time":
      startDate = null;
      break;
  }

  // Build MongoDB query based on startDate
  const query = {
    userId: new mongoose.Types.ObjectId(req.userId),
    ...(startDate && { createdAt: { $gte: startDate } }),
  };

  try {
    // Use aggregation to fetch tasks and statistics in a single query
    const result = await Task.aggregate([
      { $match: query }, // Filter tasks by created date
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }], // Sort tasks by newest first
          pendingCount: [
            { $match: { status: "in-progress" } },
            { $count: "count" },
          ],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    // Extract data from aggregation result
    const tasks = result[0].tasks;

    // Safely get counts (default to 0 if no matching tasks)
    const pendingCount = result[0].pendingCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, pendingCount, completedCount });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({
      title,
      userId: req.userId,
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, status, completedAt },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

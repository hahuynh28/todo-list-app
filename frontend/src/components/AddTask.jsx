import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  // Local state: used only to hold the content the user is typing
  // NOT task list state
  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  // Function to create a new task
  // Flow: validate input => POST API => report HomePage => reset input
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      // Send new task to backend
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Task "${newTaskTitle}" added successfully!`);

        // Instruct HomePage to fetch the task list again
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again.");
      }

      // Reset input after submitting
      setNewTaskTitle("");
    } else {
      // Block empty/all-white input
      toast.error("Task title cannot be empty.");
    }
  };

  // Allow pressing Enter to add a task
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What is your task?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          size="xl"
          variant="default"
          className="px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;

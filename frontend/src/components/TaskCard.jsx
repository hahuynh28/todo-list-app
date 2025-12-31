import React, { useState } from "react";
import TaskEmptyState from "./TaskEmptyState";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

// TaskCard: manages the UI and actions (edit/delete/toggle) of a task
// All changes are reported to the HomePage to fetch the data again
const TaskCard = ({ task, index, handleTaskChanged }) => {
  // Turn task editing mode on/off
  const [isEditting, setIsEditting] = useState(false);

  // Temporary value while the user is editing the title
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  // Delete task => call backend => tell HomePage to fetch list again
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully!");
      handleTaskChanged();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  // Update the task title, then exit edit mode and sync with the backend
  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Task ${updateTaskTitle} updated successfully!`);
      handleTaskChanged();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  // Toggle task status: in-progress <-> completed
  // Also update the corresponding completedAt
  const toggleTaskCompleButton = async () => {
    try {
      if (task.status === "in-progress") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });

        toast.success(`Task "${task.title}" marked as completed!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "in-progress",
          completedAt: null,
        });
        toast.success(`Task "${task.title}" marked as in-progress!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Error toggling task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="What do you need to do?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          <div>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.status === "completed" && (
                <>
                  <span className="text-xs text-muted-foreground"> - </span>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;

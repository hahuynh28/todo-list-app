import React from "react";
import TaskCard from "./TaskCard";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  // Display UI when task list is empty
  // Content changes based on current filter
  return (
    <Card className="p-8 text-center border-0 shadow-custom-md">
      <div className="space-y-3">
        {/* Icon illustrating the empty state */}
        <Circle className="mx-auto size-12 text-muted-foreground" />

        {/* Main message depends on filter */}
        <div>
          <h3 className="font-md text-foreground">
            {filter === ""
              ? "No in-progress tasks found."
              : filter === "completed"
              ? "No completed tasks found."
              : "No tasks found."}
          </h3>

          <p className="text-sm text-muted-foreground">
            {/* Suggests actions for the user */}
            {filter === "all"
              ? "Create your first task to get started!"
              : `Try changing the filter to all to see ${
                  filter === "in-progress" ? "in-progress" : "completed"
                } tasks.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;

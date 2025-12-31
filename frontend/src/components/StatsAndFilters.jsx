import { FilterOptions } from "@/lib/data";
import { Filter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// Component that displays task statistics and filter buttons
const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-status/10 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterOptions.pending}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-status/10 text-success border-success/20"
        >
          {completedTasksCount} {FilterOptions.completed}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Render filter nodes based on FilterOptions */}
        {Object.keys(FilterOptions).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "ghost"}
            size="sm"
            className="capitalize gap-2"
            /// When you click filter, it will prompt the HomePage to update its state
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" />
            {FilterOptions[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;

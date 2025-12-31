import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {/* Footer only displays when there is a task. */}
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          {/* The message changes based on the number of completed/current tasks */}
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Congratulation on completing {completedTasksCount} tasks{" "}
                {activeTasksCount > 0
                  ? `and ${activeTasksCount} tasks are still in-progress.`
                  : ""}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Let's get started! You have {activeTasksCount} tasks to
                complete.
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;

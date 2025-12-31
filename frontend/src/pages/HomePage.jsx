import AddTask from "@/components/AddTask";
import Header from "@/components/Header/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTasksPerPage } from "@/lib/data";

const HomePage = () => {
  // The buffer contains all tasks retrieved from the backend.
  const [taskBuffer, setTaskBuffer] = useState([]);

  // Task statistics (retrieved from backend)
  const [activeTaskCount, setPendingTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  // Filter UI (frontend)
  const [filter, setFilter] = useState("all");

  // Time filter (backend query)
  const [dateQuery, setDateQuery] = useState("today");

  // Pagination
  const [page, setPage] = useState(1);

  // Call backend when dateQuery changes
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  // Reset page when filter or dateQuery changes
  // Avoid situations where the current page no longer contains data
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Get task list and statistics from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/api/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setPendingTaskCount(res.data.pendingCount);
      setCompletedTaskCount(res.data.completedCount);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks. Please try again later.");
    }
  };

  // Filter tasks by status (all / pending / completed)
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "pending":
        return task.status === "in-progress";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  useEffect(() => {
    console.log(
      "Statuses:",
      taskBuffer.map((t) => t.status)
    );
  }, [taskBuffer]);

  // Cut the task list to display according to the current page
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasksPerPage,
    page * visibleTasksPerPage
  );

  // If the current page has no more tasks, it will automatically return to the previous page.
  useEffect(() => {
    if (page > 1 && visibleTasks.length === 0) {
      setPage((prev) => prev - 1);
    }
  }, [visibleTasks, page]);

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksPerPage);

  // Called when a task is added / updated / deleted
  const handleTaskChanged = () => {
    fetchTasks();
  };

  // Pagination handlers
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />

      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-2xl p-6 mx-auto space-y-6">
          {/* Add new task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          {/* Statistics + frontend filter */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
          {/* List of tasks (filtered and paginated) */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          {/* Pagination + date filter */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageSelect={handlePageSelect}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

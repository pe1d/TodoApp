import React from "react";
import { Task, ViewMode } from "./TaskTimeline.tsx";
import { GanttBar } from "./GanttBar.tsx";

interface TaskRowProps {
  task: Task;
  index: number;
  viewMode: ViewMode;
  currentDate: Date;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  index,
  viewMode,
  currentDate,
  onUpdateTask,
}) => {
  const cellWidth = viewMode === "day" ? 60 : viewMode === "month" ? 80 : 100;

  const getTimelineStart = () => {
    const startDate = new Date(currentDate);

    switch (viewMode) {
      case "day":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() - 3);
        startDate.setDate(1);
        break;
      case "year":
        startDate.setFullYear(startDate.getFullYear() - 2);
        startDate.setMonth(0);
        startDate.setDate(1);
        break;
    }

    // Xóa giờ phút giây mili giây
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  };

  const getTimelineEnd = () => {
    const endDate = new Date(getTimelineStart());

    switch (viewMode) {
      case "day":
        endDate.setDate(endDate.getDate() + 30);
        break;
      case "month":
        endDate.setMonth(endDate.getMonth() + 12);
        break;
      case "year":
        endDate.setFullYear(endDate.getFullYear() + 10);
        break;
    }

    // Xóa giờ phút giây mili giây
    endDate.setHours(0, 0, 0, 0);
    return endDate;
  };

  const timelineStart = getTimelineStart();
  const timelineEnd = getTimelineEnd();
  const totalCells = viewMode === "day" ? 30 : viewMode === "month" ? 12 : 10;
  const totalWidth = totalCells * cellWidth;

  const rowStyle: React.CSSProperties = {
    height: "40px", // Tailwind: h-16
    borderBottom: "1px solid #e5e7eb", // Tailwind: border-b border-gray-200
    position: "relative",
    backgroundColor: index % 2 === 0 ? "#ffffff" : "rgba(249, 250, 251, 0.5)", // Tailwind: bg-white / bg-gray-50/50
  };

  const absoluteContainerStyle: React.CSSProperties = {
    position: "absolute",
    inset: "0",
    width: `${totalWidth}px`,
  };

  const gridLineWrapperStyle: React.CSSProperties = {
    position: "absolute",
    inset: "0",
    display: "flex",
  };

  const cellStyle: React.CSSProperties = {
    borderRight: "1px solid #e5e7eb", // Tailwind: border-r border-gray-200
    height: "100%",
    width: `${cellWidth}px`,
  };

  return (
    <div style={rowStyle}>
      <div style={absoluteContainerStyle}>
        {/* Grid lines */}
        <div style={gridLineWrapperStyle}>
          {Array.from({ length: totalCells }, (_, i) => (
            <div key={i} style={cellStyle} />
          ))}
        </div>

        {/* Gantt Bar */}
        <GanttBar
          task={task}
          timelineStart={timelineStart}
          timelineEnd={timelineEnd}
          totalWidth={totalWidth}
          viewMode={viewMode}
          onUpdateTask={onUpdateTask}
        />
      </div>
    </div>
  );
};

import React from "react";
import { GanttBar } from "./GanttBar";

export const IssueRowGantt = ({
  issue,
  index,
  viewMode,
  currentDate,
  onUpdateIssue,
  updateIssue,
}) => {
  const cellWidth = viewMode === "day" ? 60 : viewMode === "month" ? 100 : 120;
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
      default:
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
      default:
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

  const rowStyle = {
    height: "100%",
    position: "relative",
  };

  const containerStyle = {
    width: `${totalWidth}px`,
  };

  const gridLineWrapperStyle = {
    position: "absolute",
    inset: "0",
    display: "flex",
  };

  const cellStyle = {
    borderRight: "1px solid #e5e7eb",
    height: "100%",
    width: `${cellWidth}px`,
  };

  return (
    <div style={rowStyle}>
      <div style={containerStyle}>
        {/* Grid lines */}
        <div style={gridLineWrapperStyle}>
          {Array.from({ length: totalCells }, (_, i) => (
            <div key={i} style={cellStyle} />
          ))}
        </div>

        {/* Gantt Bar */}
        <GanttBar
          issue={issue}
          timelineStart={timelineStart}
          timelineEnd={timelineEnd}
          totalWidth={totalWidth}
          viewMode={viewMode}
          onUpdateIssueTime={onUpdateIssue}
          onBlur={updateIssue}
        />
      </div>
    </div>
  );
};

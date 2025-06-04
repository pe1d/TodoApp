import React from "react";
import { Issue, ViewMode } from "./IssueTimeline.tsx";
import { GanttBar } from "./GanttBar.tsx";

interface IssueRowProps {
  issue: Issue;
  index: number;
  viewMode: ViewMode;
  currentDate: Date;
  onUpdateIssue: (issueId: string, updates: Partial<Issue>) => void;
}

export const IssueRow: React.FC<IssueRowProps> = ({
  issue,
  index,
  viewMode,
  currentDate,
  onUpdateIssue,
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
    height: "100%",
    position: "relative",
  };

  const containerStyle: React.CSSProperties = {
    width: `${totalWidth}px`,
  };

  const gridLineWrapperStyle: React.CSSProperties = {
    position: "absolute",
    inset: "0",
    display: "flex",
  };

  const cellStyle: React.CSSProperties = {
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
          onUpdateIssue={onUpdateIssue}
        />
      </div>
    </div>
  );
};

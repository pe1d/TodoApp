import React from "react";
import { ViewMode } from "./TaskTimeline";

interface TimelineHeaderProps {
  viewMode: ViewMode;
  currentDate: Date;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  viewMode,
  currentDate,
}) => {
  const generateTimeUnits = () => {
    const units = [];
    const startDate = new Date(currentDate);

    switch (viewMode) {
      case "day":
        startDate.setDate(startDate.getDate() - 7);
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          units.push({
            key: i,
            label: date.getDate().toString(),
            sublabel: date.toLocaleDateString("vi-VN", { weekday: "short" }),
            date: new Date(date),
          });
        }
        break;

      case "month":
        startDate.setMonth(startDate.getMonth() - 3);
        for (let i = 0; i < 12; i++) {
          const date = new Date(startDate);
          date.setMonth(date.getMonth() + i);
          units.push({
            key: i,
            label: date.toLocaleDateString("vi-VN", { month: "short" }),
            sublabel: date.getFullYear().toString(),
            date: new Date(date),
          });
        }
        break;

      case "year":
        startDate.setFullYear(startDate.getFullYear() - 2);
        for (let i = 0; i < 10; i++) {
          const date = new Date(startDate);
          date.setFullYear(date.getFullYear() + i);
          units.push({
            key: i,
            label: date.getFullYear().toString(),
            sublabel: "",
            date: new Date(date),
          });
        }
        break;
    }

    return units;
  };

  const timeUnits = generateTimeUnits();
  const cellWidth = viewMode === "day" ? 60 : viewMode === "month" ? 80 : 100;

  const containerStyle: React.CSSProperties = {
    minHeight: "40px",
    backgroundColor: "#f9fafb", // Tailwind: bg-gray-50
    borderBottom: "1px solid #e5e7eb", // Tailwind: border-b border-gray-200
    position: "sticky",
    top: 0,
    zIndex: 10,
    overflow: "hidden",
    width: "fit-content",
  };
  console.log("Check: ", timeUnits);

  const innerStyle: React.CSSProperties = {
    display: "flex",
    width: `${timeUnits.length * cellWidth}px`,
    height: "40px",
  };

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        {timeUnits.map((unit) => {
          const now = new Date();
          const isToday =
            viewMode === "day" &&
            unit.date.toDateString() === now.toDateString();
          const isCurrentMonth =
            viewMode === "month" &&
            unit.date.getMonth() === now.getMonth() &&
            unit.date.getFullYear() === now.getFullYear();
          const isCurrentYear =
            viewMode === "year" &&
            unit.date.getFullYear() === now.getFullYear();

          const isCurrent = isToday || isCurrentMonth || isCurrentYear;

          const unitStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #e5e7eb", // Tailwind: border-gray-200
            width: `${cellWidth}px`,
            minWidth: `${cellWidth}px`,
            backgroundColor: isCurrent ? "#eff6ff" : "transparent", // Tailwind: bg-blue-50
            color: isCurrent ? "#1d4ed8" : "#4b5563", // Tailwind: text-blue-700 / text-gray-600
          };

          const labelStyle: React.CSSProperties = {
            fontWeight: isCurrent ? 600 : 500, // font-semibold / font-medium
          };

          const sublabelStyle: React.CSSProperties = {
            fontSize: "12px",
            color: "#6b7280", // Tailwind: text-gray-500
          };

          return (
            <div key={unit.key} style={unitStyle}>
              <div style={labelStyle}>{unit.label}</div>
              {unit.sublabel && (
                <div style={sublabelStyle}>{unit.sublabel}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

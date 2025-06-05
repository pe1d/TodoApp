import React from "react";

export const TimelineHeader = ({ viewMode, currentDate }) => {
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
      default:
        break;
    }

    return units;
  };

  const timeUnits = generateTimeUnits();
  const cellWidth = viewMode === "day" ? 60 : viewMode === "month" ? 100 : 120;

  const containerStyle = {
    minHeight: "40px",
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",

    zIndex: 10,
    overflow: "hidden",
    width: "fit-content",
  };

  const innerStyle = {
    display: "flex",
    width: `${timeUnits.length * cellWidth}px`,
    height: "40px",
    position: "sticky",
    top: 0,
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

          const unitStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #e5e7eb",
            width: `${cellWidth}px`,
            minWidth: `${cellWidth}px`,
            backgroundColor: isCurrent ? "#eff6ff" : "transparent",
            color: isCurrent ? "#1d4ed8" : "#4b5563",
          };

          const labelStyle = {
            fontWeight: isCurrent ? 600 : 500,
          };

          const sublabelStyle = {
            fontSize: "12px",
            color: "#6b7280",
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

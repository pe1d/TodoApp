import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

const BarContainer = styled.div`
  position: absolute;
  top: 4px;
  height: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: move;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.isDragging ? 0.8 : 1)};
  z-index: ${(props) => (props.isDragging ? 10 : 1)};
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: ${(props) => props.progress}%;
  transition: all 0.3s ease;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  ${(props) => (props.left ? "left: 0;" : "right: 0;")}
  width: 4px;
  height: 100%;
  cursor: ${(props) => (props.left ? "w-resize" : "e-resize")};
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
  ${BarContainer}:hover & {
    opacity: 1;
  }
`;

export const GanttBar = ({
  issue,
  timelineStart,
  timelineEnd,
  totalWidth,
  viewMode,
  onUpdateIssueTime,
  onBlur,
}) => {
  const [isDragging, setIsDragging] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const barRef = useRef(null);
  const getPositionFromDate = (date) => {
    const ts = timelineStart.getTime();
    const te = timelineEnd.getTime();
    const d = new Date(date).getTime();
    const progress = (d - ts) / (te - ts);
    return Math.max(0, Math.min(1, progress)) * totalWidth;
  };

  const getDateFromPosition = (position) => {
    const progress = Math.max(0, Math.min(1, position / totalWidth));
    return new Date(
      timelineStart.getTime() +
        progress * (timelineEnd.getTime() - timelineStart.getTime())
    ).valueOf();
  };

  const startPos = getPositionFromDate(issue.startDate);
  const endPos = getPositionFromDate(issue.endDate);
  const width = Math.max(20, endPos - startPos);
  const handleMouseDown = (e, action) => {
    e.preventDefault();
    setIsDragging(action);
    setDragStart({
      x: e.clientX,
      startDate: new Date(issue.startDate),
      endDate: new Date(issue.endDate),
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaTime =
        (deltaX / totalWidth) *
        (timelineEnd.getTime() - timelineStart.getTime());

      let newStartDate = new Date(dragStart.startDate).valueOf();
      let newEndDate = new Date(dragStart.endDate).valueOf();

      switch (isDragging) {
        case "move":
          newStartDate = new Date(
            dragStart.startDate.getTime() + deltaTime
          ).valueOf();
          newEndDate = new Date(
            dragStart.endDate.getTime() + deltaTime
          ).valueOf();
          break;
        case "resize-left":
          newStartDate = new Date(
            dragStart.startDate.getTime() + deltaTime
          ).valueOf();
          if (newStartDate >= issue.endDate) {
            newStartDate = new Date(
              issue.endDate - 24 * 60 * 60 * 1000
            ).valueOf();
          }
          break;
        case "resize-right":
          newEndDate = new Date(
            dragStart.endDate.getTime() + deltaTime
          ).valueOf();
          if (newEndDate <= issue.startDate) {
            newEndDate = new Date(
              issue.startDate + 24 * 60 * 60 * 1000
            ).valueOf();
          }
          break;
        default:
          break;
      }

      onUpdateIssueTime({
        startDate: newStartDate,
        endDate: newEndDate,
      }); // Chi update state de tranh goi api nhieu lan
    };

    const handleMouseUp = () => setIsDragging(null);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    dragStart,
    issue,
    timelineStart,
    timelineEnd,
    totalWidth,
    onUpdateIssueTime,
  ]);

  const formatDateRange = () => {
    const startStr = new Date(issue.startDate).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const endStr = new Date(issue.endDate).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${startStr} - ${endStr}`;
  };

  if (startPos >= totalWidth || endPos <= 0) return null;

  return (
    <Tooltip
      open={isDragging === null && isHover}
      title={`${issue.name} (${formatDateRange()})`}
    >
      <BarContainer
        ref={barRef}
        left={Math.max(0, startPos)}
        width={width}
        color={issue.color || "#3b82f6"}
        isDragging={!!isDragging}
        onMouseDown={(e) => handleMouseDown(e, "move")}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseUp={
          () =>
            onBlur &&
            onBlur(issue.id, {
              startDate: getDateFromPosition(startPos),
              endDate: getDateFromPosition(endPos),
            })
          //update bang cach goi saga => goi api chi vao lan cuoi
        }
      >
        <ProgressBar progress={issue.progress || 0} />
        <Content>
          <span>{issue.name}</span>
        </Content>
        <ResizeHandle
          left
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e, "resize-left");
          }}
        />
        <ResizeHandle
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e, "resize-right");
          }}
        />
      </BarContainer>
    </Tooltip>
  );
};

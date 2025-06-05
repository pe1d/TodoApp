import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IssueRowGantt } from "./IssueRowGantt";

const TableRow = styled.div`
  min-height: 40px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  width: fit-content;
  background-color: white;
`;
const TableCell = styled.div`
  width: ${(props) => props.width}px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: ${(props) => (props.frozen ? "sticky" : "")};
  background-color: white;
  z-index: 100;
  div {
    font-size: 14px;
    color: #1f1f1f;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ChartSection = styled.div`
  flex: 1;
  // overflow: auto;
`;

export const IssueRowTimeline = (props) => {
  const { issue, columns, index, viewMode, currentDate, updateIssue } = props; //vi du issue lay tu redux

  const [currentIssue, setCurrentIssue] = useState(issue);
  useEffect(() => {
    if (currentIssue !== issue) {
      setCurrentIssue(issue);
    }
  }, [issue]);
  const timelineRef = useRef(null);
  console.log("Check: issue:", issue);
  console.log("Check: currentIssue:", currentIssue);
  const updateCurrentIssue = (updates) => {
    setCurrentIssue((prev) => ({
      ...prev,
      ...updates,
    }));
  };
  const formatCellValue = (issue, column) => {
    const value = issue[column.dataIndex];

    if (column.render) {
      const issueWithUpdate = {
        ...issue,
        _updateIssue: updateIssue,
      };
      return column.render(value, issueWithUpdate);
    }

    if (
      value &&
      (column.dataIndex === "startDate" || column.dataIndex === "endDate")
    ) {
      return new Date(value).toLocaleDateString("vi-VN");
    }

    return String(value || "");
  };
  let frozenColBodyWidth = 0;
  return (
    <TableRow key={issue.id}>
      {columns.map((column) => {
        const currentLeft = column.frozen ? frozenColBodyWidth : undefined;
        if (column.frozen) {
          frozenColBodyWidth += column.width;
        }
        return (
          <TableCell
            style={{ left: currentLeft }}
            key={column.dataIndex}
            width={column.width}
            frozen={column.frozen}
          >
            <div>{formatCellValue(currentIssue, column)}</div>
          </TableCell>
        );
      })}
      <ChartSection ref={timelineRef}>
        <div
          style={{
            position: "relative",
            width: "fit-content",
            height: "100%",
          }}
        >
          <IssueRowGantt
            key={currentIssue.id}
            issue={currentIssue}
            index={index}
            viewMode={viewMode}
            currentDate={currentDate}
            onUpdateIssue={updateCurrentIssue} // update state tranh goi api nhieu lan
            updateIssue={updateIssue} // update bang saga
          />
        </div>
      </ChartSection>
    </TableRow>
  );
};

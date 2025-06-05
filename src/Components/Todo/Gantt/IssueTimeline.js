import React, { useState } from "react";
import { Button, Select } from "antd";
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { TimelineHeader } from "./TimelineHeader.js";
import { DateEditor } from "./DateEditer.js";
import { IssueRowTimeline } from "./IssueRowTimeline.js";

const { Option } = Select;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #1f1f1f;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimelineContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.div`
  height: 100%;
  // display: flex;
  overflow: auto;
`;

const TableSection = styled.div`
  background-color: white;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TableHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
  background-color: white;
  display: flex;
  width: fit-content;
  position: sticky;
  top: 0px;
  z-index: 101;
`;

const TableColumn = styled.div`
  width: ${(props) => props.width}px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: ${(props) => (props.frozen ? "sticky" : "static")};
  z-index: ${(props) => (props.frozen ? 100 : "auto")};
  background-color: white;

  span {
    font-weight: 500;
    color: #595959;
  }
`;

const TableBody = styled.div`
  flex: 1;
  height: fit-content;
  background-color: white;
`;

const defaultColumns = [
  { name: "Tên việc", dataIndex: "name", width: 200, frozen: true },
  {
    name: "Bắt đầu",
    dataIndex: "startDate",
    width: 120,
    frozen: true,
    render: (value, issue) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if (issue._updateIssue) {
            issue._updateIssue(issue.id, { startDate: newDate });
          }
        }}
      />
    ),
  },
  {
    name: "Hạn",
    dataIndex: "endDate",
    width: 120,
    frozen: true,
    render: (value, issue) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if (issue._updateIssue) {
            issue._updateIssue(issue.id, { endDate: newDate });
          }
        }}
      />
    ),
  },
];

const initialIssues = [
  {
    id: "1",
    name: "Thiết kế giao diện",
    startDate: new Date(2025, 5, 3).valueOf(),
    endDate: new Date(2025, 5, 25, 12).valueOf(),
    color: "#3b82f6",
    progress: 75,
  },
  {
    id: "2",
    name: "Phát triển Backend",
    startDate: new Date(2025, 5, 4).valueOf(),
    endDate: new Date(2025, 5, 7).valueOf(),
    color: "#10b981",
    progress: 40,
  },
  {
    id: "3",
    name: "Tích hợp API",
    startDate: new Date(2025, 5, 2).valueOf(),
    endDate: new Date(2025, 5, 7).valueOf(),
    color: "#f59e0b",
    progress: 20,
  },
  {
    id: "4",
    name: "Testing và Debug",
    startDate: new Date(2025, 5, 6).valueOf(),
    endDate: new Date(2025, 5, 12).valueOf(),
    color: "#ef4444",
    progress: 0,
  },
];

export const IssueTimeline = ({ columns = defaultColumns }) => {
  const [issues, setIssues] = useState(initialIssues);
  const [viewMode, setViewMode] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateIssue = (issueId, updates) => {
    console.log("Check: ", issueId, updates);

    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, ...updates } : issue
      )
    );
  };

  const addNewIssue = () => {
    const newIssue = {
      id: Date.now().toString(),
      name: "Issue mới",
      startDate: new Date().valueOf(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).valueOf(),
      color: "#6366f1",
      progress: 0,
    };
    setIssues((prev) => [...prev, newIssue]);
  };

  const navigateTime = (direction) => {
    const newDate = new Date(currentDate);

    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
      case "year":
        newDate.setFullYear(
          newDate.getFullYear() + (direction === "next" ? 1 : -1)
        );
        break;
      default:
        break;
    }
    setCurrentDate(newDate);
  };

  // const totalColumnsWidth = columns.reduce((sum, col) => sum + col.width, 0);
  let frozenColWidth = 0;
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>
            <CalendarOutlined style={{ fontSize: "20px", color: "#595959" }} />
            <h1>Issue Timeline</h1>
          </Title>

          <NavigationControls>
            <Button
              icon={<LeftOutlined />}
              onClick={() => navigateTime("prev")}
              size="small"
            />

            <Button onClick={() => setCurrentDate(new Date())} size="small">
              Hôm nay
            </Button>

            <Button
              icon={<RightOutlined />}
              onClick={() => navigateTime("next")}
              size="small"
            />
          </NavigationControls>
        </HeaderLeft>

        <HeaderRight>
          <Select
            value={viewMode}
            onChange={(value: ViewMode) => setViewMode(value)}
            style={{ width: 128 }}
            size="middle"
          >
            <Option value="day">Theo ngày</Option>
            <Option value="month">Theo tháng</Option>
            <Option value="year">Theo năm</Option>
          </Select>

          <Button type="primary" icon={<PlusOutlined />} onClick={addNewIssue}>
            Thêm Issue
          </Button>
        </HeaderRight>
      </Header>

      <TimelineContainer>
        <MainContent>
          <TableSection>
            <TableHeader>
              {columns.map((column) => {
                const currentLeft = column.frozen ? frozenColWidth : undefined;
                if (column.frozen) {
                  frozenColWidth += column.width;
                }
                return (
                  <TableColumn
                    key={column.dataIndex}
                    width={column.width}
                    frozen={column.frozen}
                    style={{ left: currentLeft }}
                  >
                    <span>{column.name}</span>
                  </TableColumn>
                );
              })}
              <TimelineHeader viewMode={viewMode} currentDate={currentDate} />
            </TableHeader>

            <TableBody>
              {issues.map((issue, index) => {
                return (
                  <IssueRowTimeline
                    issue={issue}
                    columns={columns}
                    index={index}
                    viewMode={viewMode}
                    currentDate={currentDate}
                    updateIssue={updateIssue}
                  />
                );
              })}
            </TableBody>
          </TableSection>
        </MainContent>
      </TimelineContainer>
    </Container>
  );
};

import React, { useState, useRef } from "react";
import { Button, Select } from "antd";
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { TimelineHeader } from "./TimelineHeader.tsx";
import { IssueRow } from "./IssueRow.tsx";
import { DateEditor } from "./DateEditer.tsx";

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

const TableColumn = styled.div<{ width: number; frozen: boolean }>`
  width: ${(props) => props.width}px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: ${(props) => (props.frozen ? "sticky" : "")};
  z-index: 100;
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

const TableRow = styled.div`
  min-height: 40px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  width: fit-content;
  background-color: white;
`;

const TableCell = styled.div<{ width: number; frozen: boolean }>`
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

export interface Issue {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  progress?: number;
}

export interface Column {
  name: string;
  dataIndex: string;
  width: number;
  frozen: boolean;
  render?: (value: any, issue: Issue) => React.ReactNode;
}

export type ViewMode = "day" | "month" | "year";

const defaultColumns: Column[] = [
  { name: "Tên việc", dataIndex: "name", width: 200, frozen: true },
  {
    name: "Bắt đầu",
    dataIndex: "startDate",
    width: 120,
    frozen: true,
    render: (value: Date, issue: Issue) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if ((issue as any)._updateIssue) {
            (issue as any)._updateIssue(issue.id, { startDate: newDate });
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
    render: (value: Date, issue: Issue) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if ((issue as any)._updateIssue) {
            (issue as any)._updateIssue(issue.id, { endDate: newDate });
          }
        }}
      />
    ),
  },
];

const initialIssues: Issue[] = [
  {
    id: "1",
    name: "Thiết kế giao diện",
    startDate: new Date(2025, 5, 3),
    endDate: new Date(2025, 5, 25, 12),
    color: "#3b82f6",
    progress: 75,
  },
  {
    id: "2",
    name: "Phát triển Backend",
    startDate: new Date(2025, 5, 4),
    endDate: new Date(2025, 5, 7),
    color: "#10b981",
    progress: 40,
  },
  {
    id: "3",
    name: "Tích hợp API",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 7),
    color: "#f59e0b",
    progress: 20,
  },
  {
    id: "4",
    name: "Testing và Debug",
    startDate: new Date(2025, 5, 6),
    endDate: new Date(2025, 5, 12),
    color: "#ef4444",
    progress: 0,
  },
];

interface IssueTimelineProps {
  columns?: Column[];
}

export const IssueTimeline: React.FC<IssueTimelineProps> = ({
  columns = defaultColumns,
}) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const timelineRef = useRef<HTMLDivElement>(null);

  const updateIssue = (issueId: string, updates: Partial<Issue>) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, ...updates } : issue
      )
    );
  };

  const addNewIssue = () => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      name: "Issue mới",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      color: "#6366f1",
      progress: 0,
    };
    setIssues((prev) => [...prev, newIssue]);
  };

  const navigateTime = (direction: "prev" | "next") => {
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
    }

    setCurrentDate(newDate);
  };

  const formatCellValue = (issue: Issue, column: Column) => {
    const value = issue[column.dataIndex as keyof Issue];

    if (column.render) {
      const issueWithUpdate = { ...issue, _updateIssue: updateIssue };
      return column.render(value, issueWithUpdate);
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("vi-VN");
    }

    return String(value || "");
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
                let frozenColBodyWidth = 0;

                return (
                  <TableRow key={issue.id}>
                    {columns.map((column) => {
                      const currentLeft = column.frozen
                        ? frozenColBodyWidth
                        : undefined;
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
                          <div>{formatCellValue(issue, column)}</div>
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
                        <IssueRow
                          key={issue.id}
                          issue={issue}
                          index={index}
                          viewMode={viewMode}
                          currentDate={currentDate}
                          onUpdateIssue={updateIssue}
                        />
                      </div>
                    </ChartSection>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableSection>
        </MainContent>
      </TimelineContainer>
    </Container>
  );
};

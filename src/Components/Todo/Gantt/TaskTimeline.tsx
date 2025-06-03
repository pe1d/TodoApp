import React, { useState, useRef } from "react";
import { Button, Select, Table } from "antd";
import {
  PlusOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { TimelineHeader } from "./TimelineHeader.tsx";
import { TaskRow } from "./TaskRow.tsx";
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
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
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
  display: flex;
`;

const TableSection = styled.div`
  background-color: white;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
  display: flex;
`;

const TableColumn = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 16px;

  span {
    font-weight: 500;
    color: #595959;
  }
`;

const TableBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const TableRow = styled.div<{ isEven: boolean }>`
  min-height: 40px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  background-color: ${(props) => (props.isEven ? "white" : "#fafafa")};
`;

const TableCell = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  border-right: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 16px;

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
  overflow: auto;
`;

export interface Task {
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
  render?: (value: any, task: Task) => React.ReactNode;
}

export type ViewMode = "day" | "month" | "year";

const defaultColumns: Column[] = [
  { name: "Tên việc", dataIndex: "name", width: 200 },
  {
    name: "Bắt đầu",
    dataIndex: "startDate",
    width: 120,
    render: (value: Date, task: Task) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if ((task as any)._updateTask) {
            (task as any)._updateTask(task.id, { startDate: newDate });
          }
        }}
      />
    ),
  },
  {
    name: "Hạn",
    dataIndex: "endDate",
    width: 120,
    render: (value: Date, task: Task) => (
      <DateEditor
        date={value}
        onDateChange={(newDate) => {
          if ((task as any)._updateTask) {
            (task as any)._updateTask(task.id, { endDate: newDate });
          }
        }}
      />
    ),
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    name: "Thiết kế giao diện",
    startDate: new Date(2025, 5, 3),
    endDate: new Date(2025, 5, 14),
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

interface TaskTimelineProps {
  columns?: Column[];
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({
  columns = defaultColumns,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const timelineRef = useRef<HTMLDivElement>(null);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: "Task mới",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      color: "#6366f1",
      progress: 0,
    };
    setTasks((prev) => [...prev, newTask]);
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

  const formatCellValue = (task: Task, column: Column) => {
    const value = task[column.dataIndex as keyof Task];

    if (column.render) {
      const taskWithUpdate = { ...task, _updateTask: updateTask };
      return column.render(value, taskWithUpdate);
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("vi-VN");
    }

    return String(value || "");
  };

  const totalColumnsWidth = columns.reduce((sum, col) => sum + col.width, 0);

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>
            <CalendarOutlined style={{ fontSize: "20px", color: "#595959" }} />
            <h1>Task Timeline</h1>
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

          <Button type="primary" icon={<PlusOutlined />} onClick={addNewTask}>
            Thêm Task
          </Button>
        </HeaderRight>
      </Header>

      <TimelineContainer>
        <MainContent>
          <TableSection style={{ width: totalColumnsWidth }}>
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.dataIndex} width={column.width}>
                  <span>{column.name}</span>
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task.id} isEven={index % 2 === 0}>
                  {columns.map((column) => (
                    <TableCell key={column.dataIndex} width={column.width}>
                      <div>{formatCellValue(task, column)}</div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableSection>

          <ChartSection ref={timelineRef}>
            <TimelineHeader viewMode={viewMode} currentDate={currentDate} />
            <div style={{ position: "relative", width: "fit-content" }}>
              {tasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  index={index}
                  viewMode={viewMode}
                  currentDate={currentDate}
                  onUpdateTask={updateTask}
                />
              ))}
            </div>
          </ChartSection>
        </MainContent>
      </TimelineContainer>
    </Container>
  );
};

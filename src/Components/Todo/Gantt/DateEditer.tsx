import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border: none;
  box-shadow: none;

  &:hover,
  &:focus {
    border-color: #1890ff;
  }
`;

interface DateEditorProps {
  date: Date;
  onDateChange: (date: Date) => void;
  placeholder?: string;
}

export const DateEditor: React.FC<DateEditorProps> = ({
  date,
  onDateChange,
  placeholder = "Chọn ngày",
}) => {
  const handleDateChange = (dateValue: Dayjs | null) => {
    if (dateValue) {
      onDateChange(dateValue.toDate());
    }
  };

  return (
    <StyledDatePicker
      value={dayjs(date)}
      onChange={handleDateChange}
      placeholder={placeholder}
      format="DD/MM/YYYY HH:mm"
      size="small"
    />
  );
};

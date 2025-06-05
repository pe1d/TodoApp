import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
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

export const DateEditor = ({
  date,
  onDateChange,
  placeholder = "Chọn ngày",
}) => {
  const handleDateChange = (dateValue) => {
    if (dateValue) {
      onDateChange(dateValue.valueOf()); // update bien cuc bo tuong ung goi
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

// components/ui/calendar.tsx
import * as React from "react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps extends DayPickerSingleProps {
  className?: string;
}

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={className}>
      <DayPicker {...props} />
    </div>
  );
}

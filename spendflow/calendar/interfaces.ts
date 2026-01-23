import type { TEventColor } from "@/calendar/types";

export interface IEvent {
  id: string | number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  description: string;
  amount?: number;
  category?: string;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}

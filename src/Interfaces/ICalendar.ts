import { IDay } from "./IDay";
import { IEvent } from "./IEvent";

export interface ICalendar {
  dateDisplay: string;
  days: IDay[];
  paddingDays: string[];
  calendarEvents: IEvent[];
  onAddEvent: (year: number, month: number, date: number) => void;
}

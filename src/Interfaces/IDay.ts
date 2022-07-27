import { IEvent } from "./IEvent";

export interface IDay {
  date: number;
  month: number;
  year: number;
  dateString: string;
  dayName: string;
  isCurrentDay: boolean;
  event: IEvent | null;
  isPadding: boolean;
}

import { IDay } from "./IDay"

export interface ICalendar {
    dateDisplay: string,
    days: IDay[],
    paddingDays: string[],
    onAddEvent:(year:number, month:number, date:number) => void
}
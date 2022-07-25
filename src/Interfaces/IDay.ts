export interface IDay {
    date: number;
    month:number;
    year: number;
    dateString: string;
    dayName: string;
    isCurrentDay: boolean;
    event: null;
    isPadding: boolean;
}
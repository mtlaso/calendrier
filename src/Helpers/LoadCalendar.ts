import { IDay } from "../Interfaces/IDay";
import { INav } from "../Interfaces/INav";

export const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  // Retourne le jour de la semaine demandé
  export const FindDayName = (day : Date) => {
    const dateString = day.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  
    return weekdays.indexOf(dateString.split(", ")[0]);
  };
  
  export function LoadCalendar(nav: INav) {
    // Load calendar
    const dt = new Date();
  
    const day = dt.getDate();
    dt.setMonth(nav.month);
    const month = dt.getMonth();
    dt.setFullYear(nav.year);
    const year = dt.getFullYear();
  
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const paddingDays = FindDayName(firstDayOfMonth);

    const paddingDaysArr: string[] = [];
    const daysArr: IDay[] = [];
  
    // Trouver les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      const today = new Date(year, month, i);
      const dateString = `${month}/${i}/${year}`;
      const dayName = weekdays[FindDayName(today)];
  
      daysArr.push({
        date: today.getDate(),
        month: today.getMonth(),
        year:today.getFullYear(),
        dateString: dateString,
        dayName: dayName,
        isCurrentDay: today.getDate() === day,
        event: null,
        isPadding: false,
      });
    }
  
    // Trouver les padding days
    for (let i = 0; i < paddingDays; i++) {
      paddingDaysArr.push(weekdays[i]);
    }
  
    // Afficher le mois (header)
    const dateDisplay = `${firstDayOfMonth.toLocaleString("default", {
      month: "long",
    })} ${year}`;
  
    return [paddingDaysArr, daysArr, dateDisplay];
  }
  
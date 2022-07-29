import { IDay } from "../Interfaces/IDay";
import { INav } from "../Interfaces/INav";
import { IWeekDays } from "../Interfaces/IWeekDays";

export const weekdays: IWeekDays[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Retourne l'index du jour de la semaine demandé
export const FindDayName = (day: Date): number => {
  const dateString = day.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return weekdays.indexOf(dateString.split(", ")[0] as IWeekDays);
};

/**
 * Génère les informations nécessaire pour afficher (render) le calendrier
 * @param {INav} nav Le mois et année à afficher
 * @returns Retourne le nombre de padding days (cases vides avant le premier jours),
 *          la liste des jours dans le mois et la date à afficher sur le header.
 */
export function LoadCalendar(nav: INav) {
  const dt = new Date();

  const day = dt.getDate();

  dt.setMonth(nav.month);
  const month = dt.getMonth();
  dt.setFullYear(nav.year);
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const paddingDays = FindDayName(firstDayOfMonth);

  const paddingDaysArr: IWeekDays[] = [];
  const daysArr: IDay[] = [];

  // Trouver les jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    const today = new Date(year, month, i);
    const dateString = `${month}/${i}/${year}`;
    let dayName = weekdays[FindDayName(today)];

    daysArr.push({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      dateString: dateString,
      dayName: dayName,
      isCurrentDay: today.getDate() === day,
      isPadding: false,
    });
  }

  // Trouver les padding days (nb cases vides)
  for (let i = 0; i < paddingDays; i++) {
    paddingDaysArr.push(weekdays[i]);
  }

  // Afficher le mois (pour le header)
  const dateDisplay = `${firstDayOfMonth.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  return [paddingDaysArr, daysArr, dateDisplay];
}

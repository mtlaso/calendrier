import { IDay } from "../Interfaces/IDay";
import { INav } from "../Interfaces/INav";
import { IWeekDays } from "../Interfaces/IWeekDays";

export const weekdays: IWeekDays[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Retourne le nombre de padding days
 * @param day - Objet Date représentant le jour le premier jour du mois
 * @returns {number} Le nombre de padding days
 */
export const NumOfPaddingDays = (day: Date): number => {
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
 * @param {INav} nav Objet contenant le mois et l'année à afficher
 * @returns Retourne le nombre de padding days (cases vides avant le premier jours),
 *          la liste des jours dans le mois et la date à afficher sur le header.
 */
export function LoadCalendar(nav: INav) {
  const dt = new Date();

  const realDay = dt.getDate();

  dt.setMonth(nav.month, 1);
  const month = dt.getMonth();
  dt.setFullYear(nav.year);
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const numOfDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Trouver le nombre de padding days (cases vides avant le premier jour du mois)
  const paddingDays = NumOfPaddingDays(firstDayOfMonth);

  const paddingDaysArr: IWeekDays[] = [];
  const daysArr: IDay[] = [];

  // Trouver les jours du mois
  for (let i = 1; i <= numOfDaysInMonth; i++) {
    const today = new Date(year, month, i);

    daysArr.push({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      dateString: `${month}/${i}/${year}`,
      dayName: weekdays[NumOfPaddingDays(today)],
      isCurrentDay: today.getDate() === realDay,
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

  // alert("done");

  return [paddingDaysArr, daysArr, dateDisplay];
}

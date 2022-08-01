import { IWeekDays } from "./IWeekDays";
import { IEvent } from "./IEvent";

/**
 * Interface représentant une journée
 */
export interface IDay {
  /**
   * Le jour
   */
  date: number;

  /**
   * Le mois
   */
  month: number;
  /**
   * L'année
   */
  year: number;

  /**
   * Le nom du jour
   */
  dayName: IWeekDays;

  /**
   * True si c'est aujourd'hui
   */
  isCurrentDay: boolean;

  /**
   * True si c'est un padding day (case vide)
   */
  isPadding: boolean;
}

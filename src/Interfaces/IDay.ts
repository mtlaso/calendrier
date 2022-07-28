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
   * La date en format en_us (MM/DD/YYYY)
   */
  dateString: string;

  /**
   * Le nom du jour
   */
  dayName: IWeekDays;

  /**
   * True si c'est aujourd'hui
   */
  isCurrentDay: boolean;

  /**
   * Évènements de l'utilisateur
   */
  event: IEvent[] | null;

  /**
   * True si c'est un padding day (case vide)
   */
  isPadding: boolean;
}

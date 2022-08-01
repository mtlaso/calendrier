import { IWeekDays } from "./IWeekDays";
import { IDay } from "./IDay";
import { IEvent } from "./IEvent";

/**
 * Interface du calendrier
 */
export interface ICalendar {
  /**
   * Date à afficher sur le header
   */
  dateDisplay: string;

  /**
   * Liste des jours du mois
   */
  days: IDay[];

  /**
   * Liste des padding days (cases vides avant le premier jour du mois)
   */
  paddingDays: IWeekDays[];

  /**
   * Évènements à afficher sur le calendrier
   */
  calendarEvents: IEvent[];

  /**
   * Fonction appelée lors de l'ajout d'un évènement
   */
  onAddEvent: (year: number, month: number, date: number) => void;

  /**
   * Fonction appelée lors de la modification d'un évènement
   */
  onUpdateEvent: (event: IEvent) => void;
}

/**
 * Interface representant un événement
 */
export interface IEvent {
  /**
   * Identifiant
   */
  id: string;

  /**
   * La date
   * Format: YYYY-MM-DD
   */
  date: string;

  /**
   * Le titre
   */
  title: string;

  /**
   * True si complété
   */
  isCompleted: boolean;
}

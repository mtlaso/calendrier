/**
 * Interface representant un événement
 */
export interface IEvent {
  /**
   * Identifiant de l'évènement
   */
  id: string;

  /**
   * La date de l'évènement.
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

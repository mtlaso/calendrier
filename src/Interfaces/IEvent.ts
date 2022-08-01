/**
 * Interface representant un événement
 */
export interface IEvent {
  /**
   * Identifiant de l'évènement
   */
  id: string;

  /**
   * Date de création de l'évènement
   */
  createdAtDate: string;

  /**
   * Mois de création de l'évènement
   */
  createdAtMonth: string;

  /**
   * Année de création de l'évènement
   */
  createdAtYear: string;

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

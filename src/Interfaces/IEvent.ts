// Represente un événement
export interface IEvent {
  id: string;
  /**
   * Format: YYYY-MM-DD
   */
  date: string;
  title: string;
  isCompleted: boolean;
}

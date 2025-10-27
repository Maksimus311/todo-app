import { Sprint } from '../types';

export const validateSprint = (sprint: Partial<Sprint>): string | null => {
  if (!sprint.name || !sprint.goal || !sprint.startDate || !sprint.endDate) {
    return 'Все поля должны быть заполнены.';
  }
  if (sprint.startDate >= sprint.endDate) {
    return 'Дата окончания должна быть позже даты начала.';
  }
  return null;
};

export const calculateDuration = (start: Date, end: Date): number => {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

import { Task, Sprint } from '../types';

export const validateTask = (task: Partial<Task>, sprints: Sprint[]): string | null => {
  if (!task.title || !task.subtitle || !task.author || !task.assignee || !task.description || !task.estimatedTime) {
    return 'Все обязательные поля должны быть заполнены.';
  }
  if (task.description.length < 40) {
    return 'Описание должно содержать не менее 40 символов.';
  }
  if (task.comments && task.comments.length < 40) {
    return 'Комментарии должны содержать не менее 40 символов.';
  }
  const sprint = sprints.find(s => s.id === task.sprintId);
  if (sprint) {
    const remainingTime = (sprint.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24); // В днях
    const taskTime = task.estimatedTime.days + task.estimatedTime.hours / 8;
    if (remainingTime < taskTime) {
      return `Недостаточно времени в спринте. Осталось ${remainingTime.toFixed(1)} дней.`;
    }
  }
  return null;
};

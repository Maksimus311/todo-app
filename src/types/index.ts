export interface Task {
  id: string; // Формат: XX-1234
  title: string;
  subtitle: string;
  author: string; // ID пользователя
  assignee: string; // ID пользователя
  estimatedTime: { hours: number; days: number }; // Время выполнения
  description: string; // >=40 символов
  comments?: string; // >=40 символов, если есть
  watchers?: string[]; // Массив ID пользователей
  sprintId: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
}

export interface User {
  id: string;
  fullName: string;
  position: string;
  department: string;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  duration: number; // В днях
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

import { useState } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    // Mock-данные
    {
      id: 'AB-1',
      title: 'Задача 1',
      subtitle: 'Подзаголовок 1',
      author: '1',
      assignee: '1',
      estimatedTime: { hours: 6, days: 0 },
      description: 'Описание задачи 1, которое содержит более сорока символов для валидации.',
      comments: 'Комментарии к задаче, также более сорока символов.',
      watchers: ['2'],
      sprintId: 'sprint1',
      status: 'todo',
      createdAt: new Date(),
    },
  ]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return { tasks, addTask, updateTask };
};

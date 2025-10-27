import { useState } from 'react';
import { Sprint } from '../types';

export const useSprints = () => {
  const [sprints, setSprints] = useState<Sprint[]>([
    // Mock-данные
    {
      id: 'sprint1',
      name: 'Спринт 1',
      goal: 'Цель спринта 1',
      duration: 14,
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  ]);

  const addSprint = (sprint: Sprint) => {
    setSprints(prev => [...prev, sprint]);
  };

  return { sprints, addSprint };
};

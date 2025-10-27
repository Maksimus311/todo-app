import { useState } from 'react';
import { User } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([
    // Mock-данные
    { id: '1', fullName: 'Иван Иванов', position: 'Разработчик', department: 'IT' },
    { id: '2', fullName: 'Петр Петров', position: 'Тестировщик', department: 'QA' },
  ]);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return { users, addUser };
};

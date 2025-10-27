import React, { useState } from 'react';
import { useTasks, useUsers, useSprints } from '../hooks';
import { Task, User, Sprint } from '../types';
import { generateTaskId } from '../utils/generateTaskId';
import { validateTask } from '../utils/validateTask';
import { validateSprint, calculateDuration } from '../utils/validateSprint';
import InputField from '../components/InputField';
import Button from '../components/Button';
import styles from '../styles/AdminPanel.module.scss';

const AdminPanel: React.FC = () => {
  const { addTask } = useTasks();
  const { users, addUser } = useUsers();
  const { sprints, addSprint } = useSprints();

  // Состояние для формы задачи
  const [taskForm, setTaskForm] = useState<Partial<Task>>({
    estimatedTime: { hours: 0, days: 0 },
    watchers: [],
  });
  const [taskError, setTaskError] = useState<string>('');

  // Состояние для формы спринта
  const [sprintForm, setSprintForm] = useState<Partial<Sprint>>({});
  const [sprintError, setSprintError] = useState<string>('');

  // Состояние для формы пользователя
  const [userForm, setUserForm] = useState<Partial<User>>({});

  const handleAddTask = () => {
    const error = validateTask(taskForm, sprints);
    if (error) {
      setTaskError(error);
      return;
    }
    const newTask: Task = {
      ...taskForm as Task,
      id: generateTaskId(),
      createdAt: new Date(),
    };
    addTask(newTask);
    setTaskForm({ estimatedTime: { hours: 0, days: 0 }, watchers: [] });
    setTaskError('');
  };

  const handleAddSprint = () => {
    const error = validateSprint(sprintForm);
    if (error) {
      setSprintError(error);
      return;
    }
    const duration = calculateDuration(sprintForm.startDate!, sprintForm.endDate!);
    const newSprint: Sprint = { ...sprintForm as Sprint, duration, isActive: false };
    addSprint(newSprint);
    setSprintForm({});
    setSprintError('');
  };

  const handleAddUser = () => {
    const newUser: User = { ...userForm as User, id: Date.now().toString() };
    addUser(newUser);
    setUserForm({});
  };

  return (
    <div className={styles.container}>
      <h1>Панель администратора</h1>
      
      <div className={styles.section}>
        <h2>Добавить задачу</h2>
        <InputField label="Заголовок" value={taskForm.title || ''} onChange={(v) => setTaskForm({ ...taskForm, title: v as string })} required />
        <InputField label="Подзаголовок" value={taskForm.subtitle || ''} onChange={(v) => setTaskForm({ ...taskForm, subtitle: v as string })} required />
        <InputField label="Автор" value={taskForm.author || ''} onChange={(v) => setTaskForm({ ...taskForm, author: v as string })} required />
        <InputField label="Исполнитель" value={taskForm.assignee || ''} onChange={(v) => setTaskForm({ ...taskForm, assignee: v as string })} required />
        <InputField label="Часы" type="number" value={taskForm.estimatedTime?.hours || 0} onChange={(v) => setTaskForm({ ...taskForm, estimatedTime: { ...taskForm.estimatedTime!, hours: v as number } })} />
        <InputField label="Дни" type="number" value={taskForm.estimatedTime?.days || 0} onChange={(v) => setTaskForm({ ...taskForm, estimatedTime: { ...taskForm.estimatedTime!, days: v as number } })} />
        <InputField label="Описание" type="textarea" value={taskForm.description || ''} onChange={(v) => setTaskForm({ ...taskForm, description: v as string })} required />
        <InputField label="Комментарии" type="textarea" value={taskForm.comments || ''} onChange={(v) => setTaskForm({ ...taskForm, comments: v as string })} />
        <InputField label="Наблюдатели (ID через запятую)" value={taskForm.watchers?.join(', ') || ''} onChange={(v) => setTaskForm({ ...taskForm, watchers: (v as string).split(', ').filter(Boolean) })} />
        <Button label="Добавить задачу" onClick={handleAddTask} />
        {taskError && <p className={styles.error}>{taskError}</p>}
      </div>
      
      <div className={styles.section}>
        <h2>Добавить спринт</h2>
        <InputField label="Имя спринта" value={sprintForm.name || ''} onChange={(v) => setSprintForm({ ...sprintForm, name: v as string })} required />
        <InputField label="Цель спринта" value={sprintForm.goal || ''} onChange={(v) => setSprintForm({ ...sprintForm, goal: v as string })} required />
        <InputField label="Дата начала" type="date" value={sprintForm.startDate?.toISOString().split('T')[0] || ''} onChange={(v) => setSprintForm({ ...sprintForm, startDate: new Date(v as string) })} required />
        <InputField label="Дата окончания" type="date" value={sprintForm.endDate?.toISOString().split('T')[0] || ''} onChange={(v) => setSprintForm({ ...sprintForm, endDate: new Date(v as string) })} required />
        <Button label="Добавить спринт" onClick={handleAddSprint} />
        {sprintError && <p className={styles.error}>{sprintError}</p>}
      </div>
      
      <div className={styles.section}>
        <h2>Добавить участника</h2>
        <InputField label="ФИО" value={userForm.fullName || ''} onChange={(v) => setUserForm({ ...userForm, fullName: v as string })} required />
        <InputField label="Должность" value={userForm.position || ''} onChange={(v) => setUserForm({ ...userForm, position: v as string })} required />
        <InputField label="Подразделение" value={userForm.department || ''} onChange={(v) => setUserForm({ ...userForm, department: v as string })} required />
        <Button label="Добавить участника" onClick={handleAddUser} />
      </div>
    </div>
  );
};

export default AdminPanel;

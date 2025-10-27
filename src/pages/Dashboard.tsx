import React, { useState } from 'react';
import { useTasks, useUsers, useSprints } from '../hooks';
import StatisticsChart from '../components/StatisticsChart';
import styles from '../styles/Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();
  const { users } = useUsers();
  const { sprints } = useSprints();
  const [filterUser, setFilterUser] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'product' | 'backlog'>('product');

  const activeSprint = sprints.find(s => s.isActive);
  const sprintTasks = tasks.filter(t => t.sprintId === activeSprint?.id);
  const filteredTasks = filterUser === 'all' 
    ? sprintTasks 
    : sprintTasks.filter(t => t.assignee === filterUser);
  const doneTasks = filteredTasks.filter(t => t.status === 'done');

  return (
    <div className={styles.container}>
      <h1>Рабочий стол</h1>
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab('product')}>Product</button>
        <button onClick={() => setActiveTab('backlog')}>Backlog</button>
      </div>
      <div className={styles.filters}>
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
          <option value="all">Вся команда</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.fullName} (only my issues)</option>)}
        </select>
      </div>
      <StatisticsChart tasks={filteredTasks} />
      <div className={styles.tasks}>
        <h2>Выполненные задачи</h2>
        {doneTasks.map(task => (
          <div key={task.id} className={styles.task}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      {activeSprint && (
        <div className={styles.sprintInfo}>
          <h2>Текущий спринт: {activeSprint.name}</h2>
          <p>Цель: {activeSprint.goal}</p>
          <p>Длительность: {activeSprint.duration} дней</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

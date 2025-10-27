import React, { useState } from 'react';
import { useTasks, useUsers, useSprints } from '../hooks';
import styles from '../styles/ActiveSprint.module.scss';

const ActiveSprint: React.FC = () => {
  const { tasks, updateTask } = useTasks();
  const { users } = useUsers();
  const { sprints } = useSprints();
  const [filterUser, setFilterUser] = useState<string>('all');

  const activeSprint = sprints.find(s => s.isActive);
  const sprintTasks = tasks.filter(t => t.sprintId === activeSprint?.id);
  const filteredTasks = filterUser === 'all' 
    ? sprintTasks 
    : sprintTasks.filter(t => t.assignee === filterUser);

  const columns = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    done: filteredTasks.filter(t => t.status === 'done'),
  };

  const handleUpdateTask = (id: string, status: 'todo' | 'in-progress' | 'done') => {
    updateTask(id, { status });
  };

  return (
    <div className={styles.container}>
      <h1>Активный спринт</h1>
      <div className={styles.filters}>
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
          <option value="all">Все участники</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
        </select>
      </div>
      <div className={styles.kanbanBoard}>
        {Object.entries(columns).map(([status, tasksInColumn]) => (
          <div key={status} className={styles.column}>
            <h2>{status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'} ({tasksInColumn.length})</h2>
            <div className={styles.tasksList}>
              {tasksInColumn.map(task => (
                <div key={task.id} className={styles.taskCard}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Исполнитель: {users.find(u => u.id === task.assignee)?.fullName}</p>
                  <div className={styles.actions}>
                    {status !== 'todo' && <button onClick={() => handleUpdateTask(task.id, 'todo')}>To Do</button>}
                    {status !== 'in-progress' && <button onClick={() => handleUpdateTask(task.id, 'in-progress')}>In Progress</button>}
                    {status !== 'done' && <button onClick={() => handleUpdateTask(task.id, 'done')}>Done</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSprint;

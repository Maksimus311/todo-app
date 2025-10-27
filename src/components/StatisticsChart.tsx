import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Task } from '../types';

interface StatisticsChartProps {
  tasks: Task[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ tasks }) => {
  const data = [
    { name: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'Done', count: tasks.filter(t => t.status === 'done').length },
  ];

  return (
    <div>
      <h3>Статистика задач</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default StatisticsChart;

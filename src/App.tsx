import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ActiveSprint from './pages/ActiveSprint';
import AdminPanel from './pages/AdminPanel';
import styles from './styles/App.module.scss'; // Создайте этот файл с базовыми стилями, если нужно

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Link to="/">Главная (Рабочий стол)</Link>
          <Link to="/active-sprint">Активный спринт</Link>
          <Link to="/admin">Панель администратора</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/active-sprint" element={<ActiveSprint />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


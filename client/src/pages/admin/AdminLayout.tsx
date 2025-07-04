// src/pages/admin/AdminLayout.tsx
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <NavLink to="/admin" end>🏠 Главная</NavLink>
          <NavLink to="/admin/users">👤 Пользователи</NavLink>
          <NavLink to="/">🔙 На сайт</NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

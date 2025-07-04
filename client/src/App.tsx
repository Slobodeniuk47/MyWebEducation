// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserList from './pages/admin/users/AdminUsersList';
import AdminUserCreate from './pages/admin/users/AdminUserCreate';
import AdminUserUpdate from './pages/admin/users/AdminUserUpdate';
// другие импорты...

function App() {
  return (
    <Router>
      <Routes>
        {/* Админ-панель */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="user/create" element={<AdminUserCreate />} />
          <Route path="user/update/:id" element={<AdminUserUpdate />} />
        </Route>

        {/* Другие маршруты */}
      </Routes>
    </Router>
  );
}

export default App;

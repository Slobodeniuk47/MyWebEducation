// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserList from './pages/admin/users/AdminUsersList';
import AdminUserCreate from './pages/admin/users/AdminUserCreate';
import AdminUserUpdate from './pages/admin/users/AdminUserUpdate';
import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // 👈 додаємо захист

function App() {
  return (
    <Router>
      <Routes>
        {/* Сторінка логіну */}
        <Route path="/login" element={<LoginPage />} />

        {/* Захищена адмін-панель */}
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="user/create" element={<AdminUserCreate />} />
          <Route path="user/update/:id" element={<AdminUserUpdate />} />
        </Route>

        {/* Тут можна додати публічну головну сторінку, наприклад */}
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

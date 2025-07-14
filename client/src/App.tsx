// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserList from './pages/admin/users/AdminUsersList';
import AdminUserCreate from './pages/admin/users/AdminUserCreate';
import AdminUserUpdate from './pages/admin/users/AdminUserUpdate';

import AdminCourseList from './pages/admin/courses/AdminCourseList';
import AdminCourseCreate from './pages/admin/courses/AdminCourseCreate';
import AdminCourseUpdate from './pages/admin/courses/AdminCourseUpdate';

import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Сторінкu login/register */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Захищена адмін-панель */}
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          
          {/* Користувачі */}
          <Route path="users" element={<AdminUserList />} />
          <Route path="user/create" element={<AdminUserCreate />} />
          <Route path="user/update/:id" element={<AdminUserUpdate />} />

          {/* Курси */}
          <Route path="courses" element={<AdminCourseList />} />
          <Route path="course/create" element={<AdminCourseCreate />} />
          <Route path="course/update/:id" element={<AdminCourseUpdate />} />
        </Route>

        {/* Можна додати публічну головну сторінку */}
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

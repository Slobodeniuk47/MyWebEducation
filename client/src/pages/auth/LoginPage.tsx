import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJSON } from '../../api/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosJSON.post<{ token: string }>('/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/users');
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Неверные учетные данные');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default LoginPage;

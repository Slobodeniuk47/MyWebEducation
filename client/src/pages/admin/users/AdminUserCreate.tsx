// src/pages/admin/AdminUserCreate.tsx
import React, { useState } from 'react';
import { axiosJSON } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const AdminUserCreate: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosJSON.post('/users/create', { email, password });
      navigate('/admin/users');
    } catch (err) {
      setError('Ошибка при создании пользователя');
    }
  };

  return (
    <div>
      <h1>Создать пользователя</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default AdminUserCreate;

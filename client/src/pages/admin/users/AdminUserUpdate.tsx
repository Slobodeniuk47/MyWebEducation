// src/pages/admin/AdminUserUpdate.tsx
import React, { useState, useEffect } from 'react';
import { axiosJSON } from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminUserUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosJSON.get(`/users/getById/${id}`);
        setEmail(res.data.email);
      } catch {
        setError('Ошибка загрузки пользователя');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosJSON.put(`/users/updateById/${id}`, { email });
      navigate('/admin/users');
    } catch {
      setError('Ошибка при обновлении пользователя');
    }
  };

  return (
    <div>
      <h1>Редактировать пользователя</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default AdminUserUpdate;

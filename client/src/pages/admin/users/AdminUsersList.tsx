import { useEffect, useState } from 'react';
import { axiosJSON } from '../../../api/axios';
import { Link } from 'react-router-dom';
import { User } from '../../../types/user';
import './AdminUserList.css';

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    axiosJSON.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      await axiosJSON.delete(`/users/${selectedUserId}`);
      setUsers(prev => prev.filter(user => user.id !== selectedUserId));
      setSelectedUserId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Пользователи</h2>
      <Link to="/admin/user/create">➕ Создать</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
            <Link to={`/admin/user/update/${user.id}`}>✏️</Link>
            <button onClick={() => setSelectedUserId(user.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Удалить пользователя ID {selectedUserId}?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="yes">Да</button>
              <button onClick={() => setSelectedUserId(null)} className="no">Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

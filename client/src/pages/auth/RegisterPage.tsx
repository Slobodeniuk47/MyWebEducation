import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJSON } from '../../api/axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { APP_ENV } from '../../env';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axiosJSON.post<{ token: string; user: any }>('/users/register', {
        email,
        name,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/users');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации');
    }
  };

  const handleGoogleRegister = async (token: string) => {
    try {
      const response = await axiosJSON.post<{ token: string }>('/users/googleLogin', {
        token,
        provider: 'google',
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/users');
    } catch (error) {
      console.error('Ошибка Google регистрации:', error);
      alert('Ошибка при регистрации через Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_AUTH_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Регистрация</h2>

          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Зарегистрироваться
          </button>

          <div className="text-center text-gray-500">или</div>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleRegister(credentialResponse.credential);
              }
            }}
            onError={() => {
              alert('Google регистрация не удалась');
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;

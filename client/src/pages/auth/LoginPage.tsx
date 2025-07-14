import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosJSON } from '../../api/axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { APP_ENV } from '../../env';

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

  const handleGoogleLogin = async (token: string) => {
    try {
      const response = await axiosJSON.post<{ token: string }>('/users/googleLogin', {
        token,
        provider: 'google',
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/users');
    } catch (error) {
      console.error('Ошибка Google входа:', error);
      alert('Ошибка при входе через Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_AUTH_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Вход в аккаунт</h2>

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
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Войти
          </button>

          <div className="text-center text-gray-500">или</div>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              }
            }}
            onError={() => {
              alert('Google авторизация не удалась');
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;

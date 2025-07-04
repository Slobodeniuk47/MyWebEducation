// src/api/axios.ts
import axios from 'axios';
import { APP_ENV } from '../env';

// Создаём JSON-инстанс
export const axiosJSON = axios.create({
  baseURL: APP_ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Создаём FormData-инстанс
export const axiosFORM = axios.create({
  baseURL: APP_ENV.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Добавляем интерцептор токена в оба инстанса
const attachToken = (config: any) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axiosJSON.interceptors.request.use(attachToken, (error) => Promise.reject(error));
axiosFORM.interceptors.request.use(attachToken, (error) => Promise.reject(error));



//===============   Тестовая фича. Пока оставим.  =======================



// Обработка ответа с ошибкой 401 — автоматический logout
const handleUnauthorized = (error: any) => {
  if (error.response?.status === 401) {
    // Удаляем токен
    localStorage.removeItem('token');
    // Можно здесь вызвать коллбек или ивент для оповещения приложения, например:
    // window.dispatchEvent(new Event('logout'));
  }
  return Promise.reject(error);
};

axiosJSON.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

axiosFORM.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);
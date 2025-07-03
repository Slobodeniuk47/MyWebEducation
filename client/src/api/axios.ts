// src/api/axios.ts
import axios from 'axios';
import { APP_ENV } from '../env';

export const axiosJSON = axios.create({
  baseURL: APP_ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosFORM = axios.create({
  baseURL: APP_ENV.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

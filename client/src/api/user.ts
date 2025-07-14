// src/api/user.ts

import axios from 'axios';
import { User } from '../types/user';

const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

export const createUser = async (userData: Partial<User>) => {
  const response = await axios.post(`${API_BASE_URL}api/users`, userData);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}api/users/login`, { email, password });
  return response.data; // скорее всего, токен
};

export const getUserById = async (id: number, token: string) => {
  const response = await axios.get(`${API_BASE_URL}api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>, token: string) => {
  const response = await axios.put(`${API_BASE_URL}api/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (id: number, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

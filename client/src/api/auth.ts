import { axiosJSON } from './axios';
import { User } from '../types/user';

export const login = async (email: string, password: string): Promise<string> => {
  const res = await axiosJSON.post<{ token: string }>('/auth/login', { email, password });
  return res.data.token;
};

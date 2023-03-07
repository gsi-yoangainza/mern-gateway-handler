import axios from 'axios';

import { IUser } from '../../security/types';

const API_URL = '/api/users/';

const getSession = (): string => {
  return JSON.parse(localStorage.getItem('user') ?? '{}');
};

// Register user
const register = async (userData: any) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Register login
const login = async (userData: Pick<IUser, 'email' | 'password'>) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
  getSession,
};

export default authService;

// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as needed

export const useAuth = () => {
  return useContext(AuthContext);
};

// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase.js'; // Adjust the path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, user_id: user ? user.uid : null }}>
      {children}
    </AuthContext.Provider>
  );
};

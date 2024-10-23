// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../FirebaseUse'; // Adjust the path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUsername(user ? user.email : null); // Set the username based on the user object
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, user_id: user ? user.uid : null, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

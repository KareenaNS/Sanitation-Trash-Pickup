// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../FirebaseUse'; // Adjust the path as needed
import { signOut } from 'firebase/auth';

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

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error during sign out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, user_id: user ? user.uid : null, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

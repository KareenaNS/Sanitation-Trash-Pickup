import React, { useState, useEffect } from "react"; 
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import customTheme from "./index";
import AddResidentForm from './components/AddResidentForm'; // Adjust the path as necessary
// import Result from './Result';
// import History from './History';
import Login from "./components/Login"; 
import NavBar from './components/NavBar';
import Home from './components/Home';
import RegisterUser from "./components/RegisterUser";
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { auth } from './FirebaseUse'; // Import Firebase auth
import QRCodeScanner from './components/QRCodeScanner'; // Import QRCodeScanner
import PaymentStatus from './components/PaymentStatus'; // Ensure this line is present


const App = () => {
  const [user, setUser] = useState(null); //store the username after login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleRegister = () => {
    setUser(auth().currentUser);
  };

  const handleLogin = () => {
      setUser(auth().currentUser);
  };
  
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <BrowserRouter>
        <NavBar user={user} /> {/* Pass the user to NavBar if needed */}
        <Routes>
            <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/home" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterUser onRegister={handleRegister} />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} /> {/* Protected Route */}
            <Route path="/components/add-resident" element={user ? <AddResidentForm /> : <Navigate to="/login" />} /> {/* Protected Route */}
            <Route path="/payment-status/:residentId" element={<PaymentStatus />} /> {/* Update route to pass resident ID */}
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

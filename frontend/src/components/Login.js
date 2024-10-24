// src/components/Login.js
import React, { useState, useContext } from "react";
import { Box, Input, Button, Text, Link, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseUse';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
  const { setUsername } = useContext(AuthContext); // Get setUsername from AuthContext
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // State for name
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUsername(user.email); // Set the username to the logged-in user's email
        navigate("/"); // Navigate to home or desired route
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsername(user.email); // Set the username to the signed-up user's email
        navigate("/home"); // Navigate to home or desired route
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        width="100%"
        textAlign="center"
      >
        <Text fontSize="2xl" mb={4}>
          {isSignUp ? "Sign Up" : "Login"}
        </Text>

        {isSignUp && (
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
          />
        )}

        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={4}
        />
        {error && <Text color="red.500">{error}</Text>}

        <Button colorScheme="cyan" width="100%" mt={4} onClick={isSignUp ? onSubmit : onLogin}>
          {isSignUp ? "Sign Up" : "Login"}
        </Button>

        <Box mt={4}>
          <Text>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link color="cyan.500" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Sign Up"}
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;

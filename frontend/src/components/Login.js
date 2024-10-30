// // src/components/Login.js
// import React, { useState, useContext } from "react";
// import { Box, Input, Button, Text, Link, Flex } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../FirebaseUse';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext

// const Login = () => {
//   const { setUsername } = useContext(AuthContext); // Get setUsername from AuthContext
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState(""); // State for name
//   const [error, setError] = useState(null);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();

//   const onLogin = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;
//         setUsername(user.email); // Set the username to the logged-in user's email
//         navigate("/"); // Navigate to home or desired route
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         setError(errorMessage);
//       });
//   };

//   // const onSubmit = async (e) => {
//   //   e.preventDefault();
//   //   await createUserWithEmailAndPassword(auth, email, password)
//   //     .then((userCredential) => {
//   //       const user = userCredential.user;
//   //       setUsername(user.email); // Set the username to the signed-up user's email
//   //       navigate("/home"); // Navigate to home or desired route
//   //     })
//   //     .catch((error) => {
//   //       const errorMessage = error.message;
//   //       setError(errorMessage);
//   //     });
//   // };
//   const onSubmit = async (e) => {
//     e.preventDefault();
  
//     // Basic validation to ensure email has correct domain and password length
//     if (!email.endsWith('@morrowga.gov')) {
//       setError("Please use a @morrowga.gov email address.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
  
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       setUsername(user.email); // Set the username to the signed-up user's email
//       navigate("/home"); // Navigate to home or desired route
//     } catch (error) {
//       // Capture and display specific Firebase errors
//       setError(error.message);
//       console.error("Sign up error: ", error.code, error.message);
//     }
//   };
  

//   return (
//     <Flex height="100vh" alignItems="center" justifyContent="center">
//       <Box
//         p={8}
//         maxWidth="400px"
//         borderWidth={1}
//         borderRadius={8}
//         boxShadow="lg"
//         width="100%"
//         textAlign="center"
//       >
//         <Text fontSize="2xl" mb={4}>
//           {isSignUp ? "Sign Up" : "Login"}
//         </Text>

//         {isSignUp && (
//           <Input
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             mb={4}
//           />
//         )}

//         <Input
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           mb={4}
//         />
//         <Input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           mb={4}
//         />
//         {error && <Text color="red.500">{error}</Text>}

//         <Button colorScheme="cyan" width="100%" mt={4} onClick={isSignUp ? onSubmit : onLogin}>
//           {isSignUp ? "Sign Up" : "Login"}
//         </Button>

//         <Box mt={4}>
//           <Text>
//             {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
//             <Link color="cyan.500" onClick={() => setIsSignUp(!isSignUp)}>
//               {isSignUp ? "Login" : "Sign Up"}
//             </Link>
//           </Text>
//         </Box>
//       </Box>
//     </Flex>
//   );
// };

// export default Login;


// Login.js
import React, { useContext } from "react";
import { auth } from "../FirebaseUse";
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, Link, Flex, Input } from "@chakra-ui/react";

const Login = () => {
  const { setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      prompt: "consent",
      tenant: "4c47dd21-0a06-4730-85db-4c8376d34220" // Optional if using a specific tenant
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email.endsWith("@morrowga.gov")) {
        setUsername(user.email);
        navigate("/home");
      } else {
        alert("Only morrowga.gov emails are allowed.");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Microsoft sign-in error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button onClick={handleMicrosoftLogin} colorScheme="cyan">
        Sign in with Microsoft
      </Button>
    </Box>
  );
};

export default Login;

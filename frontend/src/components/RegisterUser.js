import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import addUser from "../utils/AddUser";

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Add state for password

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            id: email, // Use email as the unique identifier
            name,
            email,
            password,
            createdAt: new Date(),
        };

        await addUser(userData);
        alert("User registered successfully!");
        // Reset form fields
        setName("");
        setEmail("");
        setPassword(""); // Reset password field
    };

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </FormControl>
                <FormControl mb={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <FormControl mb={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password" // Change type to password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default RegisterUser;
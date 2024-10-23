import React, { useState } from "react";
import { Box, Input, Button, Text, FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
    const [address, setAddress] = useState("");
    const [resident, setResident] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedResident, setUpdatedResident] = useState({});

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get-resident`, {
                params: { address },
            });
            setResident(response.data);
            setUpdatedResident(response.data); // Set initial values for editing
        } catch (error) {
            console.error("Error fetching resident:", error);
            alert("Resident not found.");
        }
    };

    const handleEdit = (field, value) => {
        setUpdatedResident((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/update-resident/${resident.id}`, updatedResident);
            alert("Resident updated successfully!");
            setResident(updatedResident);
            setEditing(false);
        } catch (error) {
            console.error("Error updating resident:", error);
            alert("Failed to update resident.");
        }
    };

    return (
        <Box p={5}>
            <FormControl mb={4}>
                <FormLabel>Search Resident by Address</FormLabel>
                <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter resident address"
                />
                <Button mt={2} colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
            </FormControl>

            {resident && (
                <Box mt={4}>
                    <Text fontSize="xl">Resident Details:</Text>
                    <Text>ID: {resident.id}</Text>
                    <Text>Address: {resident.address}</Text>
                    <Text>Payment Status: {resident.paymentStatus ? "Yes" : "No"}</Text>
                    <Text>Trash Collection: {resident.trashCollection ? "Yes" : "No"}</Text>
                    <Text>Pickup Day: {resident.pickupDay || "N/A"}</Text>

                    {editing ? (
                        <Box mt={4}>
                            <Text fontSize="lg">Edit Resident:</Text>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedResident.address}
                                    onChange={(e) => handleEdit("address", e.target.value)}
                                />
                                <FormLabel>Payment Status</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedResident.paymentStatus ? "Yes" : "No"}
                                    onChange={(e) => handleEdit("paymentStatus", e.target.value.toLowerCase() === "yes")}
                                />
                                <FormLabel>Trash Collection</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedResident.trashCollection ? "Yes" : "No"}
                                    onChange={(e) => handleEdit("trashCollection", e.target.value.toLowerCase() === "yes")}
                                />
                                <FormLabel>Pickup Day</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedResident.pickupDay || ""}
                                    onChange={(e) => handleEdit("pickupDay", e.target.value)}
                                />
                                <Button mt={4} colorScheme="teal" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button mt={4} ml={2} onClick={() => setEditing(false)}>
                                    Cancel
                                </Button>
                            </FormControl>
                        </Box>
                    ) : (
                        <Button mt={4} colorScheme="blue" onClick={() => setEditing(true)}>
                            Edit Resident
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Home;

import React, { useState } from "react";
import {
    Box,
    Input,
    Button,
    Text,
    FormControl,
    FormLabel,
    Select, 
    Image,
    HStack,
} from "@chakra-ui/react"; 
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
    
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this resident? Please confirm with their address.");
        if (confirmDelete && prompt("Please enter the resident's address to confirm deletion:") === resident.address) {
            try {
                await axios.delete(`http://localhost:5000/delete-resident/${resident.id}`);
                alert("Resident deleted successfully!");
                setResident(null); // Clear the resident state after deletion
                setUpdatedResident({}); // Reset updated resident state
            } catch (error) {
                console.error("Error deleting resident:", error);
                alert("Failed to delete resident.");
            }
        }
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
        <Box p={5} pl={10} pr={5}>
            <FormControl mb={4}>
                <FormLabel>Search Resident by Address</FormLabel>
                <HStack spacing={2}> {/* Use HStack to group Input and Button with spacing */}
                    <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter resident address"
                        width="200px" // Set a specific width for the input to shorten it
                    />
                    <Button mt={2} colorScheme="teal" onClick={handleSearch}>
                        Search
                    </Button>
                </HStack>
            </FormControl>

            {resident && (
                <Box mt={4} bg="white" p={4} borderRadius="md" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold">Resident Details:</Text>
                    <Text>ID: {resident.id}</Text>
                    <Text>Address: {resident.address}</Text>
                    <Text>Payment Status: {resident.paymentStatus ? "Yes" : "No"}</Text>
                    <Text>Trash Collection: {resident.trashCollection ? "Yes" : "No"}</Text>
                    <Text>Pickup Day: {editing ? updatedResident.pickupDay : (resident.pickupDay || "N/A")}</Text>

                    {editing ? (
                        <Box mt={4}>
                            <Text fontSize="lg" fontWeight="bold">Edit Resident:</Text>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={updatedResident.address}
                                    onChange={(e) => handleEdit("address", e.target.value)}
                                />
                                <FormLabel>Payment Status</FormLabel>
                                <Select
                                    value={updatedResident.paymentStatus ? "Yes" : "No"}
                                    onChange={(e) => handleEdit("paymentStatus", e.target.value === "Yes")}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Select>
                                <FormLabel>Trash Collection</FormLabel>
                                <Select
                                    value={updatedResident.trashCollection ? "Yes" : "No"}
                                    onChange={(e) => handleEdit("trashCollection", e.target.value === "Yes")}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Select>
                                <FormLabel>Pickup Day</FormLabel>
                                <Select
                                    value={updatedResident.pickupDay || ""}
                                    onChange={(e) => handleEdit("pickupDay", e.target.value)}
                                >
                                    <option value="" disabled>Select a day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                </Select>
                                <Button mt={4} colorScheme="teal" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button mt={4} ml={2} onClick={() => setEditing(false)}>
                                    Cancel
                                </Button>
                            </FormControl>
                        </Box>
                    ) : (
                        <Box mt={4}>
                            <HStack spacing={4}>
                                <Button variant="edit" onClick={() => setEditing(true)}>
                                    Edit Resident
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete Resident
                                </Button>
                            </HStack>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Home;

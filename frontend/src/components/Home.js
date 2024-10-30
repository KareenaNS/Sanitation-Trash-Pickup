import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Select,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseUse"; // Ensure to import your Firebase setup

const Home = () => {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [filterPayment, setFilterPayment] = useState([]);
  const [filterTrashCollected, setFilterTrashCollected] = useState("");
  const [filterPickupDays, setFilterPickupDays] = useState([]);
  const [editingResident, setEditingResident] = useState(null);
  const [updatedResident, setUpdatedResident] = useState({
    address: "",
    pickupDay: "",
    paymentStatus: false, // Set default boolean value
    trashCollection: false, // Set default boolean value
});  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch residents from Firestore and sort by pickupDay
  const fetchResidents = async () => {
    try {
      const q = query(collection(db, "residents"), orderBy("pickupDay"));
      const querySnapshot = await getDocs(q);
      const residentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        qrCode: doc.data().qrCode || "",}));
      // Generate QR code if not already present
      residentData.forEach(resident => {
        if (!resident.qrCode) {
          // resident.qrCode = `http://localhost:3000/home/${resident.id}`; // Replace with your QR code URL generation logic
          resident.qrCode = `http://192.168.1.7:3000/payment-status/${resident.id}`; // Use your local IP address
        }
      });
      setResidents(residentData);
      setFilteredResidents(residentData); // Initialize the filtered list
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  // Filter residents automatically based on selections and search term
  useEffect(() => {
    let filtered = residents;

    // Apply payment status filter
    if (filterPayment.length > 0) {
      filtered = filtered.filter(resident =>
        filterPayment.includes(resident.paymentStatus ? "Paid" : "Unpaid")
      );
    }

    // Apply trash collection status filter
    if (filterTrashCollected) {
      filtered = filtered.filter(resident => 
        filterTrashCollected === "Yes" ? resident.trashCollection : !resident.trashCollection
      );
    }

    // Apply pickup day filter
    if (filterPickupDays.length > 0) {
      filtered = filtered.filter(resident =>
        filterPickupDays.includes(resident.pickupDay)
      );
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(resident =>
        resident.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResidents(filtered);
  }, [filterPayment, filterTrashCollected, filterPickupDays, residents, searchTerm]);

  const handleEdit = (resident) => {
    console.log("Resident ID:", resident.id); // Log the ID for debugging
    setEditingResident(resident.id);
    setUpdatedResident({
      address: resident.address,
      pickupDay: resident.pickupDay,
      paymentStatus: resident.paymentStatus, // Assuming this is a boolean
      trashCollection: resident.trashCollection, // Assuming this is a boolean
  });  };

  const handleSave = async () => {
    try {
      const residentRef = doc(db, "residents", String(editingResident));
      await updateDoc(residentRef, updatedResident);
      alert("Resident updated successfully!");
      setEditingResident(null); // Clear editing state
      fetchResidents(); // Refresh the list
    } catch (error) {
      console.error("Error updating resident:", error);
      alert("Failed to update resident.");
    }
  };

  const handleDelete = async (residentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "residents", String(residentId)));
        alert("Resident deleted successfully!");
        fetchResidents(); // Refresh the list
      } catch (error) {
        console.error("Error deleting resident:", error);
        alert("Failed to delete resident.");
      }
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Resident List</Text>

      {/* Filter Section */}
      <HStack spacing={4} mb={6}>
        {/* Payment Status Filter */}
        <Select
          placeholder="Select Payment Status"
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setFilterPayment([value]);
            } else {
              setFilterPayment([]);
            }
          }}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </Select>

        {/* Trash Collection Filter */}
        <Select
          placeholder="Trash Collected?"
          onChange={(e) => {
            setFilterTrashCollected(e.target.value);
          }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>

        {/* Pickup Day Filter */}
        <Select
          placeholder="Select Pickup Day"
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setFilterPickupDays([value]);
            } else {
              setFilterPickupDays([]);
            }
          }}
        >
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </HStack>

      {/* Search Bar */}
      <FormControl mb={6}>
        <FormLabel htmlFor="search">Search by Address</FormLabel>
        <Input
          id="search"
          placeholder="Type address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      {/* Resident List */}
      <VStack align="stretch">
        {filteredResidents.map((resident, index) => (
          <Box
            key={index}
            p={4}
            bg="gray.100"
            borderRadius="md"
            boxShadow="sm"
            w="100%"
            textAlign="left"
          >
            <Text fontSize="lg" fontWeight="bold">
              Address: {resident.address}
            </Text>
            <Text>Pickup Day: {resident.pickupDay}</Text>
            <Text>Payment Status: {resident.paymentStatus ? "Paid" : "Unpaid"}</Text>
            <Text>Trash Collected: {resident.trashCollection ? "Yes" : "No"}</Text>
            <img src={resident.qrCodeData} alt={`QR Code for ${resident.address}`} />
            {editingResident === resident.id ? (
              <Box mt={4}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={updatedResident.address}
                    onChange={(e) => setUpdatedResident({ ...updatedResident, address: e.target.value })}
                  />
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    value={updatedResident.paymentStatus ? "Paid" : "Unpaid"}
                    onChange={(e) => setUpdatedResident({ ...updatedResident, paymentStatus: e.target.value === "Paid" })}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </Select>
                  <FormLabel>Trash Collection</FormLabel>
                  <Select
                    value={updatedResident.trashCollection ? "Yes" : "No"}
                    onChange={(e) => setUpdatedResident({ ...updatedResident, trashCollection: e.target.value === "Yes" })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Select>
                  <FormLabel>Pickup Day</FormLabel>
                  <Select
                    value={updatedResident.pickupDay || ""}
                    onChange={(e) => setUpdatedResident({ ...updatedResident, pickupDay: e.target.value })}
                  >
                    <option value="" disabled>Select a day</option>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Select>
                  <Button mt={4} colorScheme="teal" onClick={handleSave}>
                    Save
                  </Button>
                  <Button mt={4} ml={2} onClick={() => setEditingResident(null)}>
                    Cancel
                  </Button>
                </FormControl>
              </Box>
            ) : (
              <HStack spacing={4}>
                <Button variant="edit" onClick={() => handleEdit(resident)}>
                  Edit Resident
                </Button>
                <Button variant="danger" onClick={() => handleDelete(resident.id)}>
                  Delete Resident
                </Button>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Home;

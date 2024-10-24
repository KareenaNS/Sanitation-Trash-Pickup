// src/components/ResidentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResidentList = () => {
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        // Fetch all residents when component mounts
        const fetchResidents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/residents');
                setResidents(response.data);
            } catch (error) {
                console.error('Error fetching residents:', error);
            }
        };
        fetchResidents();
    }, []);

    const handleDelete = async (residentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this resident?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/delete-resident/${residentId}`);
                setResidents(residents.filter(resident => resident.id !== residentId));
                alert('Resident deleted successfully');
            } catch (error) {
                console.error('Error deleting resident:', error);
                alert('Failed to delete resident');
            }
        }
    };

    return (
        <div>
            <h2>Resident List</h2>
            <ul>
                {residents.map((resident) => (
                    <li key={resident.id}>
                        <p>Address: {resident.address}</p>
                        <p>Pickup Day: {resident.pickupDay}</p>
                        <p>Payment Status: {resident.paymentStatus ? 'Yes' : 'No'}</p>
                        <p>Trash Collection: {resident.trashCollection ? 'Yes' : 'No'}</p>
                        <button onClick={() => handleDelete(resident.id)}>Delete Resident</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResidentList;

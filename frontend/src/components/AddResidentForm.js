// src/components/AddResidentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddResidentForm = () => {
    const [address, setAddress] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('no'); // default value
    const [trashCollection, setTrashCollection] = useState('no'); // default value
    const [pickupDay, setPickupDay] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const residentData = {
            address,
            pickupDay,
            paymentStatus,
            trashCollection,
        };

        try {
            const response = await axios.post('http://localhost:5000/create-resident', residentData);
            alert(response.data.message);
            // Reset form
            setAddress('');
            setPickupDay('');
            setPaymentStatus('no');
            setTrashCollection('no');
        } catch (error) {
            console.error(error);
            alert('Failed to add resident.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Address:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                Payment Status:
                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label>
                Trash Collection:
                <select value={trashCollection} onChange={(e) => setTrashCollection(e.target.value)}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label>
                Pickup Day:
                <input
                    type="text"
                    value={pickupDay}
                    onChange={(e) => setPickupDay(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Add Resident</button>
        </form>
    );
};

export default AddResidentForm;

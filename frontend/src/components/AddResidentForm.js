// // src/components/AddResidentForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddResidentForm = () => {
//     const [address, setAddress] = useState('');
//     const [paymentStatus, setPaymentStatus] = useState('no'); // default value
//     const [trashCollection, setTrashCollection] = useState('no'); // default value
//     const [pickupDay, setPickupDay] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const residentData = {
//             address,
//             pickupDay,
//             paymentStatus,
//             trashCollection,
//         };

//         console.log(residentData); // Check the data you're sending

//         try {
//             const response = await axios.post('http://localhost:5000/create-resident', residentData);
//             alert(response.data.message);
//             // Reset form
//             setAddress('');
//             setPickupDay('');
//             setPaymentStatus('no');
//             setTrashCollection('no');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to add resident.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Address:
//                 <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Payment Status:
//                 <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                 </select>
//             </label>
//             <label>
//                 Trash Collection:
//                 <select value={trashCollection} onChange={(e) => setTrashCollection(e.target.value)}>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                 </select>
//             </label>
//             <label>
//                 Pickup Day:
//                 <input
//                     type="text"
//                     value={pickupDay}
//                     onChange={(e) => setPickupDay(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Add Resident</button>
//         </form>
//     );
// };

// export default AddResidentForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Select, Button, FormControl, FormLabel, Box } from '@chakra-ui/react'; // Import Chakra UI components

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

        console.log(residentData); // Check the data you're sending

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
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Address:</FormLabel>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Payment Status:</FormLabel>
                    <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Select>
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Trash Collection:</FormLabel>
                    <Select value={trashCollection} onChange={(e) => setTrashCollection(e.target.value)}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Select>
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Pickup Day:</FormLabel>
                    <Select value={pickupDay} onChange={(e) => setPickupDay(e.target.value)} required>
                        <option value="" disabled>Select a day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </Select>
                </FormControl>
                <Button type="submit" colorScheme="teal">Add Resident</Button>
            </form>
        </Box>
    );
};

export default AddResidentForm;

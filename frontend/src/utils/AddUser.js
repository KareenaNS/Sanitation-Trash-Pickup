// // src/utils/addUser.js
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../FirebaseUse"; // Import the db

// const addUser = async (userData) => {
//     try {
//         // Create a document reference with a unique ID
//         const userRef = doc(db, "users", userData.id); // Use a unique identifier, like a user ID or email
//         await setDoc(userRef, userData);
//         console.log("User added successfully");
//     } catch (error) {
//         console.error("Error adding user:", error);
//     }
// };

// export default addUser;

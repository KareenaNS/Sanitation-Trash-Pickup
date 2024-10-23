// const admin = require('firebase-admin');
// const fs = require('fs');
// const csv = require('csv-parser');

// // Initialize Firebase Admin
// const serviceAccount = require('./serviceAccountKey.json'); // Use the path to your downloaded JSON file

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// // Path to the CSV file
// const csvFilePath = './residents.csv';

// // Read CSV and upload data to Firestore
// fs.createReadStream(csvFilePath)
//   .pipe(csv())
//   .on('data', async (row) => {
//     const residentID = row.id;  // Assuming 'id' is a column in your CSV
//     const residentData = {
//       address: row.address,       // 'address' column
//       paymentFulfilled: row.paymentFulfilled === 'true', // Convert to boolean
//       trashPickedUp: row.trashPickedUp === 'true'        // Convert to boolean
//     };

//     // Upload each row to Firestore
//     try {
//       await db.collection('residents').doc(residentID).set(residentData);
//       console.log(`Successfully uploaded: ${residentID}`);
//     } catch (error) {
//       console.error(`Error uploading ${residentID}: `, error);
//     }
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed and uploaded to Firestore.');
//   });

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Re-import Firestore functions
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//value id for morrowauth for client secret for azure: oEY8Q~muOSsOJ3EOOupsQ0flaHmnXKpHvj2-sb.X

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4zwM9m9dRzIzht58M-lJoyzm-ir9Lapo",
    authDomain: "sanitation-trash-pickup.firebaseapp.com",
    projectId: "sanitation-trash-pickup",
    storageBucket: "sanitation-trash-pickup.appspot.com",
    messagingSenderId: "760132400775",
    appId: "1:760132400775:web:e9c480db4c04429d5c6a22",
    measurementId: "G-6C5B38XXJX"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
export const auth = getAuth(app); 
// Initialize Firestore
export const db = getFirestore(app); // Export Firestore


export default app;

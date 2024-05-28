import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
    apiKey: "AIzaSyBP414hyHeWXCzhtQ7fFCwVcOic6giQM7s",
    authDomain: "fir-1761a.firebaseapp.com",
    projectId: "fir-1761a",
    storageBucket: "fir-1761a.appspot.com",
    messagingSenderId: "499767168361",
    appId: "1:499767168361:web:a1e10048724dae4d5f81f8"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and database only once
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const database = getFirestore(app);

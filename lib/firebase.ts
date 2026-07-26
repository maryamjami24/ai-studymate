// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD84aUBoTQW5aw6s_5t-Z_O-3BVPzDstDU",
  authDomain: "ai-studymate-e3e7e.firebaseapp.com",
  projectId: "ai-studymate-e3e7e",
  storageBucket: "ai-studymate-e3e7e.firebasestorage.app",
  messagingSenderId: "173905426234",
  appId: "1:173905426234:web:7ec94a9e56a3224e6e0203"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Authentication
export const auth = getAuth(app);


// Firestore Database
export const db = getFirestore(app);
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyA2E6HINm6B-EHx4bRqDKT9Ynj7EwMxgNM",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "test-app-meteo-15b7d.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "test-app-meteo-15b7d",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "test-app-meteo-15b7d.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "545784599842",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:545784599842:web:4cdbf4f6f5b0c46ad5d86e"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
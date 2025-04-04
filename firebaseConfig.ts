import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPf-s4e271n51X3W0fRBUZmN8G5Wjr7Wk",
  authDomain: "dash-guard.firebaseapp.com",
  projectId: "dash-guard",
  storageBucket: "dash-guard.firebasestorage.app",
  messagingSenderId: "630565028451",
  appId: "1:630565028451:web:4a2ca29bc6e4fa26d86e56",
  measurementId: "G-KGNYNM6ZV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB
export const db = getFirestore(app);

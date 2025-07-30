// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
// Note: In production, these values should be environment variables
const firebaseConfig = {
  apiKey: "AIzaSyD-demo-key-for-development-only",
  authDomain: "socialboost-demo.firebaseapp.com",
  projectId: "socialboost-demo",
  storageBucket: "socialboost-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
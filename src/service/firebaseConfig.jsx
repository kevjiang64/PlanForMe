// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjv0XY3OJfWZPW20SStYbBdAgM3-MB7YM",
  authDomain: "ai-travel-planner-backend.firebaseapp.com",
  projectId: "ai-travel-planner-backend",
  storageBucket: "ai-travel-planner-backend.firebasestorage.app",
  messagingSenderId: "288024753667",
  appId: "1:288024753667:web:a70d93a204b1e96c414036",
  measurementId: "G-8RZL8PYBMD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

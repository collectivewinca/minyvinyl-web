import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtR-kmZULXQZu3M9Zgi1LIUqKECklofOw",
  authDomain: "subway-musician-564bd.firebaseapp.com",
  projectId: "subway-musician-564bd",
  storageBucket: "subway-musician-564bd.appspot.com",
  messagingSenderId: "330451638019",
  appId: "1:330451638019:web:8625cb892d865ea631fb36",
  measurementId: "G-R8HBFT0PPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
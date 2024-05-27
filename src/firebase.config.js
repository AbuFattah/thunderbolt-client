import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBJFaha4wOCWae-rLLuogXLbkyPvKns7T8",
//   authDomain: "thunderbolt-9bce9.firebaseapp.com",
//   projectId: "thunderbolt-9bce9",
//   storageBucket: "thunderbolt-9bce9.appspot.com",
//   messagingSenderId: "298500173482",
//   appId: "1:298500173482:web:d996b2cd719d9ab5962ad3"
// };



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

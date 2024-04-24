// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "internship-b35c2.firebaseapp.com",
  projectId: "internship-b35c2",
  storageBucket: "internship-b35c2.appspot.com",
  messagingSenderId: "700628355494",
  appId: "1:700628355494:web:5ab8b8247ea8ec1bda6767"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
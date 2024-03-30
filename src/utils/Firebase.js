// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; //for pass authentication

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSQ9nJ2tEoU9ireHFv2hu4YMdbOycips4",
  authDomain: "netflixgpt-5dd4d.firebaseapp.com",
  projectId: "netflixgpt-5dd4d",
  storageBucket: "netflixgpt-5dd4d.appspot.com",
  messagingSenderId: "613799970318",
  appId: "1:613799970318:web:ca4b94b442f165ab41de5f",
  measurementId: "G-G708YHZCL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
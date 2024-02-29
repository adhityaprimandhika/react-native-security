// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwfqOsjgT8euC0WjKIphQ46k0GtNR44mQ",
  authDomain: "react-native-security.firebaseapp.com",
  projectId: "react-native-security",
  storageBucket: "react-native-security.appspot.com",
  messagingSenderId: "359269064964",
  appId: "1:359269064964:web:12dbc1c86622dcd6b2b051",
  measurementId: "G-7BN414XN8X",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

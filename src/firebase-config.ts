// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrXXn1viJBDt04YmiB5GSfHBQl5OMwySY",
  authDomain: "cylinderapp-ad7be.firebaseapp.com",
  projectId: "cylinderapp-ad7be",
  storageBucket: "cylinderapp-ad7be.appspot.com",
  messagingSenderId: "81225934140",
  appId: "1:81225934140:web:d3c39ee69247b489332a39",
  measurementId: "G-4L972K4D9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
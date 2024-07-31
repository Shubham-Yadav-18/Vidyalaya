// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy_yTQmPVkFWpAHRsvAVsibNeOw5_JxkI",
  authDomain: "vidyalaya-14f81.firebaseapp.com",
  projectId: "vidyalaya-14f81",
  storageBucket: "vidyalaya-14f81.appspot.com",
  messagingSenderId: "307516549010",
  appId: "1:307516549010:web:85315bf2abf907b91dc34b",
  measurementId: "G-6N6F91W3XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

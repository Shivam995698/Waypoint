// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3gwaz9VT91100eP07jWFZbhU71PmJUfQ",
  authDomain: "tripplanner-34194.firebaseapp.com",
  projectId: "tripplanner-34194",
  storageBucket: "tripplanner-34194.firebasestorage.app",
  messagingSenderId: "828562646494",
  appId: "1:828562646494:web:08086c2e3ea44b8c8aa94f",
  measurementId: "G-L83CQMWHKW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
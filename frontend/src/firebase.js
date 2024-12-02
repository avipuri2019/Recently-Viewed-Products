// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZ14FJm_54MCzD_w9-WwfUxtMsrDFi81E",
    authDomain: "liver-recently-viewed-products.firebaseapp.com",
    projectId: "liver-recently-viewed-products",
    storageBucket: "liver-recently-viewed-products.firebasestorage.app",
    messagingSenderId: "31461769987",
    appId: "1:31461769987:web:aefaa71c19ac0838681f36",
    measurementId: "G-7NR8KVH7RK"
  };
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
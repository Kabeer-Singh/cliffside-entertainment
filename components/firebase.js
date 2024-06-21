// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/firestore';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCsfEr39lX79IC62WWoH_blEiuYZqgDzs",
    authDomain: "cliffside-2e22d.firebaseapp.com",
    projectId: "cliffside-2e22d",
    storageBucket: "cliffside-2e22d.appspot.com",
    messagingSenderId: "822315968413",
    appId: "1:822315968413:web:62a6a3024a1e9ce9a23174",
    measurementId: "G-Y8N61MZZSV"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = getAuth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const storage = firebase.storage().ref(); 
// export default firebase;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
export const storage = getStorage(app);
export default app;

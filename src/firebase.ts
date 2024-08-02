// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDA9dHts8ZSFS0MPYFR3ZJnKGQYYkBE2tM",
    authDomain: "pantry-tracker-a6f9d.firebaseapp.com",
    projectId: "pantry-tracker-a6f9d",
    storageBucket: "pantry-tracker-a6f9d.appspot.com",
    messagingSenderId: "420474856819",
    appId: "1:420474856819:web:c90dfc146658afcc445106",
    measurementId: "G-BDCDDDSZDK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};
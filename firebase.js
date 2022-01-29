// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQYXZ3Ummz_lVxusdiSz8-vMoCfsvD69U",
  authDomain: "wastemanagementproject-ae3b2.firebaseapp.com",
  projectId: "wastemanagementproject-ae3b2",
  storageBucket: "wastemanagementproject-ae3b2.appspot.com",
  messagingSenderId: "892173865274",
  appId: "1:892173865274:web:62d7a627099fc9cd8a4003"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
/*if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}*/

const db = getFirestore(app);

export { db }
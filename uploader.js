// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 

//var admin = require("firebase-admin");

//var serviceAccount = require("./service_key.json");
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

const firestore = firebase.getFirestore(app);//firebase



import { collection, addDoc } from "firebase/firestore"; 
try {
  const docRef = await addDoc(collection(db, "recipe"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

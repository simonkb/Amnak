// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJOB4RtM35a0BLBo0J7JgbqKNejByf9Zw",
  authDomain: "amnak-uae.firebaseapp.com",
  projectId: "amnak-uae",
  storageBucket: "amnak-uae.appspot.com",
  messagingSenderId: "1035111097096",
  appId: "1:1035111097096:web:daf92e064d9af09b3482bd",
  measurementId: "G-40DXYNHRKE",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, db, storage };

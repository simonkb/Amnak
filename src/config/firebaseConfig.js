// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
// const firestoreSettings = {
//   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED, // or any other size in bytes
// };

// const firestore = firebase.firestore(app);
// firestore.settings(firestoreSettings);
const db = getFirestore(app);
const auth = getAuth(app);
//const auth = initializeAuth(app);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// const firestoreDb = initializeFirestore(app, {
//   cacheSizeBytes: CACHE_SIZE_UNLIMITED,
// });

export { auth, db };

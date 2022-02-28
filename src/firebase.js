// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCz3MjzK6gIYR2lPj3T3tlH9RAkoSDJ9mk",
  authDomain: "a2zone.firebaseapp.com",
  projectId: "a2zone",
  storageBucket: "a2zone.appspot.com",
  messagingSenderId: "437207298997",
  appId: "1:437207298997:web:a76a83c5d45494e0fb1ffc",
  measurementId: "G-S5DBR39BZT",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };

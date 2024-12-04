// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuhlpjruJT4p0KFUT2wqNyiwLihg9iAAk",
  authDomain: "taskhub-aa53b.firebaseapp.com",
  projectId: "taskhub-aa53b",
  storageBucket: "taskhub-aa53b.firebasestorage.app",
  messagingSenderId: "782807375531",
  appId: "1:782807375531:web:18976ed8342ada1ee5a1ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app, auth}
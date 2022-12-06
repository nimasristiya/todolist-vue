// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5zCZJ0qXXg7gx6ZNQQVwj_jqWNGTnpgo",
  authDomain: "todo-vue-8994a.firebaseapp.com",
  projectId: "todo-vue-8994a",
  storageBucket: "todo-vue-8994a.appspot.com",
  messagingSenderId: "1092314485894",
  appId: "1:1092314485894:web:9429559678cea85c63ad07",
  measurementId: "G-4TMPQSBCHR"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
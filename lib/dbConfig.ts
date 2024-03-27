// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeVaj1zjy7GPvYWgGkWTskezIeS0LWwF4",
  authDomain: "pedalix-6cdf9.firebaseapp.com",
  databaseURL: "https://pedalix-6cdf9-default-rtdb.firebaseio.com",
  projectId: "pedalix-6cdf9",
  storageBucket: "pedalix-6cdf9.appspot.com",
  messagingSenderId: "535766920813",
  appId: "1:535766920813:web:71f11cdbb15226042a1964",
  measurementId: "G-H6TFB42EBX",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

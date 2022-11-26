// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4gaovDG4PzwZJ4xyGHMRRkpiS1hVKack",
  authDomain: "pass-the-aux-c07c9.firebaseapp.com",
  projectId: "pass-the-aux-c07c9",
  storageBucket: "pass-the-aux-c07c9.appspot.com",
  messagingSenderId: "606764095057",
  appId: "1:606764095057:web:5a29121176db101b6e4a70",
  measurementId: "G-PBWB92PH2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);



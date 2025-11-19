// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtb8HOvgyu_mR3xjCursEYZBB1r8Zzr_c",
  authDomain: "music-plyer-6ecae.firebaseapp.com",
  projectId: "music-plyer-6ecae",
  storageBucket: "music-plyer-6ecae.firebasestorage.app",
  messagingSenderId: "43582310896",
  appId: "1:43582310896:web:b9ad548de67dd3e5bdb535",
  measurementId: "G-XX00QMN7D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
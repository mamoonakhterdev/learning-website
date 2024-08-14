// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence, EmailAuthProvider } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, reauthenticateWithCredential } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRou-zTyeOoQbnktSwNY1f33EsdxXHCZ4",
  authDomain: "react-app-d461c.firebaseapp.com",
  databaseURL: "https://react-app-d461c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-app-d461c",
  storageBucket: "react-app-d461c.appspot.com",
  messagingSenderId: "218025925322",
  appId: "1:218025925322:web:913f269bd438faa0de7233",
  measurementId: "G-E4NHFLN39R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,database, ref, get, analytics, EmailAuthProvider, reauthenticateWithCredential, storage };

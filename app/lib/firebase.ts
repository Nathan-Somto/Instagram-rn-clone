import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBA1JnlpNYmoafASQrqjvkuPJoYUwnkYV0",
  authDomain: "rn-instagram-clone-1f652.firebaseapp.com",
  projectId: "rn-instagram-clone-1f652",
  storageBucket: "rn-instagram-clone-1f652.appspot.com",
  messagingSenderId: "729435310456",
  appId: "1:729435310456:web:cc98e19e5ead91d8b8208d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth,db,storage};
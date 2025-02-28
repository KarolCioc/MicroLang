import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD90bWac3Qvc9B2RMf8s3B5c9qAoRWDU_A",
  authDomain: "microlang-2475a.firebaseapp.com",
  projectId: "microlang-2475a",
  storageBucket: "microlang-2475a.firebasestorage.app",
  messagingSenderId: "43248885389",
  appId: "1:43248885389:web:f6643960c1554054c50cc4",
  measurementId: "G-HRWPY6QTH9"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
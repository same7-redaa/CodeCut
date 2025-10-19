import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUUoSMV__PYl3itPpwNBoskQ8pPPA4GMc",
  authDomain: "code-cut.firebaseapp.com",
  projectId: "code-cut",
  storageBucket: "code-cut.firebasestorage.app",
  messagingSenderId: "212859221999",
  appId: "1:212859221999:web:21f521078a958fed05681a",
  measurementId: "G-1J0B0MKGL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

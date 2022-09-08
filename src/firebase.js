import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsw-GX9DBZA8vqtSiD-zAw6niSOL7wjTc",
  authDomain: "rentalcarskripsi.firebaseapp.com",
  projectId: "rentalcarskripsi",
  storageBucket: "rentalcarskripsi.appspot.com",
  messagingSenderId: "219299516748",
  appId: "1:219299516748:web:177b3604fb55522a84bfe9",
  measurementId: "G-XGMYZ6MWKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

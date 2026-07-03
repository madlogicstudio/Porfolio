import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_0h4UjT7-2VZ_X869tlvLUFmDJpjRm-Q",
  authDomain: "portfolio-7b08e.firebaseapp.com",
  projectId: "portfolio-7b08e",
  storageBucket: "portfolio-7b08e.firebasestorage.app",
  messagingSenderId: "748594685993",
  appId: "1:748594685993:web:79b5e5d12b4a24ed451438",
  measurementId: "G-5PQLPGNSZ9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0LS_zJVxtcmIyP7aqtRMweLyuTDakAmU",
  authDomain: "orbit-bbbfe.firebaseapp.com",
  projectId: "orbit-bbbfe",
  storageBucket: "orbit-bbbfe.appspot.com",
  messagingSenderId: "326204990671",
  appId: "1:326204990671:web:011e7bffeeb73bbc0543ba",
  measurementId: "G-KGY9MPJ93B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

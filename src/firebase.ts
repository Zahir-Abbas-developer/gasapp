import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgV-kAPkgU6OCfKPfVIY-N0ErSOanvntc",
  authDomain: "gasapp-7a75c.firebaseapp.com",
  projectId: "gasapp-7a75c",
  storageBucket: "gasapp-7a75c.appspot.com",
  messagingSenderId: "827628554594",
  appId: "1:827628554594:web:35e9eb4454018f59a3c43b",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

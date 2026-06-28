import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhWv-2MHAPUvjQxyrP7YcRYS_905X8bio",
  authDomain: "confirmseat-a504a.firebaseapp.com",
  projectId: "confirmseat-a504a",
  storageBucket: "confirmseat-a504a.firebasestorage.app",
  messagingSenderId: "737294118030",
  appId: "1:737294118030:web:2c6752ec0fda8791a46ddf",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
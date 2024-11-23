import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9k6pomKQumiNlVIeftFgxP1yMsVuTzJk",
  authDomain: "digitalcanvas-79a44.firebaseapp.com",
  projectId: "digitalcanvas-79a44",
  storageBucket: "digitalcanvas-79a44.appspot.com",
  messagingSenderId: "993846284515",
  appId: "1:993846284515:web:1afb0256453a631c0f75d6",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

export default firebase_app;

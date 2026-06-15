import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA03-F-HszMq8-3QFBJOrGTlH07-ZodhnY",
  authDomain: "zeox-bypass.firebaseapp.com",
  databaseURL: "https://zeox-bypass-default-rtdb.firebaseio.com",
  projectId: "zeox-bypass",
  storageBucket: "zeox-bypass.firebasestorage.app",
  messagingSenderId: "195932616555",
  appId: "1:195932616555:web:2666d07c18d286ae54be2e",
  measurementId: "G-58T1YE6B01",
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signInEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export { onAuthStateChanged, type User };

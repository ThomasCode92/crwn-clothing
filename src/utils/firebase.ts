import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

import firebaseApp from "../config/firebase";

const FIREBASE_AUTH_EMULATOR = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore();

if (FIREBASE_AUTH_EMULATOR) {
  console.warn(`Using Firebase Auth Emulator on ${FIREBASE_AUTH_EMULATOR}...`);
  connectAuthEmulator(auth, "http://" + FIREBASE_AUTH_EMULATOR);
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export async function createUserDocumentFromAuth(userAuth: User) {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userDocRef);
  console.log(userSnap.exists());
}

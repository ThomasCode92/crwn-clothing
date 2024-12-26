import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import firebaseApp from "@/config/firebase";

const FIREBASE_AUTH_EMULATOR = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;

const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore();

if (FIREBASE_AUTH_EMULATOR) {
  console.warn(`Using Firebase Auth Emulator on ${FIREBASE_AUTH_EMULATOR}...`);
  connectAuthEmulator(auth, "http://" + FIREBASE_AUTH_EMULATOR);
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleAuthProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleAuthProvider);

export async function createUserDocumentFromAuth(
  userAuth: User,
  additionalData?: object,
) {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return userDocRef;
}

export async function createAuthUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  return signInWithEmailAndPassword(auth, email, password);
}

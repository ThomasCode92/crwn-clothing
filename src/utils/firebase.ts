import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import firebaseApp from "../config/firebase";

const FIREBASE_AUTH_EMULATOR = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);

if (FIREBASE_AUTH_EMULATOR) {
  console.warn(`Using Firebase Auth Emulator on ${FIREBASE_AUTH_EMULATOR}...`);
  connectAuthEmulator(auth, "http://" + FIREBASE_AUTH_EMULATOR);
}

export const signInWithGoogle = () => signInWithPopup(auth, provider);

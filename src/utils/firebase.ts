import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import firebaseApp from "../config/firebase";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGoogle = () => signInWithPopup(auth, provider);

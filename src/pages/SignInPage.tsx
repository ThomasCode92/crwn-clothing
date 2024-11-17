import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import SignUpForm from "../components/authentication/SignUpForm";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../utils/firebase";

export default function SignInPage() {
  useEffect(() => {
    async function handleRedirectResult() {
      const result = await getRedirectResult(auth);
      if (result) {
        const userDocRef = await createUserDocumentFromAuth(result.user);
        console.log(userDocRef);
      }
    }

    handleRedirectResult();
  }, []);

  async function handleLoginWithGooglePopup() {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
    console.log(userDocRef);
  }

  async function handleRedirectWithGoogle() {
    await signInWithGoogleRedirect();
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={handleLoginWithGooglePopup}>
        Sign in with Google Popup
      </button>
      <button onClick={handleRedirectWithGoogle}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
}

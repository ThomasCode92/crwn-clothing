import {
  createUserDocumentFromAuth,
  signInWithGoogle,
} from "../utils/firebase";

export default function SignInPage() {
  const handleLoginWithGoogle = async () => {
    const response = await signInWithGoogle();
    createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={handleLoginWithGoogle}>Sign in with Google</button>
    </div>
  );
}

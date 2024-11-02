import { signInWithGoogle } from "../utils/firebase";

export default function SignInPage() {
  const handleLoginWithGoogle = async () => {
    const response = await signInWithGoogle();
    console.log(response);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={handleLoginWithGoogle}>Sign in with Google</button>
    </div>
  );
}

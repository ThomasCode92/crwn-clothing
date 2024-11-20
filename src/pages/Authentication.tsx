import SignInForm from "../components/authentication/SignInForm";
import SignUpForm from "../components/authentication/SignUpForm";

export default function AuthenticationPage() {
  return (
    <div className="mt-8 flex justify-around">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

import { Fragment } from "react";

import SignInForm from "../components/authentication/SignInForm";
import SignUpForm from "../components/authentication/SignUpForm";

export default function AuthenticationPage() {
  return (
    <Fragment>
      <h1>Sign In Page</h1>
      <div className="flex justify-around">
        <SignInForm />
        <SignUpForm />
      </div>
    </Fragment>
  );
}

import { getRedirectResult } from "firebase/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Button from "../UI/Button";
import FormInput from "../UI/FormInput";

import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase";

const INITIAL_FORM_FIELDS = {
  email: "",
  password: "",
};

interface SignInFormProps {
  useRedirect?: boolean;
}

export default function SignInForm({ useRedirect = false }: SignInFormProps) {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);

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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function handleLoginWithGooglePopup() {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
    console.log(userDocRef);
  }

  async function handleRedirectWithGoogle() {
    await signInWithGoogleRedirect();
  }

  return (
    <section className="flex w-96 flex-col">
      <span>Already have an account?</span>
      <h3 className="my-2.5">Sign in with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formFields.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formFields.password}
          onChange={handleChange}
          required
        />
        <div className="flex justify-between">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google-sign-in"
            onClick={handleLoginWithGooglePopup}
          >
            Google Sign In
          </Button>
          {useRedirect && (
            <Button type="button" onClick={handleRedirectWithGoogle}>
              Google Sign In
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

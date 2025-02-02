import { AuthError } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "@/utils/firebase";

const INITIAL_FORM_FIELDS = {
  email: "",
  password: "",
};

interface SignInFormProps {
  useRedirect?: boolean;
}

export default function SignInForm({ useRedirect = false }: SignInFormProps) {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password,
      );
    } catch (error) {
      if (
        (error as AuthError).code === "auth/wrong-password" ||
        (error as AuthError).code === "auth/user-not-found"
      ) {
        return alert("Wrong email or password");
      }
      console.error("Error signing in", error);
    }
  }

  async function handleLoginWithGooglePopup() {
    await signInWithGooglePopup();
  }

  async function handleRedirectWithGoogle() {
    await signInWithGoogleRedirect();
  }

  const handleGoogleSignin = !useRedirect
    ? handleLoginWithGooglePopup
    : handleRedirectWithGoogle;

  return (
    <section className="flex w-96 flex-col">
      <span className="italic text-gray-600">Already have an account?</span>
      <h3 className="my-2.5 text-xl font-bold">
        Sign in with your email and password
      </h3>
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
            onClick={handleGoogleSignin}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </section>
  );
}

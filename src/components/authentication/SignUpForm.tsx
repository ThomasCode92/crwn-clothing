import { AuthError } from "firebase/auth";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import { UserContext } from "@/contexts/userContext";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "@/utils/firebase";

const INITIAL_FORM_FIELDS = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { setCurrentUser } = useContext(UserContext);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formFields.password !== formFields.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const userCredentials = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password,
      );

      await createUserDocumentFromAuth(userCredentials.user, {
        displayName: formFields.displayName,
      });

      setFormFields(INITIAL_FORM_FIELDS);
      setCurrentUser(userCredentials.user);
    } catch (error) {
      if ((error as AuthError).code === "auth/email-already-in-use") {
        return alert("Cannot create user, email already in use!");
      }

      console.error("Error signing up", error);
    }
  }

  return (
    <section className="flex w-96 flex-col">
      <span className="italic text-gray-600">Don't have an account</span>
      <h3 className="my-2.5 text-xl font-bold">
        Sign up with your email and password
      </h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          value={formFields.displayName}
          onChange={handleChange}
          required
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formFields.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </section>
  );
}

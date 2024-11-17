import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase";

const INITIAL_FORM_FIELDS = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
  }

  return (
    <Fragment>
      <h3>Sign up with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Display Name</label>
        <input
          name="displayName"
          value={formFields.displayName}
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          name="email"
          value={formFields.email}
          type="email"
          required
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          name="password"
          value={formFields.password}
          type="password"
          required
          onChange={handleChange}
        />
        <label htmlFor="">Confirm Password</label>
        <input
          name="confirmPassword"
          value={formFields.confirmPassword}
          type="password"
          required
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </Fragment>
  );
}

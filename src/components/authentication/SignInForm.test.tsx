import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from "./SignInForm";

const mockedMethods = vi.hoisted(function () {
  return {
    signInAuthUserFn: vi.fn(),
  };
});

vi.mock("../../utils/firebase", function () {
  return {
    signInAuthUserWithEmailAndPassword: mockedMethods.signInAuthUserFn,
  };
});

vi.spyOn(window, "alert").mockImplementation(() => {});

test("should render the correct titles", function () {
  render(<SignInForm />);

  expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
});

test("should render the correct form fields", function () {
  render(<SignInForm />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("should render the correct buttons", function () {
  render(<SignInForm />);

  expect(
    screen.getByRole("button", { name: /^sign in$/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /google sign in/i }),
  ).toBeInTheDocument();
});

test("should submit the form with the correct data", async function () {
  render(<SignInForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /^sign in$/i });

  const user = userEvent.setup();

  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.click(submitButton);

  expect(mockedMethods.signInAuthUserFn).toHaveBeenCalledWith(
    "john.doe@test.com",
    "password",
  );
});

test("should show an alert if the password is incorrect", async function () {
  mockedMethods.signInAuthUserFn.mockRejectedValue({
    code: "auth/wrong-password",
  });

  render(<SignInForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /^sign in$/i });

  const user = userEvent.setup();

  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith("Wrong email or password");
});

test("should show an alert if the user is not found", async function () {
  mockedMethods.signInAuthUserFn.mockRejectedValue({
    code: "auth/user-not-found",
  });

  render(<SignInForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /^sign in$/i });

  const user = userEvent.setup();

  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith("Wrong email or password");
});

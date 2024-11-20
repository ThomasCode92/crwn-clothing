import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./SignUpForm";

const mockedMethods = vi.hoisted(function () {
  return {
    createAuthUserFn: vi.fn(),
    createUserDocumentFn: vi.fn(),
  };
});

vi.mock("../../utils/firebase", function () {
  return {
    createAuthUserWithEmailAndPassword: mockedMethods.createAuthUserFn,
    createUserDocumentFromAuth: mockedMethods.createUserDocumentFn,
  };
});

mockedMethods.createAuthUserFn.mockResolvedValue({
  user: { uid: "123" },
});

vi.spyOn(window, "alert").mockImplementation(() => {});

beforeEach(function () {
  vi.clearAllMocks();
});

test("should render the correct titles", function () {
  render(<SignUpForm />);

  expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
  expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
});

test("should render the correct form fields", function () {
  render(<SignUpForm />);

  expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument();
});

test("should render the correct buttons", function () {
  render(<SignUpForm />);

  expect(
    screen.getByRole("button", { name: /^sign up$/i }),
  ).toBeInTheDocument();
});

test("should submit the form with the correct data", async function () {
  render(<SignUpForm />);

  const displayNameInput = screen.getByLabelText(/display name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/^password/i);
  const confirmPasswordInput = screen.getByLabelText(/^confirm password/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  const user = userEvent.setup();

  await user.type(displayNameInput, "John Doe");
  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.type(confirmPasswordInput, "password");
  await user.click(submitButton);

  expect(mockedMethods.createAuthUserFn).toHaveBeenCalledWith(
    "john.doe@test.com",
    "password",
  );

  expect(mockedMethods.createUserDocumentFn).toHaveBeenCalledWith(
    { uid: "123" },
    { displayName: "John Doe" },
  );
});

test("should show an alert if passwords do not match", async function () {
  render(<SignUpForm />);

  const displayNameInput = screen.getByLabelText(/display name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/^password/i);
  const confirmPasswordInput = screen.getByLabelText(/^confirm password/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  const user = userEvent.setup();

  await user.type(displayNameInput, "John Doe");
  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.type(confirmPasswordInput, "passphrase");
  await user.click(submitButton);

  expect(mockedMethods.createAuthUserFn).not.toHaveBeenCalled();
  expect(window.alert).toHaveBeenCalledWith("Passwords do not match");
});

test("should show an alert if email is already in use", async function () {
  mockedMethods.createAuthUserFn.mockRejectedValue({
    code: "auth/email-already-in-use",
  });

  render(<SignUpForm />);

  const displayNameInput = screen.getByLabelText(/display name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/^password/i);
  const confirmPasswordInput = screen.getByLabelText(/^confirm password/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  const user = userEvent.setup();

  await user.type(displayNameInput, "John Doe");
  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.type(confirmPasswordInput, "password");
  await user.click(submitButton);

  expect(mockedMethods.createUserDocumentFn).not.toHaveBeenCalled();
  expect(window.alert).toHaveBeenCalledWith(
    "Cannot create user, email already in use!",
  );
});

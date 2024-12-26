import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from "./SignInForm";

const mocks = vi.hoisted(function () {
  const userCredentials = { id: "123" };
  return {
    userCredentials,
    getRedirectResultFn: vi.fn().mockResolvedValue({ userCredentials }),
    signInAuthUserFn: vi.fn(),
    signInWithGooglePopupFn: vi.fn().mockResolvedValue({ userCredentials }),
    createUserDocumentFromAuthFn: vi.fn(),
    signInWithGoogleRedirectFn: vi.fn(),
  };
});

vi.mock("firebase/auth", async function () {
  return { getRedirectResult: mocks.getRedirectResultFn };
});

vi.mock("@/utils/firebase", async function () {
  return {
    auth: {},
    createUserDocumentFromAuth: mocks.createUserDocumentFromAuthFn,
    signInAuthUserWithEmailAndPassword: mocks.signInAuthUserFn,
    signInWithGooglePopup: mocks.signInWithGooglePopupFn,
    signInWithGoogleRedirect: mocks.signInWithGoogleRedirectFn,
  };
});

vi.spyOn(window, "alert").mockImplementation(() => {});

beforeEach(() => {
  vi.clearAllMocks();
});

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

  expect(mocks.signInAuthUserFn).toHaveBeenCalledWith(
    "john.doe@test.com",
    "password",
  );
});

test("should show an alert if the password is incorrect", async function () {
  mocks.signInAuthUserFn.mockRejectedValue({
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
  mocks.signInAuthUserFn.mockRejectedValue({
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

test("should log an error if signing in fails", async function () {
  const consoleSpy = vi.spyOn(console, "error");
  mocks.signInAuthUserFn.mockRejectedValue(new Error("Failed to sign in"));

  render(<SignInForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /^sign in$/i });

  const user = userEvent.setup();

  await user.type(emailInput, "john.doe@test.com");
  await user.type(passwordInput, "password");
  await user.click(submitButton);

  expect(consoleSpy).toHaveBeenCalledWith(
    "Error signing in",
    expect.any(Error),
  );
});

test("should sign in with Google using popup successfully", async function () {
  render(<SignInForm />);

  await userEvent.click(
    screen.getByRole("button", {
      name: /google sign in/i,
    }),
  );

  expect(mocks.signInAuthUserFn).not.toHaveBeenCalled();
  expect(mocks.signInWithGooglePopupFn).toHaveBeenCalled();
  expect(mocks.createUserDocumentFromAuthFn).not.toHaveBeenCalledWith(
    mocks.userCredentials,
  );
});

test("should sign in with Google redirect successfully", async function () {
  render(<SignInForm useRedirect />);

  await userEvent.click(
    screen.getByRole("button", {
      name: /google sign in/i,
    }),
  );

  expect(mocks.signInAuthUserFn).not.toHaveBeenCalled();
  expect(mocks.signInWithGoogleRedirectFn).toHaveBeenCalled();
  expect(mocks.createUserDocumentFromAuthFn).not.toHaveBeenCalledWith(
    mocks.userCredentials,
  );
});

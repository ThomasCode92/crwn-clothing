import { render, screen } from "@testing-library/react";

import AuthenticationPage from "./AuthenticationPage";

test("should render the sign in form", function () {
  render(<AuthenticationPage />);
  expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
});

test("should render the sign up form", function () {
  render(<AuthenticationPage />);
  expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
});

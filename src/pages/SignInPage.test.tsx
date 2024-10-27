import { render, screen } from "@testing-library/react";

import SignInPage from "./SignInPage";

test("should render the page title", function () {
  render(<SignInPage />);
  const pageTitleElement = screen.getByText(/sign in/i);
  expect(pageTitleElement).toBeInTheDocument();
});

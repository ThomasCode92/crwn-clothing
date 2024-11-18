import { render, screen } from "@testing-library/react";

import AuthenticationPage from "./Authentication";

test("should render the page title", function () {
  render(<AuthenticationPage />);
  const pageTitleElement = screen.getByText(/sign in page/i);
  expect(pageTitleElement).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavigationBar from "./NavigationBar";

test("should render a logo", function () {
  render(<NavigationBar />, { wrapper: MemoryRouter });
  const logoElement = screen.getByTestId("crown-logo");
  expect(logoElement).toBeInTheDocument();
});

test("should have a link to the shop page", function () {
  render(<NavigationBar />, { wrapper: MemoryRouter });
  const shopLinkElement = screen.getByText(/shop/i);
  expect(shopLinkElement).toHaveAttribute("href", "/shop");
});

test("should have a link to the sign in page", function () {
  render(<NavigationBar />, { wrapper: MemoryRouter });
  const signInLinkElement = screen.getByText(/sign in/i);
  expect(signInLinkElement).toHaveAttribute("href", "/signin");
});

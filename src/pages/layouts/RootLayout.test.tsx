import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RootLayout from "./RootLayout";

test("should render the navigation bar", function () {
  render(<RootLayout />, { wrapper: MemoryRouter });
  const navigationBarElement = screen.getByRole("navigation");
  expect(navigationBarElement).toBeInTheDocument();
});

test("should render the main content area", function () {
  render(<RootLayout />, { wrapper: MemoryRouter });
  const mainContentElement = screen.getByRole("main");
  expect(mainContentElement).toBeInTheDocument();
});

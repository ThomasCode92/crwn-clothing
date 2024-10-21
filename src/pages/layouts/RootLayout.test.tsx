import { render, screen } from "@testing-library/react";
import RootLayout from "./RootLayout";

test("should render the router outlet inside the main content area", function () {
  render(<RootLayout />);
  const mainContentElement = screen.getByTestId("main-content");
  expect(mainContentElement).toBeInTheDocument();
});

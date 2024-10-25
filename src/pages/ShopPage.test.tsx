import { render, screen } from "@testing-library/react";

import ShopPage from "./ShopPage";

test("should render the page title", function () {
  render(<ShopPage />);
  const pageTitleElement = screen.getByText(/shop page/i);
  expect(pageTitleElement).toBeInTheDocument();
});

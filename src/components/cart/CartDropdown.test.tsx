import { render, screen } from "@testing-library/react";

import CartDropdown from "./CartDropdown";

function setup() {
  render(<CartDropdown />);
}

test("should render a checkout button", function () {
  setup();
  const checkoutButtonElement = screen.getByText(/checkout/i);
  expect(checkoutButtonElement).toBeInTheDocument();
});

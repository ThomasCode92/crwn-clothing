import { render, screen } from "@testing-library/react";

import { CartContext, ICartContext } from "@/contexts/cartContext";

import CheckoutPage from "./CheckoutPage";

const ctxValue = {
  setIsOpen: vi.fn(),
  cartItems: [],
} as unknown as ICartContext;

function setup() {
  render(
    <CartContext.Provider value={ctxValue}>
      <CheckoutPage />
    </CartContext.Provider>,
  );
}

afterEach(() => vi.resetAllMocks());

test("should render the page title", function () {
  setup();
  const headingEl = screen.getByRole("heading", { name: /checkout/i });
  expect(headingEl).toBeInTheDocument();
});
test("should close the cart when the page is loaded", function () {
  setup();
  expect(ctxValue.setIsOpen).toHaveBeenCalledOnce();
  expect(ctxValue.setIsOpen).toHaveBeenCalledWith(false);
});

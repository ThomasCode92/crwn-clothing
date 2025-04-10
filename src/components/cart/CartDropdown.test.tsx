import { render, screen } from "@testing-library/react";

import CartDropdown from "@/components/cart/CartDropdown";
import * as CartItem from "@/components/cart/CartItem";
import { CartContext, ICartContext } from "@/contexts/cartContext";

function createCartItem(_: unknown, id: number) {
  return { id, name: `Item ${id + 1}` };
}

// create a random number of cart items
const randomNumber = Math.floor(Math.random() * 5) + 1;
const cartItems = Array.from({ length: randomNumber }, createCartItem);

const cartItem = vi.spyOn(CartItem, "default");

function setup() {
  const ctxValue = { cartItems } as ICartContext;
  render(
    <CartContext.Provider value={ctxValue}>
      <CartDropdown />
    </CartContext.Provider>,
  );
}

afterEach(() => {
  vi.clearAllMocks();
});

test("should display a cart item for each item in the cart", function () {
  setup();
  expect(cartItem).toHaveBeenCalledTimes(cartItems.length);
});

test("should render a checkout button", function () {
  setup();
  const checkoutButtonElement = screen.getByText(/checkout/i);
  expect(checkoutButtonElement).toBeInTheDocument();
});

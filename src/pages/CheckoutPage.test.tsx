import { render, screen } from "@testing-library/react";

import { CartContext, ICartContext } from "@/contexts/cartContext";
import * as CheckoutItem from "@/components/checkout/CheckoutItem";

import CheckoutPage from "./CheckoutPage";
import { ICartItem } from "@/models/CartItem";

const checkoutItem = vi.spyOn(CheckoutItem, "default");

const numCartItems = Math.floor(Math.random() * 10) + 1;
const cartItems = Array.from(
  { length: numCartItems },
  (_, i): ICartItem => ({
    id: i,
    name: "product " + i,
    quantity: i,
    imageUrl: "/image/" + i,
    price: i,
  }),
);

const ctxValue = {
  setIsOpen: vi.fn(),
  cartItems,
} as unknown as ICartContext;

function setup() {
  render(
    <CartContext.Provider value={ctxValue}>
      <CheckoutPage />
    </CartContext.Provider>,
  );
}

afterEach(() => vi.resetAllMocks());

test("should close the cart when the page is loaded", function () {
  setup();
  expect(ctxValue.setIsOpen).toHaveBeenCalledOnce();
  expect(ctxValue.setIsOpen).toHaveBeenCalledWith(false);
});

test.each(["product", "description", "quantity", "price", "remove"])(
  "should render the table header %s correctly",
  function (header) {
    setup();
    const headerElement = screen.getByRole("heading", { name: header });
    expect(headerElement).toBeInTheDocument();
  },
);

test("should render the checkout items correctly", function () {
  setup();
  expect(checkoutItem).toHaveBeenCalledTimes(numCartItems);
});

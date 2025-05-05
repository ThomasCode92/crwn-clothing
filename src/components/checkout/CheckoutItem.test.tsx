import { render, screen, within } from "@testing-library/react";

import { ICartItem } from "@/models/CartItem";

import CheckoutItem from "./CheckoutItem";
import { CartContext, ICartContext } from "@/contexts/cartContext";
import userEvent from "@testing-library/user-event";

const cartItem: ICartItem = {
  id: 123,
  name: "Wolf Cap",
  price: 14,
  imageUrl: "/images/wolf-cap.jpg",
  quantity: 3,
};

const cartCtxValue = {
  addItemToCart: vi.fn(),
  removeItemFromCart: vi.fn(),
} as unknown as ICartContext;

function setup() {
  render(
    <CartContext.Provider value={cartCtxValue}>
      <CheckoutItem {...cartItem} />
    </CartContext.Provider>,
  );
  return userEvent.setup();
}

test("should render the correct checkout information", function () {
  setup();
  const checkoutItem = screen.getByRole("listitem");
  const checkoutItemImage = within(checkoutItem).getByRole("img");
  const checkoutItemName = within(checkoutItem).getByRole("heading", {
    name: cartItem.name,
  });
  const checkoutItemQuantity = within(checkoutItem).getByText(
    cartItem.quantity,
  );
  const checkoutItemPrice = within(checkoutItem).getByText(
    `$${cartItem.price}`,
  );
  expect(checkoutItemImage).toBeInTheDocument();
  expect(checkoutItemImage).toHaveAttribute("src", cartItem.imageUrl);
  expect(checkoutItemName).toBeInTheDocument();
  expect(checkoutItemQuantity).toBeInTheDocument();
  expect(checkoutItemPrice).toBeInTheDocument();
});

test("should decrement the quantity when the decrement button is clicked", async function () {
  const { click } = setup();
  const decrementButton = screen.getByRole("button", { name: "❮" });
  await click(decrementButton);
  expect(cartCtxValue.removeItemFromCart).toHaveBeenCalledOnce();
  expect(cartCtxValue.removeItemFromCart).toHaveBeenCalledWith(cartItem);
});

test("should increment the quantity when the increment button is clicked", async function () {
  const { click } = setup();
  const incrementButton = screen.getByRole("button", { name: "❯" });
  await click(incrementButton);
  expect(cartCtxValue.addItemToCart).toHaveBeenCalledOnce();
  expect(cartCtxValue.addItemToCart).toHaveBeenCalledWith(cartItem);
});

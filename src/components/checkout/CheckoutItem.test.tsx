import { render, screen, within } from "@testing-library/react";

import { ICartItem } from "@/models/CartItem";

import CheckoutItem from "./CheckoutItem";

const cartItem: ICartItem = {
  id: 123,
  name: "Wolf Cap",
  price: 14,
  imageUrl: "/images/wolf-cap.jpg",
  quantity: 3,
};

function setup() {
  render(<CheckoutItem {...cartItem} />);
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
  expect(checkoutItemImage).toBeInTheDocument();
  expect(checkoutItemImage).toHaveAttribute("src", cartItem.imageUrl);
  expect(checkoutItemName).toBeInTheDocument();
  expect(checkoutItemQuantity).toBeInTheDocument();
});

import { screen, render } from "@testing-library/react";
import CartItem, { CartItemProps } from "./CartItem";

function setup(props?: Partial<CartItemProps>) {
  render(
    <CartItem
      name="some cart item"
      quantity={3}
      price={20}
      imageUrl="/cart-item.png"
      {...props}
    />,
  );
}

test("should render the cart item information", () => {
  setup();
  expect(screen.getByText("some cart item")).toBeInTheDocument();
  expect(screen.getByText("3 x $20")).toBeInTheDocument();
});

test("should render the cart item image", () => {
  setup();
  expect(screen.getByRole("img")).toHaveAttribute("src", "/cart-item.png");
});

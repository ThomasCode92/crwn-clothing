import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartContext, ICartContext } from "@/contexts/cartContext";

import CartIcon from "./CartIcon";

function setup(ctx?: Partial<ICartContext>) {
  const value = { isOpen: false, setIsOpen: vi.fn(), ...ctx };
  render(
    <CartContext.Provider value={value}>
      <CartIcon />
    </CartContext.Provider>,
  );
  return userEvent.setup();
}

test("should render a button with a shopping icon", function () {
  setup();
  const btnElement = screen.getByRole("button");
  const iconElement = within(btnElement).getByTestId("shopping-icon");
  expect(btnElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
});

test("should render the total quantity of items in the cart", function () {
  setup();
  const btnElement = screen.getByRole("button");
  const quantityElement = within(btnElement).getByText("0");
  expect(quantityElement).toBeInTheDocument();
});

test("should call setIsOpen when the button is clicked", async function () {
  const setIsOpen = vi.fn();
  const { click } = setup({ setIsOpen });
  const btnElement = screen.getByRole("button");
  await click(btnElement);
  expect(setIsOpen).toHaveBeenCalledOnce();
});

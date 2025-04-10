import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import CartContextProvider, { CartContext } from "./cartContext";
import { IProduct } from "@/models/Product";

function setup({ children }: { children: React.ReactNode }) {
  render(<CartContextProvider>{children}</CartContextProvider>);
  return userEvent.setup();
}

test("should render children correctly", function () {
  const TestComponent = () => {
    return <div data-testid="test-child">Test Child</div>;
  };
  setup({ children: <TestComponent /> });

  expect(screen.getByTestId("test-child")).toBeInTheDocument();
  expect(screen.getByText("Test Child")).toBeInTheDocument();
});

test("should provide the expected context value, with default values", function () {
  let contextValue: unknown = null;
  const TestComponent = () => {
    contextValue = useContext(CartContext);
    return null;
  };
  setup({ children: <TestComponent /> });

  expect(contextValue).toEqual({
    isOpen: false,
    setIsOpen: expect.any(Function),
    cartItems: [],
    addItemToCart: expect.any(Function),
  });
});

test("should update isOpen value when setIsOpen is called", async function () {
  const TestComponent = () => {
    const { isOpen, setIsOpen } = useContext(CartContext);
    return (
      <>
        <div data-testid="isOpen-value">{isOpen.toString()}</div>
        <button onClick={() => setIsOpen(true)} data-testid="open-button">
          Open Cart
        </button>
        <button onClick={() => setIsOpen(false)} data-testid="close-button">
          Close Cart
        </button>
      </>
    );
  };
  const { click } = setup({ children: <TestComponent /> });

  // initial state
  expect(screen.getByTestId("isOpen-value")).toHaveTextContent("false");

  // open cart
  await click(screen.getByTestId("open-button"));
  expect(screen.getByTestId("isOpen-value")).toHaveTextContent("true");

  // close cart
  await click(screen.getByTestId("close-button"));
  expect(screen.getByTestId("isOpen-value")).toHaveTextContent("false");
});

test("should add item to cart when addItemToCart is called", async function () {
  const TestComponent = () => {
    const { cartItems, addItemToCart } = useContext(CartContext);
    function handleClick() {
      addItemToCart({ id: 1, name: "Test Product" } as IProduct);
    }
    return (
      <>
        <div data-testid="cart-items-count">{cartItems.length}</div>
        <button data-testid="add-item-button" onClick={handleClick}>
          Add to cart
        </button>
      </>
    );
  };
  const { click } = setup({ children: <TestComponent /> });

  // initial state
  expect(screen.getByTestId("cart-items-count")).toHaveTextContent("0");

  // add item to cart
  await click(screen.getByTestId("add-item-button"));
  expect(screen.getByTestId("cart-items-count")).toHaveTextContent("1");
});

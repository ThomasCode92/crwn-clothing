import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import CartContextProvider, { CartContext } from "./cartContext";

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

test("should provide the expected context value", function () {
  let contextValue: unknown = null;
  const TestComponent = () => {
    contextValue = useContext(CartContext);
    return null;
  };
  setup({ children: <TestComponent /> });

  expect(contextValue).toEqual({
    isOpen: false,
    setIsOpen: expect.any(Function),
  });
});

test("should provide default isOpen value as false", function () {
  const TestComponent = () => {
    const { isOpen } = useContext(CartContext);
    return <div data-testid="isOpen-value">{isOpen.toString()}</div>;
  };
  setup({ children: <TestComponent /> });

  expect(screen.getByTestId("isOpen-value")).toHaveTextContent("false");
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

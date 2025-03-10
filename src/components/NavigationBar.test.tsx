import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";

import * as CartDropdown from "@/components/cart/CartDropdown";
import * as CartIcon from "@/components/cart/CartIcon";
import { CartContext } from "@/contexts/cartContext";
import { UserContext } from "@/contexts/userContext";
import { signOutUser } from "@/utils/firebase";

import NavigationBar from "./NavigationBar";

const currentUser = { displayName: "Alice" } as User;

vi.mock("firebase/auth");
vi.mock("@/utils/firebase");

const cartIconSpy = vi.spyOn(CartIcon, "default");
const cartDropdownSpy = vi.spyOn(CartDropdown, "default");

function setup(currentUser: User | null = null, isOpen = false) {
  const userValue = { currentUser, setCurrentUser: vi.fn() };
  const cartValue = { isOpen, setIsOpen: vi.fn() };

  render(
    <UserContext.Provider value={userValue}>
      <CartContext.Provider value={cartValue}>
        <NavigationBar />
      </CartContext.Provider>
    </UserContext.Provider>,
    { wrapper: MemoryRouter },
  );

  return userEvent.setup();
}

beforeEach(() => {
  vi.clearAllMocks();
});

test("should render a logo", function () {
  setup(currentUser);
  const logoElement = screen.getByTestId("crown-logo");
  expect(logoElement).toBeInTheDocument();
});

test("should have a link to the shop page", function () {
  setup(currentUser);
  const shopLinkElement = screen.getByText(/shop/i);
  expect(shopLinkElement).toHaveAttribute("href", "/shop");
});

test("should have a link to the authentication page", function () {
  setup();
  const signInLinkElement = screen.getByText(/sign in/i);
  expect(signInLinkElement).toHaveAttribute("href", "/auth");
});

test("should show the sign out link when a user is signed in", function () {
  setup(currentUser);
  const signOutLinkElement = screen.getByText(/sign out/i);
  expect(signOutLinkElement).toBeInTheDocument();
});

test("should call the sign out function when the sign out link is clicked", async function () {
  const { click } = setup(currentUser);
  const signOutLinkElement = screen.getByText(/sign out/i);
  await click(signOutLinkElement);

  expect(signOutUser).toHaveBeenCalled();
});

test("should show the cart icon and cart dropdown", function () {
  setup(currentUser, true);
  expect(cartIconSpy).toHaveBeenCalledOnce();
  expect(cartDropdownSpy).toHaveBeenCalledOnce();
});

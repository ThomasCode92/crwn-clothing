import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";

import { UserContext } from "@/contexts/userContext";
import { signOutUser } from "@/utils/firebase";
import NavigationBar from "./NavigationBar";

const currentUser = { displayName: "Alice" } as User;
const setCurrentUser = vi.fn();

function setup(currentUser: User | null) {
  const value = { currentUser, setCurrentUser };

  render(
    <UserContext.Provider value={value}>
      <NavigationBar />
    </UserContext.Provider>,
    { wrapper: MemoryRouter },
  );

  return userEvent.setup();
}

vi.mock("firebase/auth");
vi.mock("@/utils/firebase");

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
  setup(null);
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
  expect(setCurrentUser).toHaveBeenCalledWith(null);
});

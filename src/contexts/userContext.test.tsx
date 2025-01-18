import { render } from "@testing-library/react";
import { User } from "firebase/auth";
import { useContext, useEffect } from "react";

import UserContextProvider, { UserContext } from "./userContext";

const mocks = vi.hoisted(function () {
  const unsubscribe = vi.fn();
  const onAuthStateChangedListener = vi.fn().mockReturnValue(unsubscribe);
  return { onAuthStateChangedListener, unsubscribe };
});

vi.mock("@/utils/firebase", () => ({
  onAuthStateChangedListener: mocks.onAuthStateChangedListener,
}));

function setup() {
  function Consumer() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
      setCurrentUser({ displayName: "Alice" } as User);
    }, [setCurrentUser]);

    return <div>{currentUser?.displayName}</div>;
  }

  const { unmount } = render(
    <UserContextProvider>
      <Consumer />
    </UserContextProvider>,
  );

  return { unmount };
}

beforeEach(vi.clearAllMocks);

test("should provide the correct context values", () => {
  setup();
  expect(document.body.textContent).toBe("Alice");
});

test("should call onAuthStateChangedListener with the correct callback", () => {
  setup();
  expect(mocks.onAuthStateChangedListener).toHaveBeenCalledWith(
    expect.any(Function),
  );
});

test("should call unsubscribe when unmounted", () => {
  const { unmount } = setup();
  unmount();
  expect(mocks.unsubscribe).toHaveBeenCalledOnce();
});

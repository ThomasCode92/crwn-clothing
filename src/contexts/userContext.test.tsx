import { render } from "@testing-library/react";
import { useContext, useEffect } from "react";

import { User } from "firebase/auth";
import UserContextProvider, { UserContext } from "./userContext";

function setup() {
  function Consumer() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
      setCurrentUser({ displayName: "Alice" } as User);
    }, [setCurrentUser]);

    return <div>{currentUser?.displayName}</div>;
  }

  render(
    <UserContextProvider>
      <Consumer />
    </UserContextProvider>,
  );
}

test("should provide the correct context values", () => {
  setup();
  expect(document.body.textContent).toBe("Alice");
});

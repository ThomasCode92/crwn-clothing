import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "@/contexts/userContext";
import { signOutUser } from "@/utils/firebase";

import CrownLogo from "@/assets/crown.svg";

export default function NavigationBar() {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="mx-6 mb-6 flex h-16 items-center justify-between">
      <Link className="flex flex-col justify-around" to="/">
        <CrownLogo data-testid="crown-logo" />
      </Link>
      <ul className="flex gap-6">
        <li className="text-lg uppercase">
          <Link to="/shop">shop</Link>
        </li>
        <li className="text-lg uppercase">
          {currentUser && (
            <span className="cursor-pointer" onClick={signOutUser}>
              sign out
            </span>
          )}
          {!currentUser && <Link to="/auth">sign in</Link>}
        </li>
      </ul>
    </nav>
  );
}

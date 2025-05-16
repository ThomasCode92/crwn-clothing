import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartDropdown from "@/components/cart/CartDropdown";
import CartIcon from "@/components/cart/CartIcon";
import { selectIsCartOpen } from "@/store/cart/cart.selector";
import { selectCurrentUser } from "@/store/user/user.selector";
import { signOutUser } from "@/utils/firebase";

import CrownLogo from "@/assets/crown.svg";

export default function NavigationBar() {
  const currentUser = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectIsCartOpen);

  return (
    <nav className="mx-6 mb-6 flex h-16 items-center justify-between">
      <Link className="flex flex-col justify-around" to="/">
        <CrownLogo data-testid="crown-logo" />
      </Link>
      <ul className="flex items-center gap-6">
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
        <li className="relative">
          <CartIcon />
          {isOpen && <CartDropdown />}
        </li>
      </ul>
    </nav>
  );
}

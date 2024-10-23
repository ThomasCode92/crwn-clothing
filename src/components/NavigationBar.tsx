import { Link } from "react-router-dom";

import CrownLogo from "../assets/crown.svg";

export default function NavigationBar() {
  return (
    <nav className="mx-6 mb-6 flex h-16 items-center justify-between">
      <Link className="flex flex-col justify-around" to="/">
        <CrownLogo data-testid="crown-logo" />
      </Link>
      <ul>
        <li className="text-lg uppercase">
          <Link to="/shop">shop</Link>
        </li>
      </ul>
    </nav>
  );
}

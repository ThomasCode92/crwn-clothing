import { Link } from "react-router-dom";

import CrownLogo from "../assets/crown.svg";

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">
        <CrownLogo data-testid="crown-logo" />
      </Link>
      <ul>
        <li>
          <Link to="/shop">shop</Link>
        </li>
      </ul>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">
        <div>Logo</div>
      </Link>
      <ul>
        <li>
          <Link to="/shop">shop</Link>
        </li>
      </ul>
    </nav>
  );
}

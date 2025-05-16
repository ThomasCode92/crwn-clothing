import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItem from "@/components/cart/CartItem";
import Button from "@/components/UI/Button";
import { selectCartItems } from "@/store/cart/cart.selector";

export default function CartDropdown() {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="absolute right-0 top-16 z-10 flex h-80 w-60 flex-col border border-black bg-white p-5">
      <ul className="flex h-60 flex-col overflow-scroll">
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <Link to="/checkout">
        <Button>Go to Checkout</Button>
      </Link>
    </div>
  );
}

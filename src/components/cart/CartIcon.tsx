import { useDispatch, useSelector } from "react-redux";

import { setIsCartOpen } from "@/store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "@/store/cart/cart.selector";

import ShoppingIcon from "@/assets/shopping-bag.svg";

export default function CartIcon() {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isOpen = useSelector(selectIsCartOpen);

  function handleClick() {
    dispatch(setIsCartOpen(!isOpen));
  }

  return (
    <button
      className="relative flex size-11 cursor-pointer items-center justify-center"
      onClick={handleClick}
    >
      <div className="size-6">
        <ShoppingIcon data-testid="shopping-icon" />
      </div>
      <span className="absolute bottom-3 text-xs font-bold">{cartCount}</span>
    </button>
  );
}

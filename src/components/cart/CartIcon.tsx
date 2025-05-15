import { useContext } from "react";

import ShoppingIcon from "@/assets/shopping-bag.svg";
import { CartContext } from "@/contexts/cartContext";

export default function CartIcon() {
  const { isOpen, cartCount, setIsOpen } = useContext(CartContext);

  function handleClick() {
    setIsOpen(!isOpen);
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

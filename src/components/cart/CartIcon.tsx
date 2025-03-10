import { useContext } from "react";

import ShoppingIcon from "@/assets/shopping-bag.svg";
import { CartContext } from "@/contexts/cartContext";

export default function CartIcon() {
  const { setIsOpen } = useContext(CartContext);

  function handleClick() {
    setIsOpen(prevValue => !prevValue);
  }

  return (
    <button
      className="relative flex size-11 cursor-pointer items-center justify-center"
      onClick={handleClick}
    >
      <div className="size-6">
        <ShoppingIcon />
      </div>
      <span className="absolute bottom-3 text-xs font-bold">0</span>
    </button>
  );
}

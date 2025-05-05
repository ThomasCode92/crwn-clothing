import { useContext } from "react";

import { CartContext } from "@/contexts/cartContext";
import { ICartItem } from "@/models/CartItem";

export interface CheckoutItemProps extends ICartItem {}

export default function CheckoutItem({
  id,
  name,
  quantity,
  imageUrl,
  price,
}: CheckoutItemProps) {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const cartItem: ICartItem = { id, name, quantity, imageUrl, price };

  function incrementItemQuantity() {
    addItemToCart(cartItem);
  }

  function decrementItemQuantity() {
    removeItemFromCart(cartItem);
  }

  return (
    <li className="*:px-1">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <span className="flex items-center gap-2">
        <button className="cursor-pointer" onClick={decrementItemQuantity}>
          &#10094;
        </button>
        {quantity}
        <button className="cursor-pointer" onClick={incrementItemQuantity}>
          &#10095;
        </button>
      </span>
      <span>{`$${price}`}</span>
      <button>&#10005;</button>
    </li>
  );
}

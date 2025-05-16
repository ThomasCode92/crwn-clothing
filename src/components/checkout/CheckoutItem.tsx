import { useDispatch, useSelector } from "react-redux";

import { ICartItem } from "@/models/CartItem";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "@/store/cart/cart.action";
import { selectCartItems } from "@/store/cart/cart.selector";

export interface CheckoutItemProps extends ICartItem {}

export default function CheckoutItem({
  id,
  name,
  quantity,
  imageUrl,
  price,
}: CheckoutItemProps) {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartItem: ICartItem = { id, name, quantity, imageUrl, price };

  function incrementItemQuantity() {
    dispatch(addItemToCart(cartItems, cartItem));
  }

  function decrementItemQuantity() {
    dispatch(removeItemFromCart(cartItems, cartItem));
  }

  function clearItem() {
    dispatch(clearItemFromCart(cartItems, cartItem));
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
      <button onClick={clearItem}>&#10005;</button>
    </li>
  );
}

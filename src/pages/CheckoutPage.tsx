import { Fragment, useContext, useEffect } from "react";

import { CartContext } from "@/contexts/cartContext";

export default function CheckoutPage() {
  const { cartItems, addItemToCart, removeItemFromCart, setIsOpen } =
    useContext(CartContext);

  useEffect(() => setIsOpen(false), [setIsOpen]);

  return (
    <Fragment>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <ul>
        {cartItems.map(cartItem => {
          const { id, name, quantity } = cartItem;
          return (
            <li key={id}>
              <h3>{name}</h3>
              <span>{quantity}</span>
              <span onClick={() => removeItemFromCart(cartItem)}>
                decrement
              </span>
              <span onClick={() => addItemToCart(cartItem)}>increment</span>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

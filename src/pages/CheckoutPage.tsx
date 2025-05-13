import { useContext, useEffect } from "react";

import CheckoutItem from "@/components/checkout/CheckoutItem";
import { CartContext } from "@/contexts/cartContext";

const HEADERS = ["product", "description", "quantity", "price", "remove"];

export default function CheckoutPage() {
  const { cartItems, setIsOpen } = useContext(CartContext);

  useEffect(() => setIsOpen(false), [setIsOpen]);

  const cartTotal = cartItems.reduce(
    (total, item) => (total += item.price * item.quantity),
    0,
  );

  return (
    <section className="mx-auto w-2/3 text-xl text-gray-600">
      <div className="grid grid-cols-[repeat(4,1fr)_0.5fr] items-center gap-y-4 text-gray-800">
        <Header />
        <ul className="contents text-lg [&>li]:contents">
          {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} {...cartItem} />
          ))}
        </ul>
      </div>
      <h4 className="mt-4 text-right text-3xl italic">Total: ${cartTotal}</h4>
    </section>
  );
}

function Header() {
  return (
    <div className="contents font-semibold capitalize *:border-b *:border-b-gray-400">
      {HEADERS.map((header, idx) => (
        <h2 key={idx} className="px-1">
          {header}
        </h2>
      ))}
    </div>
  );
}

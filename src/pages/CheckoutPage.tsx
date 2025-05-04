import { Fragment, useContext, useEffect } from "react";

import { CartContext } from "@/contexts/cartContext";
import CheckoutItem from "@/components/checkout/CheckoutItem";

const HEADERS = ["product", "description", "quantity", "price", "remove"];

export default function CheckoutPage() {
  const { cartItems, setIsOpen } = useContext(CartContext);

  useEffect(() => setIsOpen(false), [setIsOpen]);

  return (
    <Fragment>
      <section>
        <div className="mx-auto grid w-2/3 grid-cols-[repeat(4,1fr)_0.5fr] items-center gap-y-4 text-xl text-gray-800">
          <Header />
          <ul className="contents text-lg text-gray-600 [&>li]:contents">
            {cartItems.map(cartItem => (
              <CheckoutItem key={cartItem.id} {...cartItem} />
            ))}
          </ul>
        </div>
      </section>
    </Fragment>
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

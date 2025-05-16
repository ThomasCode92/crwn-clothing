import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutItem from "@/components/checkout/CheckoutItem";
import { setIsCartOpen } from "@/store/cart/cart.action";
import { selectCartItems, selectCartTotal } from "@/store/cart/cart.selector";

const HEADERS = ["product", "description", "quantity", "price", "remove"];

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, [dispatch]);

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

import { Fragment, useContext, useEffect } from "react";

import { CartContext } from "@/contexts/cartContext";

export default function CheckoutPage() {
  const { setIsOpen } = useContext(CartContext);

  useEffect(() => setIsOpen(false), [setIsOpen]);

  return (
    <Fragment>
      <h1 className="text-2xl font-bold">Checkout</h1>
    </Fragment>
  );
}

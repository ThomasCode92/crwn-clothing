import { createContext, Dispatch, SetStateAction, useState } from "react";

import { ICartItem } from "@/models/CartItem";
import { IProduct } from "@/models/Product";
import { addCartItem } from "@/utils/cart";

export interface ICartContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  addItemToCart: (item: IProduct) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  function addItemToCart(product: IProduct) {
    const newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
  }

  const value = { isOpen, setIsOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

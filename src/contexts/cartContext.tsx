import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ICartItem } from "@/models/CartItem";
import { IProduct } from "@/models/Product";
import { addCartItem, removeCartItem } from "@/utils/cart";

export interface ICartContext {
  isOpen: boolean;
  cartCount: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (item: IProduct) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  cartCount: 0,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  function addItemToCart(product: IProduct) {
    const newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
  }

  function removeItemFromCart(product: IProduct) {
    const newCartItems = removeCartItem(cartItems, product);
    setCartItems(newCartItems);
  }

  const value = {
    isOpen,
    cartCount,
    setIsOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

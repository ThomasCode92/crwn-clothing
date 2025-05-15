import { createContext, useReducer } from "react";

import { ICartItem } from "@/models/CartItem";
import { IProduct } from "@/models/Product";
import { addCartItem, clearCartItem, removeCartItem } from "@/utils/cart";

export interface ICartContext {
  isOpen: boolean;
  cartCount: number;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: ICartItem[];
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (item: IProduct) => void;
  clearItemFromCart: (item: IProduct) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  cartCount: 0,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export enum CART_ACTION_TYPE {
  SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_COUNT = "SET_CART_COUNT",
  SET_CART_TOTAL = "SET_CART_TOTAL",
}

type Action =
  | {
      type: CART_ACTION_TYPE.SET_CART_ITEMS;
      payload: { cartItems: ICartItem[]; cartCount: number; cartTotal: number };
    }
  | { type: CART_ACTION_TYPE.SET_IS_CART_OPEN; payload: boolean };

type State = {
  isOpen: boolean;
  cartItems: ICartItem[];
  cartCount: number;
  cartTotal: number;
};

const INITIAL_STATE: State = {
  isOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return { ...state, isOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ isOpen, cartItems, cartCount }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE,
  );

  const updateCartItemsReducer = (cartItems: ICartItem[]) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch({ type: CART_ACTION_TYPE.SET_CART_ITEMS, payload });
  };

  function setIsOpen(isOpen: boolean) {
    dispatch({ type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: isOpen });
  }

  function addItemToCart(product: IProduct) {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  function removeItemFromCart(product: IProduct) {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  function clearItemFromCart(product: IProduct) {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const value = {
    isOpen,
    cartCount,
    setIsOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

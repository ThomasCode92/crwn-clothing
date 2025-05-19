import { CartItem } from "@/models/Cart";
import { CART_ACTION_TYPE } from "@/store/cart/cart.types";

export type CartState = {
  isOpen: boolean;
  cartItems: CartItem[];
};

type Action =
  | { type: CART_ACTION_TYPE.SET_CART_ITEMS; payload: CartItem[] }
  | { type: CART_ACTION_TYPE.SET_IS_CART_OPEN; payload: boolean };

const INITIAL_STATE: CartState = {
  isOpen: false,
  cartItems: [],
};

export default function cartReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}

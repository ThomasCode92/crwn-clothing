import { CartItem } from "@/models/Cart";
import { CategoryItem } from "@/models/Category";
import { CART_ACTION_TYPE } from "@/store/cart/cart.types";
import { addCartItem, clearCartItem, removeCartItem } from "@/utils/cart";
import { createAction } from "@/utils/reducer";

function setCartItems(cartItems: CartItem[]) {
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems);
}

export function setIsCartOpen(isOpen: boolean) {
  return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isOpen);
}

export function addItemToCart(cartItems: CartItem[], item: CategoryItem) {
  const newCartItems = addCartItem(cartItems, item);
  return setCartItems(newCartItems);
}

export function removeItemFromCart(
  cartItems: CartItem[],
  product: CategoryItem,
) {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
}

export function clearItemFromCart(
  cartItems: CartItem[],
  product: CategoryItem,
) {
  const newCartItems = clearCartItem(cartItems, product);
  return setCartItems(newCartItems);
}

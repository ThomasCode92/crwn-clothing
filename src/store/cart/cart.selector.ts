import { createSelector } from "reselect";

import { CartState } from "@/store/cart/cart.reducer";
import type { RootState } from "@/store/root-reducer";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cartSlice => cartSlice.isOpen,
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  cartSlice => cartSlice.cartItems,
);

export const selectCartCount = createSelector([selectCartReducer], cartSlice =>
  cartSlice.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartReducer], cartSlice =>
  cartSlice.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0,
  ),
);

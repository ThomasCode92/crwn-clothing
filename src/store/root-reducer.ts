import { combineReducers } from "redux";

import cartReducer from "@/store/cart/cart.reducer";
import categoriesReducer from "@/store/categories/categories.reducer";
import userReducer from "@/store/user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

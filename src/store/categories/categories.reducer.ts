import { Category } from "@/models/Category";
import { CATEGORIES_ACTION_TYPE } from "@/store/categories/categories.types";

type Action = {
  type: CATEGORIES_ACTION_TYPE;
  payload: Category[];
};

export type CategoriesState = {
  categories: Category[];
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
};

export default function categoriesReducer(
  state = INITIAL_STATE,
  action: Action,
) {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

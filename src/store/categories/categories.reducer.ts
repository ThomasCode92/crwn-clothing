import { ICategoryItem } from "@/models/Category";
import { CATEGORIES_ACTION_TYPE } from "@/store/categories/categories.types";

export type CategoryMap = Record<string, ICategoryItem[]>;

type Action = {
  type: CATEGORIES_ACTION_TYPE;
  payload: CategoryMap;
};

export type CategoriesState = {
  categoriesMap: CategoryMap;
};

const INITIAL_STATE: CategoriesState = {
  categoriesMap: {},
};

export default function categoriesReducer(
  state = INITIAL_STATE,
  action: Action,
) {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: action.payload };
    default:
      return state;
  }
}

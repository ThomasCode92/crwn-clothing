import { Category } from "@/models/Category";
import { CATEGORIES_ACTION_TYPE } from "@/store/categories/categories.types";
import { createAction } from "@/utils/reducer";

export function setCategories(categories: Category[]) {
  return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);
}

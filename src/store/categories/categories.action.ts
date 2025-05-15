import { CategoryMap } from "@/store/categories/categories.reducer";
import { CATEGORIES_ACTION_TYPE } from "@/store/categories/categories.types";
import { createAction } from "@/utils/reducer";

export function setCategoriesMap(categoriesMap: CategoryMap) {
  return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP, categoriesMap);
}

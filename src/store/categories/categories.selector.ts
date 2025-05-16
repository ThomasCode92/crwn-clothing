import { CategoriesMap } from "@/models/Category";
import { CategoriesState } from "@/store/categories/categories.reducer";

export const selectCategoriesMap = (state: {
  categories: CategoriesState;
}): CategoriesMap =>
  state.categories.categories.reduce<CategoriesMap>((categoryMap, category) => {
    categoryMap[category.title.toLowerCase()] = category.items;
    return categoryMap;
  }, {});

import { createSelector } from "reselect";

import { CategoriesMap } from "@/models/Category";
import { CategoriesState } from "@/store/categories/categories.reducer";
import type { RootState } from "@/store/root-reducer";

const selectCategoriesReducer = (state: RootState): CategoriesState =>
  state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories.reduce<CategoriesMap>((acc, category) => {
      acc[category.title.toLowerCase()] = category.items;
      return acc;
    }, {}),
);

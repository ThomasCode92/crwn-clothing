import { CategoriesState } from "@/store/categories/categories.reducer";

export const selectCategoriesMap = (state: { categories: CategoriesState }) =>
  state.categories.categoriesMap;

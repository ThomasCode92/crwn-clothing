import { CategoryItem } from "./Category";

export type CartItem = CategoryItem & {
  quantity: number;
};

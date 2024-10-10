import CategoryListItem from "./CategoryListItem";

import { ICategory } from "../models/Category";

interface CategoryListProps {
  categories: ICategory[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="flex flex-wrap">
      {categories.map(category => (
        <CategoryListItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

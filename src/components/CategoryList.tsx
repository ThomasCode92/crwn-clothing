import CategoryListItem from "./CategoryListItem";

import { Category } from "@/models/Category";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="flex flex-wrap">
      {categories.map(category => (
        <CategoryListItem key={category.title} category={category} />
      ))}
    </ul>
  );
}

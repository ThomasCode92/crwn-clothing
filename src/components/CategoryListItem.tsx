import { ICategory } from "../models/Category";

interface CategoryItemProps {
  category: ICategory;
}

export default function CategoryListItem({ category }: CategoryItemProps) {
  return (
    <li
      key={category.id}
      className="m-2 flex h-60 w-44 min-w-[30%] flex-auto items-center justify-center overflow-hidden border-2 border-black hover:cursor-pointer [&>div]:hover:scale-110 [&>div]:hover:transition-transform"
    >
      <div
        data-testid="category-image"
        className="size-full bg-cover bg-center"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      ></div>
      <article className="absolute flex h-24 flex-col items-center justify-center border-2 border-[#4a4a4a] bg-white px-6 text-[#4a4a4a] opacity-70">
        <h2 className="my-1.5 text-2xl font-bold capitalize">
          {category.title}
        </h2>
        <p className="capitalize">shop now</p>
      </article>
    </li>
  );
}

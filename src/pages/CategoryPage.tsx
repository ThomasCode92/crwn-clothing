import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "@/components/products/ProductCard";
import { selectCategoriesMap } from "@/store/categories/categories.selector";

export default function CategoryPage() {
  const { category } = useParams() as { category: string };
  const categoriesMap = useSelector(selectCategoriesMap);

  const products = categoriesMap[category];

  return (
    <Fragment>
      <h1 className="mb-2 text-3xl">{category.toUpperCase()}</h1>
      <ul className="grid grid-cols-4 gap-x-2.5 gap-y-6">
        {products?.length &&
          products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
      </ul>
    </Fragment>
  );
}

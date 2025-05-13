import { Fragment, useContext } from "react";

import { CategoriesContext } from "@/contexts/categoriesContext";
import CategoryPreview from "@/components/CategoryPreview";

export default function ShopPage() {
  const { categories } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categories).map(title => {
        const products = categories[title];
        return <CategoryPreview title={title} products={products} />;
      })}
    </Fragment>
  );
}

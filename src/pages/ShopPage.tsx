import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "@/components/CategoryPreview";
import { selectCategoriesMap } from "@/store/categories/categories.selector";

export default function ShopPage() {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
}

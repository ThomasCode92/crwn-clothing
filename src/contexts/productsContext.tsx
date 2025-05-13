import { createContext, useEffect, useState } from "react";

import { IProduct } from "@/models/Product";

import { SHOP_DATA } from "@/data/shop-data";
import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "@/utils/firestore";

interface IProductsContext {
  products: IProduct[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext<IProductsContext>({
  products: [],
});

export default function ProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products] = useState<IProduct[]>([]);

  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);

    async function getCategories() {
      const categoriesMap = await getCollectionAndDocuments("categories");
      console.log(categoriesMap);
    }

    getCategories();
  }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

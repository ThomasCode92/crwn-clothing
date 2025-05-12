import { createContext, useEffect, useState } from "react";

import { IProduct } from "@/models/Product";

import { SHOP_DATA } from "@/data/shop-data";
import { addCollectionAndDocuments } from "@/utils/firestore";

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
    addCollectionAndDocuments("categories¨", SHOP_DATA);
  });

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

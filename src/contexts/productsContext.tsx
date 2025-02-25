import { createContext, useState } from "react";

import { IProduct } from "@/models/Product";

import PRODUCTS from "@/data/shop-data.json";

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
  const [products] = useState<IProduct[]>(PRODUCTS);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

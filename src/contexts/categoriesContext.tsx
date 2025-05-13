import { createContext, useEffect, useState } from "react";

import { SHOP_DATA } from "@/data/shop-data";
import { ICategoryItem } from "@/models/Category";
import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "@/utils/firestore";

type CategoryMap = Record<string, ICategoryItem[]>;

interface ICategoriesContext {
  categories: CategoryMap;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext<ICategoriesContext>({
  categories: {},
});

export default function CategoriesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<CategoryMap>({});

  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);

    async function getCategories() {
      const categoriesMap = await getCollectionAndDocuments("categories");
      setCategories(categoriesMap);
    }

    getCategories();
  }, []);

  const value = { categories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

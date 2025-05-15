import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { setCategoriesMap } from "@/store/categories/categories.action";
import { getCollectionAndDocuments } from "@/utils/firestore";

export default function ShopLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategories() {
      const categoriesMap = await getCollectionAndDocuments("categories");
      dispatch(setCategoriesMap(categoriesMap));
    }

    getCategories();
  }, [dispatch]);

  return <Outlet />;
}

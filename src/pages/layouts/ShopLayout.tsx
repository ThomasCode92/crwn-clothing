import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { setCategories } from "@/store/categories/categories.action";
import { getCollectionAndDocuments } from "@/utils/firestore";

export default function ShopLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategories() {
      const categories = await getCollectionAndDocuments("categories");
      dispatch(setCategories(categories));
    }

    getCategories();
  }, [dispatch]);

  return <Outlet />;
}

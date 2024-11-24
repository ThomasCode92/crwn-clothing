import { useLoaderData } from "react-router-dom";

import CategoryList from "@/components/CategoryList";

import { ICategory } from "@/models/Category";

export default function HomePage() {
  const categories = useLoaderData() as ICategory[];
  return <CategoryList categories={categories} />;
}

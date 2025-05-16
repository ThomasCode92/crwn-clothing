import { useLoaderData } from "react-router-dom";

import CategoryList from "@/components/CategoryList";

import { Category } from "@/models/Category";

export default function HomePage() {
  const categories = useLoaderData() as Category[];
  return <CategoryList categories={categories} />;
}

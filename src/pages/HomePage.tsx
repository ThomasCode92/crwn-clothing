import CategoryList from "../components/CategoryList";

import categoryData from "../data/categories.json";

export default function HomePage() {
  return <CategoryList categories={categoryData} />;
}

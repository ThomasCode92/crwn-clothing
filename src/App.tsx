import CategoryList from "./components/CategoryList";

import categoryData from "./data/categories.json";

import "./App.css";

export default function App() {
  return <CategoryList categories={categoryData} />;
}

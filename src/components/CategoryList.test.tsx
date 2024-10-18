import { render, screen } from "@testing-library/react";

import { ICategory } from "../models/Category";
import CategoryList from "./CategoryList";

const categories: ICategory[] = [
  { id: 1, title: "hats", imageUrl: "some-url" },
  { id: 2, title: "sneakers", imageUrl: "another-url" },
];

test("should render a list item for each category", function () {
  render(<CategoryList categories={categories} />);
  const categoryItemElements = screen.getAllByRole("listitem");
  expect(categoryItemElements).toHaveLength(categories.length);
});

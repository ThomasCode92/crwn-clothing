import { render, screen } from "@testing-library/react";

import CategoryListItem from "./CategoryListItem";

import { ICategory } from "../models/Category";

const category: ICategory = { id: 1, title: "hats", imageUrl: "some-url" };

test("should render the title of the category", function () {
  render(<CategoryListItem category={category} />);
  const titleEl = screen.getByText(category.title);
  expect(titleEl).toBeInTheDocument();
});

test("should render the subtitle for category", function () {
  render(<CategoryListItem category={category} />);
  const subTitleEl = screen.getByText(/shop now/i);
  expect(subTitleEl).toBeInTheDocument();
});

test("should render the image for category", function () {
  render(<CategoryListItem category={category} />);
  const imageEl = screen.getByTestId("category-image");
  expect(imageEl.style.backgroundImage).toBe(`url(${category.imageUrl})`);
});

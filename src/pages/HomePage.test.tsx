import { render } from "@testing-library/react";

import * as CategoryList from "@/components/CategoryList";
import HomePage from "./HomePage";

import { ICategory } from "@/models/Category";

const { categories } = vi.hoisted(function () {
  const categories: ICategory[] = [
    { id: 1, title: "Category 1", imageUrl: "category1.jpg" },
    { id: 2, title: "Category 2", imageUrl: "category2.jpg" },
  ];

  return { categories };
});

vi.mock("react-router-dom", async function () {
  const reactRouter = await vi.importActual("react-router-dom");
  const useLoaderData = vi.fn().mockReturnValue(categories);
  return { ...reactRouter, useLoaderData };
});

const categoryListComponentSpy = vi
  .spyOn(CategoryList, "default")
  .mockReturnValue(<div>category list</div>);

test("should render the category list component with the correct data", function () {
  render(<HomePage />);
  expect(categoryListComponentSpy).toHaveBeenCalledTimes(1);
  expect(categoryListComponentSpy).toHaveBeenCalledWith(
    { categories }, // props
    expect.anything(), // forwarded ref
  );
});

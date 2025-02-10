import { render, screen } from "@testing-library/react";

import ShopPage from "./ShopPage";

const { data } = vi.hoisted(function () {
  return {
    data: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ],
  };
});

vi.mock("@/data/shop-data.json", function () {
  return { default: data };
});

test.each(data)("should render the name of product $name", function ({ name }) {
  render(<ShopPage />);
  const pageTitleElement = screen.getByText(new RegExp(name, "i"));
  expect(pageTitleElement).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";

import ShopPage from "./ShopPage";
import { IProduct } from "@/models/Product";
import { ProductsContext } from "@/contexts/productsContext";

const data: IProduct[] = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

function setup() {
  render(
    <ProductsContext.Provider value={{ products: data }}>
      <ShopPage />
    </ProductsContext.Provider>,
  );
}

test.each(data)("should render the name of product $name", function ({ name }) {
  setup();
  const pageTitleElement = screen.getByText(new RegExp(name, "i"));
  expect(pageTitleElement).toBeInTheDocument();
});

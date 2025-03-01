import { useContext } from "react";
import { render, screen } from "@testing-library/react";

import ProductsContextProvider, { ProductsContext } from "./productsContext";

const { data } = vi.hoisted(function () {
  return {
    data: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  };
});

vi.mock("@/data/shop-data.json", function () {
  return { default: data };
});

function setup() {
  function Consumer() {
    const { products } = useContext(ProductsContext);
    return (
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    );
  }

  render(
    <ProductsContextProvider>
      <Consumer />
    </ProductsContextProvider>,
  );
}

test.each(data)(
  "should provide the correct context values",
  function ({ name }) {
    setup();
    const productElement = screen.getByText(new RegExp(name, "i"));
    expect(productElement).toBeInTheDocument();
  },
);

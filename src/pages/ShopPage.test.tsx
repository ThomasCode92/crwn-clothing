import { render } from "@testing-library/react";

import ShopPage from "./ShopPage";
import { IProduct } from "@/models/Product";
import { ProductsContext } from "@/contexts/productsContext";
import * as ProductCard from "@/components/products/ProductCard";

const data: IProduct[] = [
  { id: 1, name: "Product 1", price: 10, imageUrl: "/image1.jpg" },
  { id: 2, name: "Product 2", price: 20, imageUrl: "/image2.jpg" },
  { id: 3, name: "Product 3", price: 30, imageUrl: "/image3.jpg" },
];

const productCardSpy = vi.spyOn(ProductCard, "default");

function setup() {
  render(
    <ProductsContext.Provider value={{ products: data }}>
      <ShopPage />
    </ProductsContext.Provider>,
  );
}

test.each(data)("should render the product card for $name", function (product) {
  setup();
  expect(productCardSpy).toHaveBeenCalledWith(
    expect.objectContaining(product),
    {}, // placeholder for forwardRef
  );
});

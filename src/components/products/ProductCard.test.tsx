import { render, screen } from "@testing-library/react";
import ProductCard, { ProductCardProps } from "./ProductCard";

function setup(props?: ProductCardProps) {
  const defaultProps: ProductCardProps = {
    name: "Product name",
    price: 100,
    imageUrl: "https://example.com/image.jpg",
  };
  render(<ProductCard {...defaultProps} {...props} />);
}

test("should render the product information", function () {
  setup();
  const btnElement = screen.getByRole("button", { name: /add to cart/i });
  expect(screen.getByText("Product name")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByAltText("Product name")).toBeInTheDocument();
  expect(btnElement).toBeInTheDocument();
});

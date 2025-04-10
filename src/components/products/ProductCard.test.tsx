import { render, screen } from "@testing-library/react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import { CartContext, ICartContext } from "@/contexts/cartContext";
import userEvent from "@testing-library/user-event";

const product = {
  id: 1,
  name: "Product name",
  price: 100,
  imageUrl: "https://example.com/image.jpg",
};

const addItemToCart = vi.fn();

function setup(props: ProductCardProps = product) {
  const ctxValue = { addItemToCart } as unknown as ICartContext;
  render(
    <CartContext.Provider value={ctxValue}>
      <ProductCard {...props} />
    </CartContext.Provider>,
  );
  return userEvent.setup();
}

test("should render the product information", function () {
  setup();
  const btnElement = screen.getByRole("button", { name: /add to cart/i });
  expect(screen.getByText("Product name")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByAltText("Product name")).toBeInTheDocument();
  expect(btnElement).toBeInTheDocument();
});

test("should call addItemToCart when button is clicked", async function () {
  const { click } = setup();
  await click(screen.getByRole("button", { name: /add to cart/i }));
  expect(addItemToCart).toHaveBeenCalledOnce();
  expect(addItemToCart).toHaveBeenCalledWith(product);
});

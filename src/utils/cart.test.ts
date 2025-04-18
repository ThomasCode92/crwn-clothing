import { addCartItem } from "@/utils/cart";
import { ICartItem } from "@/models/CartItem";
import { IProduct } from "@/models/Product";

const product: IProduct = {
  id: 1,
  name: "Product 1",
  price: 100,
  imageUrl: "/product-1.png",
};

test("should add a new product to the cart if it does not exist", () => {
  const cartItems: ICartItem[] = [];

  const updatedCart = addCartItem(cartItems, product);

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart[0]).toEqual({ ...product, quantity: 1 });
});

test("should increase the quantity of an existing product in the cart", () => {
  const cartItems: ICartItem[] = [{ ...product, quantity: 1 }];

  const updatedCart = addCartItem(cartItems, product);

  expect(updatedCart).toHaveLength(1);
  expect(updatedCart[0].quantity).toBe(2);
});

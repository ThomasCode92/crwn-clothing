import { ICartItem } from "@/models/CartItem";
import { IProduct } from "@/models/Product";

export function addCartItem(
  cartItems: ICartItem[],
  product: IProduct,
): ICartItem[] {
  const existingCartItem = cartItems.find(item => item.id === product.id);
  if (existingCartItem)
    return cartItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  return [...cartItems, { ...product, quantity: 1 }];
}

export function removeCartItem(
  cartItems: ICartItem[],
  product: IProduct,
): ICartItem[] {
  const existingCartItem = cartItems.find(item => item.id === product.id);
  if (existingCartItem!.quantity === 1)
    return cartItems.filter(item => item.id !== product.id);
  return cartItems.map(item =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
  );
}

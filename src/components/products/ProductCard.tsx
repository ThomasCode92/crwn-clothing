import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/Button";
import { addItemToCart } from "@/store/cart/cart.action";
import { selectCartItems } from "@/store/cart/cart.selector";

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
}: ProductCardProps) {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  function handleAddToCart() {
    const itemToAdd = { id, name, price, imageUrl };
    dispatch(addItemToCart(cartItems, itemToAdd));
  }

  return (
    <div className="group relative flex h-80 flex-col items-center">
      <img
        src={imageUrl}
        alt={name}
        className="mb-1 h-[95%] w-full object-cover hover:opacity-80"
      />
      <div className="mb-4 flex w-full justify-between text-lg">
        <span>{name}</span>
        <span className="w-1/12">{price}</span>
      </div>
      <Button
        buttonType="inverted"
        className="absolute top-52 hidden w-4/5 opacity-70 group-hover:block group-hover:opacity-85"
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </div>
  );
}

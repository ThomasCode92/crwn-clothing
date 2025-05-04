import { ICartItem } from "@/models/CartItem";

export interface CheckoutItemProps extends ICartItem {}

export default function CheckoutItem({
  name,
  quantity,
  imageUrl,
}: CheckoutItemProps) {
  return (
    <li className="*:px-1">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <span className="flex items-center gap-2">
        <button className="cursor-pointer">&#10094;</button>
        {quantity}
        <button className="cursor-pointer">&#10095;</button>
      </span>
      <span>{`$${quantity}`}</span>
      <button>&#10005;</button>
    </li>
  );
}

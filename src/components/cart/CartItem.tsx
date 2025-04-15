export interface CartItemProps {
  name: string;
  quantity: number;
  imageUrl: string;
  price: number;
}

export default function CartItem({
  name,
  quantity,
  imageUrl,
  price,
}: CartItemProps) {
  return (
    <li className="mb-4 flex h-20">
      <img src={imageUrl} alt={name} className="w-1/3" />
      <div className="flex w-2/3 flex-col items-start justify-center px-5 py-2.5">
        <h4 className="text-base">{name}</h4>
        <span className="text-gray-500">
          {quantity} x ${price}
        </span>
      </div>
    </li>
  );
}

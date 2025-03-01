import Button from "@/components/UI/Button";

export interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="group relative flex h-80 flex-col items-center">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="mb-1 h-[95%] w-full object-cover hover:opacity-80"
      />
      <div className="mb-4 flex w-full justify-between text-lg">
        <span>{props.name}</span>
        <span className="w-1/12">{props.price}</span>
      </div>
      <Button
        buttonType="inverted"
        className="absolute top-52 hidden w-4/5 opacity-70 group-hover:block group-hover:opacity-85"
      >
        Add to cart
      </Button>
    </div>
  );
}

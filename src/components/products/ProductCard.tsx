import Button from "@/components/UI/Button";

export interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div>
      <img src={props.imageUrl} alt={props.name} />
      <div>
        <span>{props.name}</span>
        <span>{props.price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  );
}

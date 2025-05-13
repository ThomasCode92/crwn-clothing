import { IProduct } from "@/models/Product";
import ProductCard from "./products/ProductCard";

interface CategoryPreviewProps {
  title: string;
  products: IProduct[];
}

export default function CategoryPreview({
  title,
  products,
}: CategoryPreviewProps) {
  return (
    <section>
      <h2 className="mb-2 text-2xl">{title.toUpperCase()}</h2>
      <ul className="grid grid-cols-4 gap-x-2.5">
        {products
          .filter((_, idx) => idx < 4)
          .map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
      </ul>
    </section>
  );
}

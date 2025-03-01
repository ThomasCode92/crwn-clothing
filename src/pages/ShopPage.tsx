import { useContext } from "react";

import { ProductsContext } from "@/contexts/productsContext";
import ProductCard from "@/components/products/ProductCard";

export default function ShopPage() {
  const { products } = useContext(ProductsContext);

  return (
    <ul className="grid grid-cols-4 gap-x-2.5 gap-y-12">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}

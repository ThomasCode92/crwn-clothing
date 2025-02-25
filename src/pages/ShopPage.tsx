import { useContext } from "react";

import { ProductsContext } from "@/contexts/productsContext";
import ProductCard from "@/components/products/ProductCard";

export default function ShopPage() {
  const { products } = useContext(ProductsContext);

  return (
    <ul>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}

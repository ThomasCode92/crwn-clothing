import { useContext } from "react";

import { ProductsContext } from "@/contexts/productsContext";

export default function ShopPage() {
  const { products } = useContext(ProductsContext);

  return (
    <ul>
      {products.map(({ id, name }) => (
        <li key={id}>
          <h3>{name}</h3>
        </li>
      ))}
    </ul>
  );
}

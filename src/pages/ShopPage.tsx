import SHOP_DATA from "@/data/shop-data.json";

export default function ShopPage() {
  return (
    <ul>
      {SHOP_DATA.map(({ id, name }) => (
        <li key={id}>
          <h3>{name}</h3>
        </li>
      ))}
    </ul>
  );
}

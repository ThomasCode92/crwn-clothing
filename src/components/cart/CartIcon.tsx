import ShoppingIcon from "@/assets/shopping-bag.svg";

export default function CartIcon() {
  return (
    <div className="relative flex size-11 cursor-pointer items-center justify-center">
      <div className="size-6">
        <ShoppingIcon />
      </div>
      <span className="absolute bottom-3 text-xs font-bold">0</span>
    </div>
  );
}

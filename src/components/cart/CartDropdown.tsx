import Button from "@/components/UI/Button";

export default function CartDropdown() {
  return (
    <div className="absolute right-0 top-16 z-10 flex h-80 w-60 flex-col border border-black bg-white p-5">
      <ul className="flex h-60 flex-col overflow-scroll"></ul>
      <Button>Go to Checkout</Button>
    </div>
  );
}

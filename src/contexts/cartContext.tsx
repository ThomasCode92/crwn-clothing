import { createContext, useState } from "react";

interface ICartContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<ICartContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const value = { isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

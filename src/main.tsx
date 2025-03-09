import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ProductsContextProvider from "@/contexts/productsContext.tsx";
import UserContextProvider from "@/contexts/userContext.tsx";
import CartContextProvider from "./contexts/cartContext.tsx";

import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

createRoot(rootEl!).render(
  <StrictMode>
    <UserContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductsContextProvider>
    </UserContextProvider>
  </StrictMode>,
);

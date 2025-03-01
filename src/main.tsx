import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UserContextProvider from "@/contexts/userContext.tsx";
import ProductsContextProvider from "@/contexts/productsContext.tsx";

import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

createRoot(rootEl!).render(
  <StrictMode>
    <UserContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </UserContextProvider>
  </StrictMode>,
);

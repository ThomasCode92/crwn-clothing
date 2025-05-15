import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import CartContextProvider from "@/contexts/cartContext.tsx";
import CategoriesContextProvider from "@/contexts/categoriesContext.tsx";
import UserContextProvider from "@/contexts/userContext.tsx";
import { store } from "@/store/store.ts";

import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

createRoot(rootEl!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <CategoriesContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoriesContextProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>,
);

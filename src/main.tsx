import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import CartContextProvider from "@/contexts/cartContext.tsx";
import { store } from "@/store/store.ts";

import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

createRoot(rootEl!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </Provider>
  </React.StrictMode>,
);

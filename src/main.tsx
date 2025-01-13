import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UserContextProvider from "@/contexts/userContext.tsx";

import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

createRoot(rootEl!).render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>,
);

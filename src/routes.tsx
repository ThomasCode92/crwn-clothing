import { RouteObject } from "react-router-dom";

import AuthenticationPage from "./pages/AuthenticationPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/layouts/RootLayout";
import ShopPage from "./pages/ShopPage";

import { getCategories } from "./api/category";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: getCategories },
      { path: "shop", element: <ShopPage /> },
      { path: "auth", element: <AuthenticationPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
];

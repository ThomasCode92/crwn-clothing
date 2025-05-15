import { RouteObject } from "react-router-dom";

import AuthenticationPage from "./pages/AuthenticationPage";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/layouts/RootLayout";
import ShopLayout from "./pages/layouts/ShopLayout";
import ShopPage from "./pages/ShopPage";

import { getCategories } from "./api/category";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: getCategories },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [
          { index: true, element: <ShopPage /> },
          { path: ":category", element: <CategoryPage /> },
        ],
      },
      { path: "auth", element: <AuthenticationPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
];

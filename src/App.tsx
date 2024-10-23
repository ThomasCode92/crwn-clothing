import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayout from "./pages/layouts/RootLayout";

import { getCategories } from "./api/category";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage />, loader: getCategories }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

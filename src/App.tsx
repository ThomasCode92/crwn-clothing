import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";

import "./App.css";

const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);

export default function App() {
  return <RouterProvider router={router} />;
}

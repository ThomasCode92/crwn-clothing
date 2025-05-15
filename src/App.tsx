import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";
import { setCurrentUser } from "@/store/user/user.action";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "@/utils/firebase";

import "./App.css";

const router = createBrowserRouter(routes);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

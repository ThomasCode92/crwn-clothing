import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Fragment>
      <header>
        <h1>My App</h1>
      </header>
      <main data-testid="main-content">
        <Outlet />
      </main>
    </Fragment>
  );
}

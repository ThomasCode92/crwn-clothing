import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";

export default function RootLayout() {
  return (
    <Fragment>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

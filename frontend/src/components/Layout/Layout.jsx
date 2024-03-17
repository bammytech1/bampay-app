import { Outlet } from "react-router-dom";
import Header from "../Header";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Layout;

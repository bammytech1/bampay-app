import { Outlet } from "react-router-dom";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { ExchangeFooter } from "../ExchangeFooter";

function Layout() {
  return (
    <div className="">
      <Header />
      <ToastContainer />
      <Outlet />
      {/* <ExchangeFooter /> */}
    </div>
  );
}

export default Layout;

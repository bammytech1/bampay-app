import { IoHome, IoPerson, IoSwapHorizontal, IoWallet } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const ExchangeFooter = () => {
  const activeStyle = {
    color: "red",
  };

  const linkStyle = {
    fontSize: "30px",
  };

  return (
    <div className="sticky w-full  bottom-0 p-4 bg-base-100 z-40 flex md:hidden items-base justify-evenly">
      <div className="w-full flex text-dark justify-between px-4 ">
        <NavLink
          to="/trade-Home"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <IoHome style={{ fontSize: "30px" }} />
        </NavLink>
        <NavLink
          to="/wallet"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <IoWallet style={{ fontSize: "30px" }} />
        </NavLink>
        <NavLink
          to="/exchange"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <IoSwapHorizontal style={{ fontSize: "30px" }} />
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          <IoPerson style={{ fontSize: "30px" }} />
        </NavLink>
      </div>
    </div>
  );
};

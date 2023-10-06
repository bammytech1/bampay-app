import { HashLink as Link } from "react-router-hash-link";
import {
  IoMenu,
  IoClose,
  IoNotificationsOutline,
  //   IoNotificationsSharp,
} from "react-icons/io5";
import { useState } from "react";

function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="w-full  md:bg-neutral flex items-center justify-center ">
        <nav className="w-full container max-w-7xl  bg-neutral text-primary m-4 md:m-0 p-4 rounded-2xl md:rounded-none ">
          <div className="flex items-center w-full justify-around">
            <div className="md:hidden" onClick={() => setMenu(!menu)}>
              {menu ? <IoClose size={"25px"} /> : <IoMenu size={"25px"} />}
            </div>

            <div>Logo</div>
            <ul className="hidden md:flex justify-between items-center gap-4">
              <Link to={"#"}>Company</Link>
              <Link to={"#"}>Resourses</Link>
              <Link to={"#"}>blogs</Link>
              <Link to={"#"}>Prices</Link>
              <Link to={"#"}>FAQs</Link>
              <Link
                to="#"
                className="btn btn-success rounded-3xl text-neutral hidden md:flex"
                type="button"
              >
                Buy Crypto
              </Link>
            </ul>
            <input type="checkbox" className="toggle toggle-lg" />
            <IoNotificationsOutline size={"30px"} className="md:hidden" />
          </div>
        </nav>

        {/* mobile */}
        <div
          className={`md:hidden z-50 absolute top-20 left-0 bg-base-100 h-screen w-screen p-10 ${
            menu ? "left-0" : "left-[-100%]"
          }`}
        >
          <ul className=" flex flex-col justify-between items-center gap-10">
            <Link to={"#"}>Company</Link>
            <Link to={"#"}>Resourses</Link>
            <Link to={"#"}>blogs</Link>
            <Link to={"#"}>Prices</Link>
            <Link to={"#"}>FAQs</Link>
            <Link
              to="#"
              className="btn btn-success rounded-3xl text-neutral"
              type="button"
            >
              Buy Crypto
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;

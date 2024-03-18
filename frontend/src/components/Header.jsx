import { HashLink as Link } from "react-router-hash-link";
import {
  IoMenu,
  IoClose,
  IoNotificationsOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { themeChange } from "theme-change";
import { useEffect, useRef, useState } from "react";
import { RESET_AUTH, logout } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowOnLogin, { ShowOnLogout } from "./hiddenLink/hiddenLink";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("Light");
    }
  };

  useEffect(() => {
    if (menu) {
      // Apply the classes to disable scrolling and blur the background
      document.body.classList.add("no-scroll");
    } else {
      // Remove the classes when the menu is closed
      document.body.classList.remove("no-scroll");
    }
  }, [menu]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenu(false);
        // setOpen(false);
        // setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <header
        // id="main-content"
        ref={dropdownRef}
        className="w-full h-fit z-50  md:bg-neutral flex items-center justify-center sticky top-0 "
      >
        <nav className="w-full container  max-w-7xl  bg-neutral text-base-300  md:m-0 p-4  md:rounded-none ">
          <div className="flex  items-center w-full justify-around">
            <div className="md:hidden z-30" onClick={() => setMenu(!menu)}>
              {menu ? <IoClose size={"25px"} /> : <IoMenu size={"25px"} />}
            </div>

            <div className="z-30">Logo</div>
            <ShowOnLogout>
              <ul className="hidden md:flex justify-between items-center gap-4">
                <Link to={"#"}>Company</Link>
                <Link to={"#"}>Resourses</Link>
                <Link to={"#"}>blogs</Link>
                <Link to={"#"}>Prices</Link>
                <Link to={"#"}>FAQs</Link>
              </ul>
            </ShowOnLogout>
            <ShowOnLogin>
              <ul className="hidden w-full max-w-lg md:flex justify-between items-center gap-4">
                <Link to={"#"} className="text-lg">
                  Exchange
                </Link>
                <Link to={"#"} className="text-lg">
                  Wallet
                </Link>
                <Link to={"#"} className="text-lg">
                  Send
                </Link>
                <Link to={"#"} className="text-lg">
                  Receive
                </Link>
              </ul>
            </ShowOnLogin>
            <input
              type="checkbox"
              // checked
              data-toggle-theme="dark,light"
              data-act-class="ACTIVECLASS"
              className="toggle toggle-lg"
              onClick={handleToggle}
            />
            <div className="hidden md:block">
              <ShowOnLogin>
                <div className="flex-none gap-2">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <IoPersonCircleOutline size={"40px"} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link to={"/profile"} className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/settings"} className="justify-between">
                          Settings
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li onClick={logoutUser}>
                        <a>Logout</a>
                      </li>
                      <li>
                        <IoNotificationsOutline size={"40px"} />
                      </li>
                    </ul>
                  </div>
                </div>
              </ShowOnLogin>
            </div>
            <ShowOnLogout>
              <Link
                to="/login"
                className="btn btn-success rounded-3xl text-neutral hidden md:flex"
                type="button"
              >
                Buy Crypto
              </Link>
            </ShowOnLogout>
          </div>
        </nav>

        {/* mobile */}
        <div
          className={`md:hidden z-20 absolute  top-0 left-0 bg-base-100 h-screen w-full p-10 ${
            menu ? "left-0" : "left-[-100%]"
          }`}
        >
          <div className="absolute right-10 top-2">
            <ShowOnLogin>
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <IoPersonCircleOutline size={"40px"} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to={"/profile"} className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={"/settings"} className="justify-between">
                        Settings
                      </Link>
                    </li>
                    <li onClick={logoutUser}>
                      <a>Logout</a>
                    </li>
                    <li>
                      <IoNotificationsOutline size={"40px"} />
                    </li>
                  </ul>
                </div>
              </div>
            </ShowOnLogin>
          </div>
          <ShowOnLogout>
            <ul className=" flex flex-col py-36 text-base justify-between items-center gap-10">
              <Link to={"#"}>Company</Link>
              <Link to={"#"}>Resourses</Link>
              <Link to={"#"}>blogs</Link>
              <Link to={"#"}>Prices</Link>
              <Link to={"#"}>FAQs</Link>
              <Link
                to="/login"
                className="btn btn-success rounded-3xl text-neutral"
                type="button"
              >
                Buy Crypto
              </Link>
            </ul>
          </ShowOnLogout>
          <ShowOnLogin>
            <ul className=" flex flex-col py-36 text-base justify-between items-center gap-10">
              <Link to={"#"}>Exchange</Link>
              <Link to={"#"}>Wallet</Link>
              <Link to={"#"}>Send</Link>
              <Link to={"#"}>Receive</Link>
            </ul>
          </ShowOnLogin>
        </div>
      </header>
    </>
  );
}

export default Header;

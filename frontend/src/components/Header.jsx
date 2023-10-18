import { HashLink as Link } from "react-router-hash-link";
import {
  IoMenu,
  IoClose,
  IoNotificationsOutline,
  IoPersonCircleOutline,
  //   IoNotificationsSharp,
} from "react-icons/io5";
import { themeChange } from "theme-change";
import { useEffect, useState } from "react";

function Header() {
  const [menu, setMenu] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("Light");
    }
  };

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
      <header className="w-full fixed z-50  md:bg-neutral flex items-center justify-center ">
        <nav className="w-full container max-w-7xl  bg-neutral text-base-300 m-4 md:m-0 p-4 rounded-2xl md:rounded-none ">
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
            </ul>
            {/* <button
              className="toggle toggle-lg"
              data-toggle-theme="dark,light"
              data-act-class="ACTIVECLASS"
            ></button> */}
            <input
              type="checkbox"
              // checked
              data-toggle-theme="dark,light"
              data-act-class="ACTIVECLASS"
              className="toggle toggle-lg"
              onClick={handleToggle}
            />
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <IoPersonCircleOutline size={"40px"} />
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                  <li>
                    <IoNotificationsOutline size={"40px"} />
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to="#"
              className="btn btn-success rounded-3xl text-neutral hidden md:flex"
              type="button"
            >
              Buy Crypto
            </Link>
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

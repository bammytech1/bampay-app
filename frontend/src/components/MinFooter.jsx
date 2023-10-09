import { Link } from "react-router-dom";

function MinFooter() {
  return (
    <>
      <footer className="footer place-items-center mb-4  text-accent">
        <nav className="footer container max-w-7xl place-items-center">
          <ul className=" flex justify-center gap-4 items-center">
            <li>
              <Link to={"/"} className="link link-hover hover:text-success">
                License
              </Link>
            </li>
            <li>
              <Link to={"/"} className="link link-hover hover:text-success">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to={"/"} className="link link-hover hover:text-success">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default MinFooter;

import { motion } from "framer-motion";
import image from "../assets/loginnn.svg";
import { Link } from "react-router-dom";
import MinFooter from "../components/MinFooter";
const Login = () => {
  return (
    <>
      <section className=" mb-6 bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px] mt-32  ">
        <div className="container  w-full max-w-7xl  ">
          <div className="place-content-center gap-1  grid md:grid-cols-2 mt-4">
            <motion.picture
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
              className="!hidden md:!flex md:flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
            >
              <img className="" src={image} alt="wallet icon" />
            </motion.picture>
            <div className="flex  items-center justify-center">
              <div className="flex h-fit  w-full flex-col items-center justify-center rounded-3xl gap-4  py-6">
                <form className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center">
                  <p className="text-base-300 text-center text-2xl max-w-xs">
                    Sign in or create an account
                  </p>
                  <div className="group relative">
                    <input
                      type="email"
                      id="email"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      Email
                    </label>
                  </div>

                  <div className="group relative">
                    <input
                      type="text"
                      id="password"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      Password
                    </label>
                  </div>

                  <button className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none">
                    Login
                  </button>
                  <Link
                    to={"/register"}
                    className="w-full rounded-3xl text-neutral transition-all btn btn-success hover:btn-neutral"
                  >
                    Create Account
                  </Link>

                  <p className="inline-flex !w-auto justify-center font-medium text-primary">
                    Forgot password?
                    <span className="ml-2">
                      <Link to={"/"} className="text-success">
                        Get it here
                      </Link>
                    </span>
                  </p>
                </form>

                <Link
                  to={"/verifyPhone"}
                  className=" btn-secondary border-white-500 group m-auto   inline-flex h-12 w-[320px] items-center justify-center space-x-2 rounded-3xl border px-4 py-2 transition-colors duration-300 hover:border-blue-500 hover:btn-secondary focus:outline-none"
                >
                  Go Anonymously
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
};

export default Login;

import { motion } from "framer-motion";
import image from "../assets/loginimage.svg";
import { Link } from "react-router-dom";
import MinFooter from "../components/MinFooter";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
const Register = () => {
  const [phone, setPhone] = useState("");
  return (
    <>
      <section className=" mb-6 bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  mt-24">
        <div className="container  w-full max-w-7xl  ">
          <div className="place-content-center gap-1  grid md:grid-cols-2 mt-4">
            <motion.picture
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
              className="!hidden md:!flex flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
            >
              <img className="" src={image} alt="wallet icon" />
            </motion.picture>
            <div className="flex  items-center justify-center">
              <div className="flex h-fit  w-full flex-col items-center justify-center rounded-3xl   py-6">
                <form className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center">
                  <p className="text-base-300 text-center text-2xl max-w-xs">
                    create an account
                  </p>
                  <div className="group relative">
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      FirstName
                    </label>
                  </div>
                  <div className="group relative">
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      LastName
                    </label>
                  </div>
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
                  <PhoneInput
                    defaultCountry="ng"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    className="phone-container"
                  />

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
                  <button className="w-full rounded-3xl text-neutral transition-all btn btn-success hover:btn-neutral">
                    Create Account
                  </button>

                  <p className="inline-flex !w-auto justify-center font-medium text-primary">
                    Have an account already?
                    <span className="ml-2">
                      <Link to={"/login"} className="text-success">
                        Login
                      </Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
};

export default Register;

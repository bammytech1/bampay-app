import { motion } from "framer-motion";
import image from "../assets/loginimage.svg";
import verify from "../assets/autenticate icon.svg";
import { Link } from "react-router-dom";
import MinFooter from "../components/MinFooter";
const VerifyPhone = () => {
  return (
    <>
      <section className=" mb-6 bg-primary w-full h-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  ">
        <div className="container   w-full  max-w-7xl  ">
          <div className="place-item-center gap-1  grid md:grid-cols-2 mt-4">
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
            <div className="flex  place-items-center  items-center justify-center">
              <div className="flex   w-full flex-col items-center justify-center rounded-3xl gap-6  shadow py-6">
                <form className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center">
                  <p className="text-primary text-center text-2xl max-w-xs">
                    Set up 2-step <br /> verification
                  </p>
                  <picture className="flex items-center justify-center">
                    <img src={verify} alt="" />
                  </picture>
                  <div className="group relative">
                    <input
                      type="tel"
                      id="country"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="country"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      Country
                    </label>
                  </div>
                  <div className="group relative">
                    <input
                      type="tel"
                      id="country"
                      required
                      className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline"
                    />
                    <label
                      htmlFor="country"
                      className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-success peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                    >
                      Phone number
                    </label>
                  </div>

                  <p>
                    You will receive a verification code when you sign in on a
                    new device.
                  </p>
                  <Link
                    to={"/"}
                    className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none"
                  >
                    send code
                  </Link>
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

export default VerifyPhone;

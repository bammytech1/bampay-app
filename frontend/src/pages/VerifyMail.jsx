import { motion } from "framer-motion";
import image from "../assets/loginnn.svg";
import mail from "../assets/mail icon.svg";
import { Link } from "react-router-dom";
import MinFooter from "../components/MinFooter";
const VerifyMail = () => {
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
                <div className="bg-base-100 w-full  max-w-sm flex-col items-center justify-center place-items-center rounded-3xl   shadow  space-y-8 p-10 text-center">
                  <p className="text-primary text-center text-2xl max-w-xs">
                    Verify your <br /> email
                  </p>
                  <picture className="flex items-center justify-center">
                    <img src={mail} alt="" />
                  </picture>
                  <p>
                    We sent a verification email to bayodegbenga@icloud.com.
                    Click the link inside to get started!
                  </p>
                  <p className="inline-flex !w-auto justify-center font-medium text-primary">
                    New link?
                    <span className="ml-2">
                      <Link
                        to={"/"}
                        className="text-success hover:text-warning"
                      >
                        Resend
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
};

export default VerifyMail;

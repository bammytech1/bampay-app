import { motion } from "framer-motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import image from "../assets/loginnn.svg";
import verify from "../assets/autenticate icon.svg";
import { Link } from "react-router-dom";
import MinFooter from "../components/MinFooter";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import "../index.css";

import { useState } from "react";
const VerifyPhone = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className=" mb-6 bg-primary w-full h-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  ">
        <div className="container   w-full  max-w-7xl  ">
          <div className="relative place-item-center gap-1  grid md:grid-cols-2 mt-4">
            <Link
              to={"/login"}
              className="text-neutral absolute -top-8 left-1/2 -translate-x-1/2 md:top-0 md:left-10"
            >
              <IoArrowBackCircleSharp size={"40px"} />
            </Link>
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
              <div className="flex   w-full flex-col items-center justify-center rounded-3xl gap-6  py-6">
                <form className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center">
                  <p className="text-primary text-center text-2xl max-w-xs">
                    Set up 2-step <br /> verification
                  </p>
                  <picture className="flex items-center justify-center">
                    <img src={verify} alt="" />
                  </picture>
                  {!loading ? (
                    <div className="group relative flex flex-col gap-4">
                      <PhoneInput
                        defaultCountry="ng"
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        className="phone-container"
                      />
                      <p>
                        You will receive a verification code when you sign in on
                        a new device.
                      </p>
                      <Link
                        onClick={() => setLoading(!loading)}
                        className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none"
                      >
                        {" "}
                        {loading && (
                          <CgSpinner size={"20px"} className="animate-spin" />
                        )}
                        <span>send code</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="group flex flex-col gap-4">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        renderInput={(props) => <input {...props} />}
                        containerStyle={"otp-container"}
                      />
                      <p>
                        A Six degit code has been sent to phone number provided.
                      </p>
                      <Link
                        to={"/trade"}
                        onClick={() => setLoading(!loading)}
                        className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none"
                      >
                        {" "}
                        {loading || (
                          <CgSpinner size={"20px"} className="animate-spin" />
                        )}
                        <span>verify code</span>
                      </Link>
                    </div>
                  )}
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

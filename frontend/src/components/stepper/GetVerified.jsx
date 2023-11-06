// import { motion } from "framer-motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFormData, nextStep, prevStep } from "../../redux/stepperSlice";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const GetVerified = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));
    dispatch(nextStep());
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 w-full max-w-sm m-auto flex-col  space-y-8 p-10 text-center"
      >
        <p className="text-primary text-center text-2xl max-w-xs">
          Verify Phone
        </p>
        {!loading ? (
          <div className="group relative flex flex-col gap-4">
            <div className="flex items-center">
              <PhoneInput
                defaultCountry="ng"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className="phone-container relative "
                required
              />
              <Link
                onClick={() => setLoading(!loading)}
                className=" absolute right-1 top-3 m-auto   rounded-3xl text-white  btn btn-primary hover:btn-primary "
              >
                {" "}
                {loading ? (
                  <CgSpinner size={"20px"} className="animate-spin" />
                ) : (
                  <span className="text-xs">send code</span>
                )}
              </Link>
            </div>

            <p className="text-sm">
              You will receive a verification code when you sign in on a new
              device.
            </p>
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
            <p>A Six degit code has been sent to phone number provided.</p>
            <button type="submit">Verify Code</button>
          </div>
        )}
        <button
          type="button"
          onClick={handlePrev}
          className="  text-neutral absolute top-0 left-2 md:top-10 md:left-10"
        >
          <IoArrowBackCircleSharp size={"40px"} />
        </button>
      </form>
    </>
  );
};

export default GetVerified;

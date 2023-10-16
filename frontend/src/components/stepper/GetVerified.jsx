// import { motion } from "framer-motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
const GetVerified = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="bg-base-100 w-full max-w-sm m-auto flex-col rounded-3xl   shadow  space-y-8 p-10 text-center">
        <p className="text-primary text-center text-2xl max-w-xs">
          Verify Phone
        </p>
        {!loading ? (
          <div className="group relative flex flex-col gap-4">
            <PhoneInput
              defaultCountry="ng"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              className="phone-container"
            />
            <p className="text-sm">
              You will receive a verification code when you sign in on a new
              device.
            </p>
            <Link
              onClick={() => setLoading(!loading)}
              className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none"
            >
              {" "}
              {loading && <CgSpinner size={"20px"} className="animate-spin" />}
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
            <p>A Six degit code has been sent to phone number provided.</p>
            <Link
              to={"/trade"}
              onClick={() => setLoading(!loading)}
              className="w-full rounded-3xl text-white transition-all btn btn-primary hover:btn-neutral focus:outline-none"
            >
              {" "}
              {loading || <CgSpinner size={"20px"} className="animate-spin" />}
              <span>verify code</span>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default GetVerified;

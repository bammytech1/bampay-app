import { motion } from "framer-motion";
import { IoCopy, IoTime } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep } from "../../redux/stepperSlice";
import { shortenMiddle } from "../../utils";
import Countdown from "../extras/Countdown";
import { useState } from "react";

function Processing() {
  //to be removed
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));
    dispatch(nextStep());
  };

  const [timeLeft, setTimeLeft] = useState({});
  const getData = useSelector((state) => state.step);
  const selectedGiftCard = useSelector((state) => state.step.selectedGiftCard);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Callback function to update the timeLeft state
  const handleTimeUpdate = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-2"
      >
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: {getData.id}
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(getData.id)}
            className="text-primary"
          >
            <IoCopy />
          </motion.span>
        </p>
        <ul className=" flex flex-col text-neutral items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            {getData.formData.giftType} :{" "}
            <span className="font-bold">
              {getData.formData.spend} {getData.formData.currency}
            </span>
          </li>
          <li>
            You Receive:{" "}
            <span className="font-bold">
              {getData.formData.receive} {getData.formData.paymentOption}
            </span>
          </li>
          <li>
            Pay To:{" "}
            {getData.formData.paymentOption === "USDT" ? (
              <span className="font-bold">
                {shortenMiddle(getData.formData.usdtAddress, 10, 10)}
              </span>
            ) : (
              <span className="font-bold">Fiat Wallet</span>
            )}
          </li>
        </ul>
        <div className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-center gap-4 rounded-3xl w-full p-4">
            <p className="text-center">
              Please wait while we process your card{" "}
            </p>
            <Countdown
              waitTime={selectedGiftCard.waitTime}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* <IoTime size={"180px"} className="text-primary" /> */}
          </div>
          <p className="text-center">
            Please wait while we process your Transaction. This takes
            approximately{" "}
            <span className="text-primary">
              {timeLeft.minutes !== undefined
                ? `${timeLeft.minutes}m ${timeLeft.seconds}s`
                : `${selectedGiftCard.waitTime}min`}
            </span>{" "}
            <br />
            sit back and relax
          </p>
          {/* <button
            type="submit"
            className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
          >
            Proceed
          </button> */}
        </div>
      </form>
    </>
  );
}

export default Processing;

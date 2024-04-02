import { motion } from "framer-motion";
import { IoCopy, IoTime } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../redux/stepperSlice";
import { shortenMiddle } from "../../utils";
import Countdown from "../extras/Countdown";
import { useEffect, useState } from "react";
import { fetchTradeStatus } from "../../redux/features/trade/tradeSlice";

function Processing() {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({});
  const getData = useSelector((state) => state.step);
  const selectedGiftCard = useSelector((state) => state.step.selectedGiftCard);
  const { tradeMongoId, setTradeMongoId, tradeStatus } = useSelector(
    (state) => state.step
  );
  console.log("setTradeMongoId", setTradeMongoId);
  console.log("tradeMongoId:", tradeMongoId);
  console.log("tradeStatus:", tradeStatus);

  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const pollStatus = () => {
      if (polling && tradeMongoId) {
        dispatch(fetchTradeStatus(tradeMongoId));
      }
    };

    // If tradeMongoId is available, start polling
    if (tradeMongoId) {
      const intervalId = setInterval(pollStatus, 5000); // Poll every 5 seconds
      return () => clearInterval(intervalId); // Cleanup
    }
  }, [dispatch, tradeMongoId, polling]); // Make sure to include tradeMongoId in the dependency array

  useEffect(() => {
    if (tradeStatus === "success" || tradeStatus === "decline") {
      setPolling(false);
      dispatch(nextStep());
    }
  }, [tradeStatus, dispatch]);

  const checkStatus = () => {
    if (tradeMongoId) {
      dispatch(fetchTradeStatus(tradeMongoId));
      console.log("checkStatus:", tradeMongoId);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Callback function to update the timeLeft state
  const handleTimeUpdate = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };
  return (
    <>
      <div className="flex flex-col items-center w-full px-2">
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
              waitTime={selectedGiftCard?.waitTime}
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
                : `${selectedGiftCard?.waitTime}min`}
            </span>{" "}
            <br />
            sit back and relax
          </p>
          {timeLeft.minutes === 0 && (
            <button
              type="button"
              className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
            >
              Ping Support
            </button>
          )}
          <button onClick={checkStatus}>Check Trade Status</button>
        </div>
      </div>
    </>
  );
}

export default Processing;

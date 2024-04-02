import { ExchangeFooter } from "../components/ExchangeFooter";
// import { Trading } from "../components/stepper/Trading";
import { motion } from "framer-motion";
import tradeImage from "../assets/digitalcurrency.svg";
import {
  IoCloudUploadOutline,
  IoCardOutline,
  IoDocumentTextOutline,
  IoStopwatchOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Exchange = () => {
  const { step, totalSteps } = useSelector((state) => state.step);

  return (
    <section className="flex flex-col items-center h-screen  ">
      <h3 className="my-6 text-dark text-center text-[20px] md:text-3xl  font-medium">
        Exchange
      </h3>
      <div className="relative overflow-hidden  h-full bg-primary w-full flex justify-center items-center  px-6  rounded-t-[50px] md:rounded-[100px]  ">
        <div className="container  w-full max-w-7xl  grid md:grid-cols-2 place-items-center ">
          <motion.picture
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="!hidden md:!flex flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
          >
            <img className="" src={tradeImage} alt="wallet icon" />
          </motion.picture>
          <div className="place-content-center gap- ">
            <div className="flex  items-center justify-center    mt-10 md:mt-0">
              <section
                action=""
                className="flex flex-col items-center w-full max-w-sm"
              >
                <div className=" relative flex justify-between items-center gap-4 my-2">
                  <div className="z-10 flex justify-between items-center gap-4">
                    <div className="flex flex-col items-center gap-2 ">
                      <span
                        className={`border  p-2 rounded-full  ${
                          step >= 1
                            ? "bg-base-100 border-base-100"
                            : "bg-primary border-base-300"
                        }`}
                      >
                        <IoDocumentTextOutline size={"30px"} />
                      </span>
                      <p
                        className={`text-xs ${
                          step >= 1 ? "text-base-100" : "text-base-300"
                        }`}
                      >
                        Start
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`border  p-2 rounded-full  ${
                          step >= 2
                            ? "bg-base-100 border-base-100"
                            : "bg-primary border-base-300"
                        }`}
                      >
                        <IoCardOutline size={"30px"} />
                      </span>
                      <p
                        className={`text-xs ${
                          step >= 2 ? "text-base-100" : "text-base-300"
                        }`}
                      >
                        Card
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`border  p-2 rounded-full  ${
                          step >= 3
                            ? "bg-base-100 border-base-100"
                            : "bg-primary border-base-300"
                        }`}
                      >
                        <IoCloudUploadOutline size={"30px"} />
                      </span>
                      <p
                        className={`text-xs ${
                          step >= 3 ? "text-base-100" : "text-base-300"
                        }`}
                      >
                        Images
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`border  p-2 rounded-full  ${
                          step >= 4
                            ? "bg-base-100 border-base-100"
                            : "bg-primary border-base-300"
                        }`}
                      >
                        <IoStopwatchOutline size={"30px"} />
                      </span>
                      <p
                        className={`text-xs ${
                          step >= 4 ? "text-base-100" : "text-base-300"
                        }`}
                      >
                        Process
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`border  p-2 rounded-full  ${
                          step >= 5
                            ? "bg-base-100 border-base-100"
                            : "bg-primary border-base-300"
                        }`}
                      >
                        <IoCheckmarkOutline size={"30px"} />
                      </span>
                      <p
                        className={`text-xs ${
                          step >= 5 ? "text-base-100" : "text-base-300"
                        }`}
                      >
                        Finish
                      </p>
                    </div>
                  </div>
                  {[...Array(totalSteps)].map((e, i) => (
                    <progress
                      key={i}
                      max="5"
                      value={step}
                      className="absolute  top-6 h-2 w-full overflow-hidden rounded  bg-base-300 [&::-webkit-progress-bar]:bg-base-300 [&::-webkit-progress-value]:bg-base-100  [&::-moz-progress-bar]:bg-base-100"
                    ></progress>
                  ))}
                </div>

                <section className=" place-self-center h-fit max-w-lg flex flex-col items-center gap-2 py-10 bg-base-100  rounded-3xl ">
                  <div className="w-full    flex flex-col gap-2 items-center">
                    <Outlet />
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
      <ExchangeFooter />
    </section>
  );
};

export default Exchange;

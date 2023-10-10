import { motion } from "framer-motion";
import tradeImage from "../assets/digitalcurrency.svg";
import MinFooter from "../components/MinFooter";
import { Trading } from "../components/stepper/Trading";
import {
  IoArrowBackCircleSharp,
  IoCloudUploadOutline,
  IoMailOpenOutline,
  IoCardOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

function Trade() {
  return (
    <>
      <section className="mb-6  bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px] mt-32  ">
        <div className="relative container flex flex-col gap-6   w-full max-w-7xl md:py-8 ">
          <Link
            to={""}
            className="text-neutral absolute top-0 left-2 md:top-0 md:left-10"
          >
            <IoArrowBackCircleSharp size={"40px"} />
          </Link>
          <h2 className="text-center text-xl font-bold text-neutral">
            Exchange
          </h2>
          <div className="place-content-center gap-1  grid md:grid-cols-2 ">
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
            <div className="flex justify-center items-center gap-4 my-2">
              <div className="flex flex-col items-center gap-2 ">
                <span className="border border-base-300 p-2 rounded-full ">
                  <IoDocumentTextOutline size={"40px"} />
                </span>
                <p>Fill Details</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="border border-base-300 p-2 rounded-full">
                  <IoCardOutline size={"40px"} />
                </span>
                <p>Card Details</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="border border-base-300 p-2 rounded-full">
                  <IoMailOpenOutline size={"40px"} />
                </span>
                <p>Verification</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="border border-base-300 p-2 rounded-full">
                  <IoCloudUploadOutline size={"40px"} />
                </span>
                <p>Upload Image</p>
              </div>
            </div>
            <Trading />
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
}

export default Trade;

import { motion } from "framer-motion";
import { IoCheckmarkOutline, IoCopy } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SuccessPage() {
  const getData = useSelector((state) => state.step);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <section className="flex flex-col items-center w-full px-2">
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
        <ul className=" flex flex-col text-neutral text-sm md:text-base items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            Vanilla Visa : <span>${getData.formData.spend}</span>
          </li>
          <li>
            You Receive: <span>${getData.formData.receive}</span>
          </li>
          <li>
            USDT Address: <span>{getData.formData.usdt}</span>
          </li>
        </ul>
        <div className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-center gap-4 rounded-3xl w-full p-4">
            <h3 className="text-xl font-bold">Trade Successful!</h3>
            <p className="text-center">
              ${getData.formData.receive} Successfully sent to
              {getData.formData.usdt}
            </p>

            <span className="bg-primary rounded-full">
              <IoCheckmarkOutline size={"180px"} className="text-neutral" />
            </span>
            <p className="text-center text-sm">
              it may take some minute to show in your wallet
            </p>
            <p className="text-center text-sm">
              Have any complains?{" "}
              <Link to={"contact"} className="text-red-700">
                here
              </Link>{" "}
            </p>
          </div>
          {/* <div>image will preview here</div> */}
        </div>
      </section>
    </>
  );
}

export default SuccessPage;

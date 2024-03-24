import { ExchangeFooter } from "../components/ExchangeFooter";
import { Trading } from "../components/stepper/Trading";
import { motion } from "framer-motion";
import tradeImage from "../assets/digitalcurrency.svg";

const Exchange = () => {
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
              <Trading />
            </div>
          </div>
        </div>
      </div>
      <ExchangeFooter />
    </section>
  );
};

export default Exchange;

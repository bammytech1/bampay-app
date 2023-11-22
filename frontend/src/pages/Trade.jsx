import { motion } from "framer-motion";
import tradeImage from "../assets/digitalcurrency.svg";
import MinFooter from "../components/MinFooter";
import { Trading } from "../components/stepper/Trading";

function Trade() {
  return (
    <>
      <section className="mb-6  bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px] mt-24  ">
        <div className="relative container flex flex-col gap-6   w-full max-w-7xl md:py-8 ">
          <h2 className="text-center text-xl font-bold text-neutral md:text-5xl">
            Exchange
          </h2>
          <div className="place-items-center  gap-1 space  grid md:grid-cols-2 mt-6">
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
            <div className=" flex  max-w-md p-4 flex-col items-center justify-center">
              <Trading />
            </div>
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
}

export default Trade;

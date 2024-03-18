import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ExchangeFooter } from "../components/ExchangeFooter";

const SendCrypto = () => {
  return (
    <section className="flex flex-col items-center h-screen  ">
      <h3 className="my-6 text-dark text-center text-[20px] md:text-3xl  font-medium">
        Send
      </h3>
      <div className="relative h-full bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px]  ">
        <Link to={"/"} className="absolute left-6 top-10 md:left-72">
          <IoArrowBack style={{ fontSize: "30px" }} />
        </Link>
        <div className="container  w-full max-w-7xl  ">
          <div className="place-content-center gap-1  ">
            <div className="flex  items-center justify-center"></div>
          </div>
        </div>
      </div>
      <ExchangeFooter />
    </section>
  );
};

export default SendCrypto;

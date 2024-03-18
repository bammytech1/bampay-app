import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ExchangeFooter } from "../components/ExchangeFooter";
import FiatWallet from "../components/wallets/FiatWallet";

const Wallet = () => {
  return (
    <section className="relative flex flex-col items-center h-screen bg-base-100  ">
      {/* <Link to={"/"} className="absolute left-6 top-8 md:left-72">
        <IoArrowBack style={{ fontSize: "30px" }} />
      </Link> */}
      <h3 className="my-6 text-dark text-center text-[20px] md:text-3xl  font-medium">
        Wallet
      </h3>
      <div role="tablist" className="tabs tabs-bordered ">
        <a role="tab" id="1" className="tab-active tab text-lg">
          Fiat
        </a>
        <a role="tab" className="tab  text-lg">
          Crypto
        </a>
      </div>
      <div className=" h-full  w-full flex justify-center items-start py-8   rounded-t-[50px] md:rounded-[100px]  ">
        <FiatWallet />
      </div>
      <ExchangeFooter />
    </section>
  );
};

export default Wallet;

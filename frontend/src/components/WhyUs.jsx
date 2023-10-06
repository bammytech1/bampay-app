import third from "../assets/undraw1.svg";
import second from "../assets/undraw2.svg";
import first from "../assets/undraw3.svg";

export const WhyUs = () => {
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center   ">
        <h2 className="text-center text-2xl md:text-5xl font-bold ">
          Why Bamcoins?
        </h2>
        <p className="text-center text-base max-w-xs ">
          We designed it to be simple, secure and also protect our clients
          Privacy.
        </p>
        <div className="  bg-primary w-full flex flex-col justify-center items-center rounded-3xl md:rounded-[100px] ">
          <div className="w-full container max-w-7xl bg-primary  py-7 px-7 flex flex-col items-center gap-8 md:flex-row  ">
            <div className="flex flex-col items-center gap-3">
              <img src={first} alt="Business deal" />
              <h3 className="text-center text-xl text-neutral font-bold  ">
                Simplicity
              </h3>
              <p className="text-center  text-neutral ">
                Bamcoins makes it easy to buy and sell Crypto in just a minute.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <img src={second} alt="Business deal" />
              <h3 className="text-center text-xl text-neutral font-bold ">
                Worldwide Access
              </h3>
              <p className="text-center  text-neutral">
                Buy Crypto from more than 50 countries worldwide
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <img src={third} alt="Business deal" />
              <h3 className="text-center text-xl text-neutral font-bold ">
                Instant Payouts
              </h3>
              <p className="text-center  text-neutral">
                Receive your Crypto as soon as you make the payment
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

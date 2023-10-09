import tether from "../assets/tether-(usdt).png";
import card from "../assets/card-pos.png";
import { useState } from "react";
export const Advantages = () => {
  const [show, setShow] = useState(false);
  //   function handleClick() {
  //     setShow(!show);
  //   }
  return (
    <>
      <div className="w-full flex flex-col items-center bg-primary gap-4 py-5 px-8 rounded-3xl md:rounded-[100px]">
        <h2 className="text-center text-2xl md:text-5xl font-bold text-base-100 ">
          Advantages
        </h2>
        <div className="  container grid  place-items-center md:grid-cols-2 gap-4 max-w-3xl bg-primary rounded-3xl md:p-20 ">
          <div className="max-w-xs flex flex-col items-start  p-6  rounded-3xl bg-neutral">
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={tether} alt="tether icon" />
          </div>
          <div className="flex flex-col items-start p-6 max-w-xs rounded-3xl bg-neutral">
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={tether} alt="tether icon" />
          </div>
          <div className="flex flex-col items-start p-6 max-w-xs rounded-3xl bg-neutral">
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={card} alt="tether icon" />
          </div>
          <div
            className={`flex flex-col items-start p-6 max-w-xs rounded-3xl bg-neutral  ${
              show ? "hidden" : "block"
            }`}
          >
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={tether} alt="tether icon" />
          </div>
          <div
            className={`flex flex-col items-start p-6 max-w-xs rounded-3xl bg-neutral  ${
              show ? "hidden" : "block"
            }`}
          >
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={tether} alt="tether icon" />
          </div>
          <div
            className={`flex flex-col items-start p-6 max-w-xs rounded-3xl bg-neutral  ${
              show ? "hidden" : "block"
            }`}
          >
            <h3 className="text-left text-base max-w-[250px]">
              USDT is a stable coin with a socially useful company behind it
            </h3>
            <img className="" src={tether} alt="tether icon" />
          </div>
          <button
            onClick={() => setShow(!show)}
            className="btn btn-circle btn-success md:hidden text-xl text-neutral "
          >
            {show ? "+" : "-"}
          </button>
        </div>
      </div>
    </>
  );
};

import React from "react";
import { IoRefresh } from "react-icons/io5";

const FiatWallet = () => {
  return (
    <div className="  w-full max-w-7xl bg-primary rounded-t-[50px] ">
      <div className=" ">
        <div className="flex flex-col  items-center justify-center gap-4 py-10">
          <p>Balance</p>
          <IoRefresh style={{ fontSize: "25px" }} />
          <h3 className="text-3xl font-bold md:text-5xl">0.00 NGN</h3>
          <button className="btn btn-secondary rounded-3xl text-base-300">
            Withdraw
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 bg-base-100 w-full h-fit py-24 ">
          <div className="flex items-center gap-4">
            <p>Activities</p>
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow w-40 "
                placeholder="All Transaction"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <p className="text-center">
            You have no transaction yet <br /> start with something
          </p>
          <button className="btn btn-primary rounded-3xl">Sell GiftCard</button>
        </div>
      </div>
    </div>
  );
};

export default FiatWallet;

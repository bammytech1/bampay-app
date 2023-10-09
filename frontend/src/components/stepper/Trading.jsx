import { useState, useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { IoRepeat } from "react-icons/io5";
import visa from "../../assets/Visa_icon.png";
import master from "../../assets/Mastercard-icon.png";

export const Trading = () => {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <>
      <div className=" place-self-center h-fit max-w-lg flex flex-col items-center gap-2 py-10 bg-base-300  rounded-3xl ">
        <div
          className="w-full  flex flex-col items-center"
          aria-multiselectable="false"
        >
          <ul
            className="flex items-center gap-2"
            role="tablist"
            ref={wrapperRef}
          >
            <li className="" role="presentation">
              <button
                className={`btn btn-accent text-neutral  rounded-3xl px-7 ${
                  tabSelected.currentTab === 1
                    ? "btn-success bordered border-neutral text-white hover:btn-neutral focus:btn-primary disabled:bg-emerald-300"
                    : "w-full justify-self-center "
                }`}
                id="tab-label-1e"
                role="tab"
                aria-setsize="2"
                aria-posinset="1"
                tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                aria-controls="tab-panel-1e"
                aria-selected={`${
                  tabSelected.currentTab === 1 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 1 })
                }
              >
                <span>Buy</span>
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`btn  btn-accent text-neutral rounded-3xl px-7 ${
                  tabSelected.currentTab === 2
                    ? "btn-success bordered border-neutral text-white hover:btn-neutral focus:btn-primary disabled:bg-emerald-300"
                    : "w-full justify-self-center"
                }`}
                id="tab-label-2e"
                role="tab"
                aria-setsize="2"
                aria-posinset="2"
                tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                aria-controls="tab-panel-2e"
                aria-selected={`${
                  tabSelected.currentTab === 2 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 2 })
                }
              >
                <span>Sell</span>
              </button>
            </li>
          </ul>
          <div className="">
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 1 ? "" : "hidden"
              }`}
              id="tab-panel-1e"
              aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
              role="tabpanel"
              aria-labelledby="tab-label-1e"
              tabIndex="-1"
            >
              <div className="flex flex-col items-center mb-4 text-neutral gap-2 ">
                <p className="font-thin">Estimated price</p>
                <span className="font-semibold">1BTC - 21.443</span>
              </div>
              <form
                action=""
                className="w-full  flex flex-col items-center gap-4"
              >
                <div className="relative flex flex-col gap-2">
                  <div className=" w-full flex gap-2 p-2 bg-base-200  rounded-3xl">
                    <div className="ml-2 text-neutral">
                      <label htmlFor="">spend</label>
                      <input
                        type="text"
                        min={"3"}
                        placeholder="0.00"
                        className="bg-transparent outline-0   w-full "
                      />
                    </div>
                    <select className=" select  font-bold bg-base-200 text-neutral">
                      <option selected>VANILLA VISA</option>
                      <option>VANILLA VISA</option>
                      <option>VANILLA MASTER</option>
                      <option>AMEX VISA</option>
                      <option>AMEX MASTER</option>
                    </select>
                    <select className="select select-accent bg-base-200 rounded-3xl  text-neutral ">
                      <option selected>USD</option>
                      <option>CAD</option>
                      <option>AUD</option>
                      <option>GBP</option>
                      <option>EUR</option>
                    </select>
                  </div>
                  <span className="flex text-neutral items-center justify-center absolute w-10 h-10 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ">
                    <IoRepeat size={"30px"} />
                  </span>
                  <div className="w-full flex justify-between p-2 bg-base-200 text-neutral  rounded-3xl">
                    <div className="ml-2">
                      <label htmlFor="">receive</label>
                      <input
                        type="text"
                        min={"3"}
                        placeholder="0.00"
                        className="bg-transparent   w-full max-w-xs"
                      />
                    </div>
                    <select className="select select-accent bg-base-200 rounded-3xl  text-neutral">
                      <option selected>USD</option>
                      <option>CAD</option>
                      <option>AUD</option>
                      <option>GBP</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </div>
                <Link
                  to={"#"}
                  className="capitalize w-full btn  btn-primary text-neutral hover:bg-base-300 border-2 rounded-3xl border-success"
                >
                  Proceed
                </Link>
                <p className="flex gap-2 text-neutral items-center justify-center ">
                  we accept{" "}
                  <span className="flex gap-2 ">
                    <img src={visa} alt="" />
                    <img src={master} alt="" />
                  </span>
                </p>
              </form>
            </div>
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 2 ? "" : "hidden"
              }`}
              id="tab-panel-2e"
              aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
              role="tabpanel"
              aria-labelledby="tab-label-2e"
              tabIndex="-1"
            >
              <form action="">
                <div className="flex gap-2 p-2 bg-neutral border">
                  <div>
                    <label htmlFor="">You spend</label>
                    <input
                      type="text"
                      min={"3"}
                      value={""}
                      placeholder="0.00"
                      className="bg-neutral   w-full max-w-xs"
                    />
                  </div>
                  <select className="select select-primary w-full max-w-[30%]">
                    <option selected>USD</option>
                    <option>CAD</option>
                    <option>AUD</option>
                    <option>GBP</option>
                    <option>EUR</option>
                  </select>
                </div>
                <span>
                  <IoRepeat />
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
import { ExchangeFooter } from "../components/ExchangeFooter";
import FiatWallet from "../components/wallets/FiatWallet";
import { useEffect, useRef, useState } from "react";

const Wallet = () => {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 2,
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
    <section className="relative flex flex-col items-center h-screen bg-base-100  ">
      {/* <Link to={"/"} className="absolute left-6 top-8 md:left-72">
        <IoArrowBack style={{ fontSize: "30px" }} />
      </Link> */}
      <h3 className="my-6 text-dark text-center text-[20px] md:text-3xl  font-medium">
        Wallet
      </h3>
      <div role="tablist" className=" h-full w-full  tabs tabs-bordered ">
        <ul
          className="flex w-full mb-1 justify-center items-center "
          role="tablist"
          ref={wrapperRef}
        >
          <li className="" role="presentation">
            <a
              className={`text-3xl cursor-pointer px-7 ${
                tabSelected.currentTab === 1
                  ? " text-primary border-b-2 border-b-primary hover:text-base-200 focus:text-primary disabled:"
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
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span>Fiat</span>
            </a>
          </li>
          <li className="" role="presentation">
            <a
              className={`text-3xl cursor-pointer px-7  ${
                tabSelected.currentTab === 2
                  ? " text-primary border-b-2 border-b-primary hover:text-base-200 focus:text-primary disabled:"
                  : "w-full justify-self-center "
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
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span>crypto</span>
            </a>
          </li>
        </ul>
        <div className=" h-full   w-full flex justify-center items-start    rounded-t-[50px] md:rounded-[100px]  ">
          <div
            className={` w-full  flex items-center justify-center  ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`} //changed padding
            id="tab-panel-1e"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1e"
            tabIndex="-1"
          >
            <FiatWallet />
          </div>
          <div
            className={`w-full py-4 ${
              tabSelected.currentTab === 2 ? "" : "hidden"
            }`}
            id="tab-panel-2e"
            aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-2e"
            tabIndex="-1"
          >
            {/* <Sell /> */}
          </div>
        </div>
        {/* <FiatWallet /> */}
      </div>
      <ExchangeFooter />
    </section>
  );
};

export default Wallet;

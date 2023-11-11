import { useState, useRef, useEffect } from "react";
import {
  IoCardOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoRepeat,
} from "react-icons/io5";
import visa from "../../assets/Visa_icon.png";
import master from "../../assets/Mastercard-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep } from "../../redux/stepperSlice";
import { allTrades } from "../../redux/exchange/exchangeSlice";
// import { useForm } from "react-hook-form";

function StartTrade() {
  const trades = useSelector(allTrades);
  console.log(allTrades);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));

    dispatch(nextStep());
  };

  const [inputValue, setInputValue] = useState([]);
  console.log(inputValue);

  const spendInput = Number(inputValue) || [];

  const [check, setCheck] = useState(false);
  const toggleRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (check && toggleRef && !toggleRef.current.contains(e.target)) {
        setCheck(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [check]);

  // const [prepaidCheck, setPrepaidCheck] = useState(false);
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 2,
  });

  // function handlePrepaidClick() {
  //   if (setPrepaidCheck) {
  //     return setPrepaidCheck(!prepaidCheck);
  //   } else {
  //     false;
  //   }
  // }

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

  const [currency, setCurrency] = useState("USD");
  const [tradeType, setTradeType] = useState("Vanilla Visa");

  // const giftItems = document.getElementById("giftItems");
  // giftItems.addEventListener("click",  => {
  //   giftItemsClick();
  // });

  // function giftItemsClick() {
  //   console.log("giftItemsClick");
  // }

  return (
    <>
      <form onSubmit={handleSubmit} className="px-6 flex flex-col items-center">
        <ul className="flex items-center gap-2" role="tablist" ref={wrapperRef}>
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
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
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
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span>Sell</span>
            </button>
          </li>
        </ul>
        <div className="">
          <div
            className={` py-4 ${tabSelected.currentTab === 1 ? "" : "hidden"}`} //changed padding
            id="tab-panel-1e"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1e"
            tabIndex="-1"
          >
            <div className="flex flex-col items-center mb-4 text-base-300 gap-2 ">
              <p className="font-thin">Estimated price</p>
              <span className="font-semibold">1BTC - 21.443USD</span>
            </div>
            <div className="w-full  flex flex-col items-center gap-4">
              <div>
                <div ref={toggleRef} className="relative flex flex-col gap-2">
                  <div className=" w-full flex gap-2 p-2 bg-base-100 border-2 border-base-300  rounded-3xl">
                    <div className="ml-2 text-accent">
                      <label htmlFor="">spend</label>
                      <input
                        type="text"
                        id="spend"
                        name="spend"
                        min="3"
                        placeholder="0.00"
                        required
                        value={spendInput}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="bg-transparent text-primary outline-none   w-full "
                      />
                    </div>

                    <button
                      onClick={() => setCheck(!check)}
                      onChange={(e) => setTradeType(e.target.value)}
                      type="button"
                      className="btn btn-accent bg-primary w-[130px] rounded-3xl  border-none  text-neutral "
                    >
                      <div className="flex flex-col items-start m-auto">
                        <input
                          // onChange={(e) => {
                          //   const selectedTrade = e.target.value;
                          //   setTradeType(selectedTrade);
                          // }}
                          type="text"
                          name="currency"
                          id="currency"
                          value={currency}
                          className="w-full absolute opacity-0 "
                        />
                        <label
                          htmlFor="currency"
                          className="text-base font-bold"
                        >
                          {currency}
                        </label>
                        <input
                          type="text"
                          name="giftType"
                          id="giftType"
                          value={tradeType}
                          className="w-full absolute opacity-0 "
                        />
                        <label
                          htmlFor="giftType"
                          className=" text-xs font-normal"
                        >
                          {tradeType}
                        </label>

                        {/* <span className="text-base font-bold ">{currency}</span>
                        <span className="text-xs font-normal ">
                          {tradeType}
                        </span> */}
                      </div>
                      <span>
                        {check ? (
                          <IoChevronUpOutline size={"20"} />
                        ) : (
                          <IoChevronDownOutline size={"20"} />
                        )}
                      </span>
                    </button>
                  </div>
                  {check && (
                    <div className=" w-full top-[70px] absolute left-1/2 -translate-x-1/2 flex flex-col p-5 gap-4 bg-primary rounded-3xl border-2">
                      <p className="flex justify-between items-center text-sm text-neutral">
                        Select Currency{" "}
                        <span>
                          <select
                            name="currency"
                            id="currency"
                            onChange={(e) => {
                              const selectedCurrency = e.target.value;
                              setCurrency(selectedCurrency);
                            }}
                            value={currency}
                            required
                            className="select select-accent bg-base-100 rounded-3xl  text-base-300"
                          >
                            <option value="usd" selected>
                              USD
                            </option>

                            <option value="aud">AUD</option>
                            <option value="gbp">GBP</option>
                            <option value="eur">EUR</option>
                          </select>
                        </span>
                      </p>
                      <input
                        type="search"
                        placeholder="search"
                        id="search"
                        className=" input input-bordered join-item "
                      />
                      <p className="flex justify-between items-center text-sm text-neutral">
                        Select payment type
                      </p>
                      {/* <div className="flex justify-between">
                        <div className="flex flex-col">
                          <div className="flex gap-2 text-neutral p-1 font-bold hover:border-b-2 border-neutral ">
                            <IoCardOutline size={"20px"} />
                            DebitCard
                          </div>
                          <button
                            onClick={() => handlePrepaidClick()}
                            type="button"
                            className="flex gap-2 text-neutral p-1 font-bold hover:border-b-2 border-neutral focus:text-accent"
                          >
                            <IoCardOutline size={"20px"} />
                            Prepaid GiftCard
                          </button>
                          <div className="flex gap-2 text-neutral p-1 font-bold hover:border-b-2 border-neutral  ">
                            <IoCardOutline size={"20px"} />
                            Bank Transfer
                          </div>
                        </div>
                        <span className="w-1 h-auto bg-base-content "></span>
                        {prepaidCheck && (
                          
                        )}
                      </div> */}
                      <div className="w-full  p-2 h-[200px] overflow-x-clip overflow-y-auto">
                        <div className=" w-full  flex flex-col gap-2 ">
                          {trades.map((tradeType) => {
                            return (
                              <div
                                id="giftItems"
                                key={tradeType.id}
                                className="relative bg-neutral text-base-300 flex items-center gap-2 py-2 px-4 border rounded-md w-full"
                              >
                                <IoCardOutline size={"20px"} />
                                <div className="flex flex-col w-full gap-1">
                                  <div className="flex items-center justify-between">
                                    {/* <p className=" font-bold text-lg">
                                      {tradeType.giftType}
                                    </p> */}
                                    <input
                                      onChange={(e) => {
                                        const selectedTrade = e.target.value;
                                        setTradeType(selectedTrade);
                                      }}
                                      type="radio"
                                      name="giftType"
                                      id="giftType"
                                      value={tradeType.giftType}
                                      className="w-full absolute  h-full opacity-0"
                                    />
                                    <label
                                      htmlFor="vanilla"
                                      className=" font-bold text-lg"
                                    >
                                      {tradeType.giftType}
                                    </label>
                                    <span className="bg-primary text-neutral text-[8px] rounded-xl py-1 px-2">
                                      wait time: {tradeType.time}
                                    </span>
                                  </div>
                                  <div className="flex  items-center justify-between">
                                    <span className=" text-[8px] ">
                                      {tradeType.symbol}
                                      <span className=" text-[8px] ">
                                        {tradeType.needed.min}
                                      </span>{" "}
                                      -{" "}
                                      <span className=" text-[8px] ">
                                        <span className=" text-[8px]">
                                          {tradeType.symbol}
                                        </span>
                                        {tradeType.needed.max}
                                      </span>{" "}
                                    </span>
                                    <span className="bg-secondary text-base-300 text-[8px] rounded-xl py-1 px-2">
                                      {tradeType.needed.receipt}
                                    </span>

                                    <span className="font-semibold text-red-700 text-[8px]">
                                      {tradeType.rate}/{tradeType.symbol}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  <span className="flex text-neutral items-center justify-center absolute w-10 h-10 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ">
                    <IoRepeat size={"30px"} />
                  </span>
                  <div className="w-full flex justify-between p-2 bg-base-100 border-2 border-base-300 text-accent  rounded-3xl">
                    <div className="ml-2">
                      <label htmlFor="">receive</label>
                      <input
                        type="text"
                        min="3"
                        max="10"
                        id="receive"
                        name="receive"
                        placeholder="0.00"
                        className="bg-transparent text-primary outline-none w-full max-w-xs pr-2"
                      />
                    </div>
                    <button
                      // onClick={() => setCheck(!check)}
                      type="button"
                      className="btn btn-accent bg-primary border-none rounded-3xl w-[130px] justify-between text-neutral "
                    >
                      <div className="flex flex-col items-start m-auto">
                        <h3 className="text-base font-bold ">USDT</h3>
                        <p className="text-xs font-normal ">Tether</p>
                      </div>
                      <span>
                        {check ? (
                          <IoChevronUpOutline size={"20"} />
                        ) : (
                          <IoChevronDownOutline size={"20"} />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
              >
                Proceed
              </button>

              <p className="flex gap-2 text-base-300 items-center justify-center ">
                we accept{" "}
                <span className="flex gap-2 ">
                  <img src={visa} alt="" />
                  <img src={master} alt="" />
                </span>
              </p>
            </div>
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
            <div>
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default StartTrade;

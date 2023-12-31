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
import tradeTypes from "../../data/tradeTypes";
const Buy = () => {
  const trades = useSelector(allTrades);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));

    dispatch(nextStep());
  };

  const [inputValue, setInputValue] = useState([]);

  const spendInput = Number(inputValue) || [];

  //   const receive = tradeTypes.rate;

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
  const [currency, setCurrency] = useState("USD");
  const [tradeType, setTradeType] = useState("Vanilla Visa");
  const [rate, setRate] = useState(spendInput);
  const receiveInput = spendInput * rate || [];
  return (
    <form onSubmit={handleSubmit}>
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
                className="btn bg-primary w-[130px] rounded-3xl  border-none  text-neutral "
              >
                <div className="flex  flex-col  items-start m-auto">
                  <input
                    // onChange={(e) => {
                    //   const selectedTrade = e.target.value;
                    //   setTradeType(selectedTrade);
                    // }}
                    type="text"
                    name="currency"
                    id="currency"
                    value={currency}
                    className="cursor-pointer w-full absolute opacity-0 "
                  />
                  <label htmlFor="currency" className="text-base font-bold">
                    {currency}
                  </label>
                  <input
                    type="text"
                    name="giftType"
                    id="giftType"
                    value={tradeType}
                    className="cursor-pointer w-full absolute opacity-0 "
                  />
                  <label htmlFor="giftType" className=" text-xs font-normal">
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

                      <option value="AUD">AUD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
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
                    {trades.map((tradeTypes) => {
                      return (
                        <div
                          id="giftItems"
                          key={tradeTypes.id}
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
                                value={tradeTypes.giftType}
                                className="w-full absolute  h-full opacity-0"
                              />
                              <label
                                htmlFor="vanilla"
                                className=" font-bold text-lg"
                              >
                                {tradeTypes.giftType}
                              </label>
                              <span className="bg-primary text-neutral text-[8px] rounded-xl py-1 px-2">
                                wait time: {tradeTypes.time}
                              </span>
                            </div>
                            <div className="flex  items-center justify-between">
                              <span className=" text-[8px] ">
                                {tradeTypes.symbol}
                                <span className=" text-[8px] ">
                                  {tradeTypes.needed.min}
                                </span>{" "}
                                -{" "}
                                <span className=" text-[8px] ">
                                  <span className=" text-[8px]">
                                    {tradeTypes.symbol}
                                  </span>
                                  {tradeTypes.needed.max}
                                </span>{" "}
                              </span>
                              <span className="bg-secondary text-base-300 text-[8px] rounded-xl py-1 px-2">
                                {tradeTypes.needed.receipt}
                              </span>
                              <input
                                onChange={(e) => {
                                  const selectedRate = e.target.value;
                                  setRate(selectedRate);
                                }}
                                type="radio"
                                name="rate"
                                id="rate"
                                value={tradeTypes.rate}
                                className="visible"
                              />

                              <span className="font-semibold text-red-700 text-[8px]">
                                {tradeTypes.rate}/{tradeTypes.symbol}
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
                <p>receive</p>
                <input
                  onChange={(e) => {
                    const selectedTrade = e.target.value;
                    setRate(selectedTrade);
                  }}
                  key={tradeTypes.id}
                  type="text"
                  min="3"
                  max="10"
                  name="receive"
                  value={receiveInput}
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
          Buy
        </button>

        <p className="flex gap-2 text-base-300 items-center justify-center ">
          we accept{" "}
          <span className="flex gap-2 ">
            <img src={visa} alt="" />
            <img src={master} alt="" />
          </span>
        </p>
      </div>
    </form>
  );
};

export default Buy;

import { useState, useRef, useEffect } from "react";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoRepeat,
} from "react-icons/io5";
import visa from "../../assets/Visa_icon.png";
import master from "../../assets/Mastercard-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep } from "../../redux/stepperSlice";
import { allTrades } from "../../redux/exchange/exchangeSlice";

const Sell = () => {
  const trades = useSelector(allTrades);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));

    dispatch(nextStep());
  };

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
                  className="bg-transparent text-primary outline-none   w-full "
                />
              </div>

              <button
                type="button"
                className="btn bg-primary w-[130px] rounded-3xl  border-none  text-neutral "
              >
                <div className="flex  flex-col  items-start m-auto">
                  <input
                    // onChange={(e) => {
                    //   const selectedTrade = e.target.value;
                    //   setTradeType(selectedTrade);
                    // }}
                    type="radio"
                    name="currency"
                    id="currency"
                    className="cursor-pointer w-full absolute opacity-0 "
                  />
                  <label
                    htmlFor="currency"
                    className="text-base font-bold"
                  ></label>
                  <input
                    type="radio"
                    name="giftType"
                    id="giftType"
                    className="cursor-pointer w-full absolute opacity-0 "
                  />
                  <label
                    htmlFor="giftType"
                    className=" text-xs font-normal"
                  ></label>
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
            <span className="flex text-neutral items-center justify-center absolute w-10 h-10 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ">
              <IoRepeat size={"30px"} />
            </span>
            <div className="w-full flex justify-between p-2 bg-base-100 border-2 border-base-300 text-accent  rounded-3xl">
              <div className="ml-2">
                <p>receive</p>
                <input
                  type="text"
                  min="3"
                  max="10"
                  id="receive"
                  name="receive"
                  placeholder="0.00"
                  className="bg-transparent text-primary outline-none w-full max-w-xs pr-2"
                />
                <label htmlFor="receive"></label>
              </div>
              <button
                // onClick={() => setCheck(!check)}
                type="button"
                className="btn btn-accent bg-primary border-none rounded-3xl w-[130px] justify-between text-neutral "
              >
                <div className="flex flex-col items-start m-auto">
                  <h3 className="text-base font-bold ">NGN</h3>
                  <p className="text-xs font-normal ">Naira</p>
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
          Sell
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

export default Sell;

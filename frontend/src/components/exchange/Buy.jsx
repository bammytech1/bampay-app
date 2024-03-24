import { useState, useRef, useEffect } from "react";
import {
  IoCardOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoClose,
  IoRepeat,
} from "react-icons/io5";
import visa from "../../assets/Visa_icon.png";
import master from "../../assets/Mastercard-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  nextStep,
  tradeId,
  setSelectedGiftCard,
} from "../../redux/stepperSlice";
import { LoadingButton } from "../extras/LoadingButton";
import { getGiftCards } from "../../redux/features/giftcards/giftCardSlice";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";
const Buy = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocalGiftCard, setSelectedLocalGiftCard] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: "NGN",
    value: "Naira",
  });
  const [usdtAddress, setUsdtAddress] = useState("");

  const [filteredGiftCards, setFilteredGiftCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [inputValue, setInputValue] = useState([]);

  const spendInput = Number(inputValue) || [];
  const [check, setCheck] = useState(false);
  const [currency, setCurrency] = useState("");
  const [giftCardType, setGiftCardType] = useState("");
  const [rate, setRate] = useState(spendInput);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const { giftCards, isError } = useSelector((state) => state.giftCard);
  console.log("Gift cards:", giftCards);

  const currencies = ["USD", "AUD", "GBP", "EUR", "NGR"]; // Or dynamically extract from giftCards

  useEffect(() => {
    dispatch(getGiftCards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(tradeId());
  }, [dispatch]);

  useEffect(() => {
    // First filter by selected currency
    let filteredByCurrency = giftCards.filter(
      (card) => card.currency === selectedCurrency
    );

    // Then filter by search term within the already filtered list
    const filteredBySearchTerm = filteredByCurrency.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredGiftCards(filteredBySearchTerm);
  }, [selectedCurrency, giftCards, searchTerm]);

  useEffect(() => {
    if (giftCards.length > 0) {
      const defaultCard = giftCards[0]; // Assuming you want to select the first gift card as default
      setSelectedLocalGiftCard(defaultCard);
      setCurrency(defaultCard.currency);
      setGiftCardType(defaultCard.name);
      setRate(defaultCard.rate);
    }
  }, [giftCards]);

  {
    filteredGiftCards.length === 0 && (
      <div className="text-center p-4">
        No gift cards found matching your criteria.
      </div>
    );
  }

  const handleSelectGiftCard = (giftCard) => {
    setSelectedLocalGiftCard(giftCard);
    setCurrency(giftCard.currency);
    setGiftCardType(giftCard.name);
    setRate(giftCard.rate);
    setCheck(!check);

    // Dispatch to Redux if needed globally
    dispatch(setSelectedGiftCard(giftCard));
  };

  const handleSelectPaymentOption = (optionLabel) => {
    // Set the selected option state
    setSelectedOption({
      label: optionLabel,
      value: optionLabel === "USDT" ? "Tether" : "Naira",
    });

    // Close the dropdown if NGN is selected, keep it open for USDT
    if (optionLabel === "NGN") {
      setShowDropdown(false);
    } else if (optionLabel === "USDT") {
      // Optionally, explicitly set to true to ensure the dropdown remains open for USDT
      setShowDropdown(true);
      // If you want the input field to be focused when USDT is selected
      // you might need to use a ref for the USDT input and call .focus() on it here
    }
  };

  const validateAmount = (amount) => {
    if (!selectedLocalGiftCard) return true; // or false, depending on how you want to handle this case

    const numAmount = parseFloat(amount);
    return (
      numAmount >= selectedLocalGiftCard.minTake &&
      numAmount <= selectedLocalGiftCard.maxTake
    );
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setIsValidAmount(validateAmount(newAmount));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const calculatedReceiveAmount =
    selectedLocalGiftCard && amount
      ? (parseFloat(amount) * selectedLocalGiftCard.rate).toFixed(2)
      : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidAmount) {
      // Show an error message or highlight the input
      toast.error("Amount is outside the valid range.");
      return;
    }
    if (selectedOption.label === "USDT" && !usdtAddress.trim()) {
      toast.error("Please provide a USDT BEP20 Address.");
      return;
    }
    const data = new FormData(e.target);
    // Append the selected payment option to formData
    data.append("paymentOption", selectedOption.label);
    data.append("paymentOptionValue", selectedOption.value);
    // If the selected payment option is USDT, add the usdtAddress to the formData
    if (selectedOption.label === "USDT") {
      data.append("usdtAddress", usdtAddress);
    }
    dispatch(setFormData(Object.fromEntries(data.entries())));

    dispatch(nextStep());
  };

  const toggleRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (check && toggleRef && !toggleRef.current.contains(e.target)) {
        setCheck(false);
      }
      if (showDropdown && toggleRef && !toggleRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [check, showDropdown]);
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

  return (
    <form className=" h-fit flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mb-2 text-base-300 gap-2 ">
        <p className="font-thin">Estimated price</p>
        <span className="font-semibold">1BTC - 21.443USD</span>
      </div>
      <div className="w-full  flex flex-col items-center gap-4">
        <div>
          <div ref={toggleRef} className=" flex flex-col  items-center   ">
            {!isValidAmount && (
              <p className="text-red-500 text-xs">
                Amount must be between {selectedLocalGiftCard.minTake} and{" "}
                {selectedLocalGiftCard.maxTake}.
              </p>
            )}
            <div className=" w-full flex gap-2 p-2 bg-base-100 border-2 border-base-300  rounded-3xl">
              <div className="ml-2 text-accent">
                <label htmlFor="">spend</label>
                <input
                  type="number"
                  id="spend"
                  name="spend"
                  min="3"
                  placeholder="0.00"
                  required
                  value={amount}
                  onChange={handleAmountChange}
                  className={`bg-transparent text-primary outline-none w-full ${
                    !isValidAmount ? "input-invalid" : ""
                  }`}
                />
              </div>

              <button
                onClick={() => setCheck(!check)}
                type="button"
                className="btn bg-primary w-[130px] rounded-3xl  border-none  text-neutral"
              >
                <div className="flex  flex-col  items-start m-auto">
                  <input
                    type="text"
                    name="currency"
                    id="currency"
                    value={currency}
                    readOnly
                    className="cursor-pointer w-full absolute opacity-0"
                  />
                  <label htmlFor="currency" className="text-base font-bold">
                    {selectedLocalGiftCard && selectedLocalGiftCard.currency}
                  </label>
                  <input
                    type="text"
                    name="giftType"
                    id="giftType"
                    value={giftCardType}
                    readOnly
                    className="cursor-pointer w-full absolute opacity-0"
                  />
                  <label htmlFor="giftType" className=" text-xs font-normal">
                    {selectedLocalGiftCard && selectedLocalGiftCard.name}
                  </label>
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
              <div className=" w-full rounded-t-3xl max-w-lg z-30 bottom-0 absolute flex flex-col p-5 gap-4 bg-primary h-[70%] border-2">
                <div className="flex items-center justify-between">
                  <p className="text-base text-base-100">Select currency</p>
                  <IoClose
                    style={{ fontSize: "30px" }}
                    onClick={() => setCheck(!check)}
                  />
                </div>
                {/* currency here */}
                <div className="flex justify-between border rounded-2xl p-4 overflow-auto-scroll">
                  {currencies.map((currency, index) => (
                    <button
                      key={index}
                      className={`btn btn-accent ${
                        selectedCurrency === currency
                          ? "active-class"
                          : "btn-outline border-base-100 !text-base-300"
                      }`}
                      onClick={() => setSelectedCurrency(currency)}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
                <input
                  type="search"
                  placeholder="search"
                  id="search"
                  className=" input input-bordered h-20 join-item "
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <p className="text-base text-base-100">Select payment type</p>

                <div className="w-full   p-2 h-[500px] overflow-y-scroll overflow-x-hidden">
                  <div className=" w-full  flex flex-col gap-2 ">
                    {filteredGiftCards.map((giftCard) => {
                      return (
                        <div
                          key={giftCard.id}
                          className=" bg-neutral text-base-300 flex items-center gap-2 py-2 px-4 border rounded-md w-full"
                          onClick={() => handleSelectGiftCard(giftCard)}
                        >
                          <IoCardOutline size={"20px"} />
                          <div className="flex flex-col w-full gap-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-bold">
                                {giftCard.name}
                              </h3>
                              <span className="bg-primary text-neutral text-[8px] rounded-xl py-1 px-2">
                                wait time: {giftCard.waitTime} minutes
                              </span>
                            </div>
                            <div className="flex  items-center justify-between">
                              <span className=" text-[8px] ">
                                {giftCard.currency}
                                <span className=" text-[8px] ">
                                  {giftCard.minTake}
                                </span>{" "}
                                -{" "}
                                <span className=" text-[8px] ">
                                  <span className=" text-[8px]">
                                    {giftCard.currency}
                                  </span>
                                  {giftCard.maxTake}
                                </span>{" "}
                              </span>
                              <span className="bg-secondary text-base-300 text-[8px] rounded-xl py-1 px-2">
                                {giftCard.receipt}
                              </span>

                              <span className="font-semibold text-red-700 text-[8px]">
                                {giftCard.rate}/{giftCard.currency}
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
            <span className="flex  text-base-300 items-center justify-center  w-10 h-10   rotate-90 ">
              <IoRepeat size={"30px"} />
            </span>
            <div className="w-full  flex justify-between p-2 bg-base-100 border-2 border-base-300 text-accent  rounded-3xl">
              <div className="ml-2">
                <p>receive</p>
                <input
                  type="text"
                  name="receive"
                  value={calculatedReceiveAmount}
                  placeholder="0.00"
                  readOnly // This field is read-only since it's automatically calculated
                  className="bg-transparent text-primary outline-none w-full max-w-xs pr-2"
                />
              </div>
              <button
                onClick={toggleDropdown}
                type="button"
                className="btn btn-accent bg-primary border-none rounded-3xl w-[130px] justify-between text-neutral "
              >
                <div className="flex  w-full max-w-[70px] flex-col items-start m-auto">
                  <h3 className="text-base font-bold">
                    {selectedOption.label}
                  </h3>
                  <p className="text-xs font-normal">{selectedOption.value}</p>
                </div>
                <span>
                  {showDropdown ? (
                    <IoChevronUpOutline size={"20"} />
                  ) : (
                    <IoChevronDownOutline size={"20"} />
                  )}
                </span>
              </button>
            </div>
            {showDropdown && (
              <div className="w-full rounded-t-3xl max-w-lg  z-30  bottom-0  absolute flex flex-col p-5 gap-4 bg-primary h-[70%] border-2">
                <div className="flex items-center justify-between">
                  <p className="text-base text-base-100">
                    Select payments method
                  </p>
                  <IoClose
                    style={{ fontSize: "30px" }}
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                </div>
                <div
                  className="p-4 cursor-pointer hover:bg-black btn text-neutral"
                  onClick={() => handleSelectPaymentOption("NGN")}
                >
                  NGN Naira
                </div>
                <div
                  className="p-4 cursor-pointer hover:bg-black btn text-neutral"
                  onClick={() => handleSelectPaymentOption("USDT")}
                >
                  USDT Tether
                </div>
                {selectedOption.label === "USDT" && (
                  <>
                    <div className="group w-full relative mt-3">
                      <input
                        type="text"
                        name="usdt"
                        id="usdt"
                        placeholder="USDT BEP20 Address"
                        required
                        value={usdtAddress}
                        onChange={(e) => setUsdtAddress(e.target.value)}
                        className="peer h-10 w-full  bg-transparent px-4 text-sm border-base-300 border-b-2"
                      />
                      <label
                        htmlFor="usdt"
                        className="absolute text-base-100 left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs group-focus-within:text-base-300 peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-valid:text-base-300"
                      >
                        USDT BEP20 Address
                      </label>
                    </div>
                    <div className=" flex items-center justify-between w-full ">
                      <span className="label-text text-xs">
                        By using this address, confirmed you paste in correct
                        BEP20 usdt address
                      </span>
                      <input
                        name="confirmation"
                        type="checkbox"
                        required
                        className="checkbox border-2 border-base-100 checkbox-success"
                        onChange={(e) => {
                          if (e.target.checked && usdtAddress.trim() !== "") {
                            setShowDropdown(false);
                          }
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {selectedOption.label === "USDT" && !usdtAddress && (
            <p className="text-red-500 text-xs mt-3 text-center">
              Please provide a USDT BEP20 Address.
            </p>
          )}
          {selectedOption.label === "USDT" && usdtAddress && (
            <p className="text-base-300 mt-3">
              USDT Address: {shortenText(usdtAddress, 25)}
            </p>
          )}
        </div>

        <LoadingButton type="submit" isLoading={isLoading}>
          Start
        </LoadingButton>

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

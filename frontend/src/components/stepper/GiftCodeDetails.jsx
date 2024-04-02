import { IoArrowBackCircleSharp, IoCopy } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep, prevStep } from "../../redux/stepperSlice";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { shortenMiddle } from "../../utils";
import { LoadingButton } from "../extras/LoadingButton";
import { useNavigate } from "react-router-dom";

function GiftCodeDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = useSelector((state) => state.step);
  const [startDate, setStartDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const formData = useSelector((state) => state.step.formData);
  const selectedGiftCard = useSelector((state) => state.step.selectedGiftCard);

  console.log("GiftCard selected:", selectedGiftCard);

  useEffect(() => {
    // Update local state or perform actions based on the updated formData
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setIsLoading(true);
    dispatch(setFormData(Object.fromEntries(data.entries())));
    dispatch(nextStep());
    navigate("/exchange/upload-images");
  };
  const handlePrev = () => {
    dispatch(prevStep());
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-2 "
      >
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: {getData.id}
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(getData.id)}
            className="text-primary"
          >
            <IoCopy />
          </motion.span>
        </p>
        <ul className=" flex flex-col text-neutral items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            {getData.formData.giftType} :{" "}
            <span className="font-bold">
              {getData.formData.spend} {getData.formData.currency}
            </span>
          </li>
          <li>
            You Receive:{" "}
            <span className="font-bold">
              {getData.formData.receive} {getData.formData.paymentOption}
            </span>
          </li>
          <li>
            Pay To:{" "}
            {getData.formData.paymentOption === "USDT" ? (
              <span className="font-bold">
                {shortenMiddle(getData.formData.usdtAddress, 10, 10)}
              </span>
            ) : (
              <span className="font-bold">Fiat Wallet</span>
            )}
          </li>
        </ul>
        <div className="flex max-w-sm flex-col items-center gap-6 bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-start gap-6 bg-primary rounded-3xl w-full p-4">
            <div className="flex  justify-between w-full text-neutral font-bold text-2xl ">
              <p className="text-lg">{getData.formData.giftType}</p>
              <p className="text-2xl text-secondary">
                {" "}
                {getData.formData.spend} {getData.formData.currency}
              </p>
            </div>
            <div className="group w-full relative ">
              <input
                type="text"
                inputMode="numeric"
                name="cardNumber"
                id="card"
                placeholder="Card Number"
                required
                className="peer  h-14 w-full rounded-3xl bg-base-100 px-4 text-sm outline-0"
              />
              <label
                htmlFor="cardNumber"
                className="absolute text-transparent left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-valid:text-white"
              >
                Card number
              </label>
            </div>
            {selectedGiftCard && selectedGiftCard.category === "Prepaid" && (
              <div className="flex w-full justify-between  gap-6 ">
                <div className="group w-1/2 relative">
                  <DatePicker
                    name="cardExp"
                    id="cardExp"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yy"
                    showMonthYearPicker
                    placeholderText="MM/YY"
                    className="peer w-full h-14  rounded-3xl bg-base-100  text-sm px-6"
                  />

                  <label
                    htmlFor="cardExp"
                    className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base text-transparent transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-valid:text-white"
                  >
                    MM/YY
                  </label>
                </div>
                <div className="group w-1/3 relative">
                  <input
                    type="text"
                    name="CardCvv"
                    id="cvv"
                    placeholder="CVV"
                    required
                    className="peer indent-3 h-14 w-full rounded-3xl bg-base-100  text-sm "
                  />
                  <label
                    htmlFor="cardNumber"
                    className="absolute  text-transparent left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-valid:text-white"
                  >
                    CVV
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="form-control justify-between w-full">
            <label className="cursor-pointer label">
              <span className="label-text text-[10px]">
                By using this card, you agree to the prepaid card terms and also
                confirmed you paste in correct BEP20 usdt address
              </span>
              <input
                name="true"
                type="checkbox"
                required
                className="checkbox checkbox-success"
              />
            </label>
          </div>
          <LoadingButton type="submit" isLoading={isLoading}>
            Proceed
          </LoadingButton>
          <button
            type="button"
            onClick={handlePrev}
            className="  text-neutral absolute top-10 left-1/2 -translate-x-1/2 md:top-24 md:left-96"
          >
            <IoArrowBackCircleSharp size={"40px"} />
          </button>
        </div>
      </form>
    </>
  );
}

export default GiftCodeDetails;

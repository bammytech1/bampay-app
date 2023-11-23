import { IoArrowBackCircleSharp, IoCopy } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep, prevStep } from "../../redux/stepperSlice";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { motion } from "framer-motion";

function GiftCodeDetails() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));
    dispatch(nextStep());
  };
  const handlePrev = () => {
    dispatch(prevStep());
  };

  const getData = useSelector((state) => state.step);
  const toReceive = useSelector((state) => state.exchange);
  const [startDate, setStartDate] = useState();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-2"
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
            <span>
              {getData.formData.spend} {getData.formData.currency}
            </span>
          </li>
          <li key={toReceive.id}>
            You Receive: <span>${getData.formData.receive}</span>
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
                {/* <input
                  type="date"
                  name="cardDate"
                  id="date"
                  max={3}
                  required
                  className="peer w-full h-14  rounded-3xl bg-base-100  text-sm "
                /> */}
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
          </div>
          <div className="group w-full relative">
            <input
              type="text"
              name="usdt"
              id="usdt"
              placeholder="USDT BEP20 Address"
              required
              className="peer h-14 w-full rounded-3xl bg-base-100 px-4 text-sm border-base-300 border-2"
            />
            <label
              htmlFor="usdt"
              className="absolute text-transparent left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs group-focus-within:text-base-300 peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-valid:text-base-300"
            >
              USDT BEP20 Address
            </label>
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
          <button
            type="submit"
            className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
          >
            Proceed
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="  text-neutral absolute top-0 left-2 md:top-10 md:left-10"
          >
            <IoArrowBackCircleSharp size={"40px"} />
          </button>
        </div>
      </form>
    </>
  );
}

export default GiftCodeDetails;

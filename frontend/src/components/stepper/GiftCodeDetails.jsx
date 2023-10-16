import { IoCopy } from "react-icons/io5";

function GiftCodeDetails() {
  return (
    <>
      <section className="flex flex-col items-center w-full px-2">
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: 6t3479287{" "}
          <span className="text-secondary">
            <IoCopy />
          </span>
        </p>
        <ul className=" flex flex-col text-neutral items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            Vanilla Visa : <span>$500</span>
          </li>
          <li>
            You Receive: <span>$450</span>
          </li>
        </ul>
        <fieldset className="flex max-w-sm flex-col items-start gap-8 bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-start gap-8 bg-primary rounded-3xl w-full p-4">
            <div className="flex  justify-between w-full text-neutral font-bold text-2xl ">
              <p>Vanilla Visa</p>
              <p>$500</p>
            </div>
            <div className="group w-full relative ">
              <input
                type="text"
                id="card"
                required
                className="peer h-14 w-full rounded-3xl bg-base-100 px-4 text-sm outline-"
              />
              <label
                htmlFor="card"
                className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base-200 transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
              >
                Card number
              </label>
            </div>
            <div className="flex w-full justify-between  gap-6 ">
              <div className="group w-1/2 relative">
                <input
                  type="number"
                  id="date"
                  required
                  className="peer w-full h-14  rounded-3xl bg-base-100  text-sm "
                />
                <label
                  htmlFor="date"
                  className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  MM/YY
                </label>
              </div>
              <div className="group w-1/3 relative">
                <input
                  type="number"
                  id="cvv"
                  required
                  className="peer h-14 w-full rounded-3xl bg-base-100  text-sm "
                />
                <label
                  htmlFor="cvv"
                  className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-neutral peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  CVV
                </label>
              </div>
            </div>
          </div>
          <div className="group w-full relative">
            <input
              type="text"
              id="usdt"
              required
              className="peer h-14 w-full rounded-3xl bg-base-100 px-4 text-sm border-base-200 border-2"
            />
            <label
              htmlFor="usdt"
              className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base-200 transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-base-200 peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
            >
              USDT Address
            </label>
          </div>

          <div className="form-control justify-between w-full">
            <label className="cursor-pointer label">
              <span className="label-text text-xs">
                By using this card, you agree to the prepaid card terms and also
                confirmed i paste in correct BEP20 usdt address
              </span>
              <input type="checkbox" className="checkbox checkbox-success" />
            </label>
          </div>
        </fieldset>
      </section>
    </>
  );
}

export default GiftCodeDetails;

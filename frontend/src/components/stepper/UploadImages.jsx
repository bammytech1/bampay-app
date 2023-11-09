import { IoArrowBackCircleSharp, IoCopy } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  nextStep,
  prevStep,
  tradeId,
} from "../../redux/stepperSlice";

function UploadImages() {
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-2"
      >
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: {getData.id}
          <span className="text-secondary">
            <IoCopy />
          </span>
        </p>
        <ul className=" flex flex-col text-neutral items-start gap-1 py-2 px-4 bg-primary w-full ">
          <li>
            Vanilla Visa : <span>${getData.formData.spend}</span>
          </li>
          <li>
            You Receive: <span>${getData.formData.receive}</span>
          </li>
          <li>
            USDT Address: <span>{getData.formData.usdt}</span>
          </li>
        </ul>
        <fieldset className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <p>Please upload a clear images and accordingly </p>
          <div className="flex max-w-sm flex-col items-start gap-8 rounded-3xl w-full p-4">
            <div className="flex flex-col justify-between w-full text-base-200 text-sm  ">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Card Front </span>
                </label>
                <input
                  name="cardFront"
                  type="file"
                  className="file-input file-input-bordered file-input-success w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Card Back </span>
                </label>
                <input
                  name="cardBack"
                  type="file"
                  className="file-input file-input-bordered file-input-success w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Receipt </span>
                </label>
                <input
                  name="Receipt"
                  type="file"
                  className="file-input file-input-bordered file-input-success w-full max-w-xs"
                />
              </div>
            </div>
          </div>
          {/* <div>image will preview here</div> */}

          <div className="flex items-center justify-between gap-3">
            <label htmlFor="" className="text-xs">
              i verify all images are clear and eligible to read
            </label>
            <input
              name="true"
              type="checkbox"
              required
              className="checkbox checkbox-success"
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
        >
          Submit Images
        </button>
        <button
          type="button"
          onClick={handlePrev}
          className="  text-neutral absolute top-0 left-2 md:top-10 md:left-10"
        >
          <IoArrowBackCircleSharp size={"40px"} />
        </button>
      </form>
    </>
  );
}

export default UploadImages;

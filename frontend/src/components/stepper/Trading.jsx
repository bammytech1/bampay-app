import { useState, useCallback } from "react";
import {
  IoCloudUploadOutline,
  IoMailOpenOutline,
  IoCardOutline,
  IoDocumentTextOutline,
  IoStopwatchOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import StartTrade from "./StartTrade";
import GiftCodeDetails from "./GiftCodeDetails";
import UploadImages from "./UploadImages";
import Processing from "./Processing";
import SuccessPage from "./SuccessPage";
import DeclinePage from "./DeclinePage";
import GetVerified from "./GetVerified";
import Stepper from "./stepper";

export const Trading = () => {
  const [inputValues, setInputValues] = useState({
    currency: "",
    paymentType: "",
  });

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  });

  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Start", "Phone", "Wallet", "Image", "Process", "Finished"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <StartTrade />;
      case 2:
        return <GetVerified />;
      case 3:
        return <GiftCodeDetails />;
      case 4:
        return <UploadImages />;
      case 5:
        return <Processing />;
      case 6:
        return <SuccessPage />;
    }
  };

  return (
    <>
      <div className=" w-full  relative flex justify-between items-center gap-4 my-2">
        <div className="z-10 flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-2 ">
            <span className="border border-base-300 p-2 rounded-full bg-primary ">
              <IoDocumentTextOutline size={"30px"} />
            </span>
            <p className="text-xs">Start</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border border-base-300 p-2 rounded-full bg-primary">
              <IoMailOpenOutline size={"30px"} />
            </span>
            <p className="text-xs">Phone</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border border-base-300 p-2 rounded-full bg-primary">
              <IoCardOutline size={"30px"} />
            </span>
            <p className="text-xs">Wallet</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border border-base-300 p-2 rounded-full bg-primary">
              <IoCloudUploadOutline size={"30px"} />
            </span>
            <p className="text-xs">Images</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border border-base-300 p-2 rounded-full bg-primary">
              <IoStopwatchOutline size={"30px"} />
            </span>
            <p className="text-xs">Process</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="border border-base-300 p-2 rounded-full bg-primary">
              <IoCheckmarkOutline size={"30px"} />
            </span>
            <p className="text-xs">Finish</p>
          </div>
        </div>
        <div className="z-0 absolute top-[30%] left-0 w-full max-w-sm h-1 bg-base-300"></div>
      </div>
      <section className=" place-self-center h-fit max-w-lg flex flex-col items-center gap-2 py-10 bg-base-100  rounded-3xl ">
        <form
          action=""
          onChange={handleOnChange}
          className="w-full min-w-[320px]  flex flex-col items-center"
          aria-multiselectable="false"
        >
          {/* <Stepper currentStep={currentStep} steps={steps} /> */}
          <StartTrade />
          {/* <GetVerified /> */}
          {/* <GiftCodeDetails /> */}
          {/* <UploadImages /> */}
          {/* <Processing /> */}
          {/* <SuccessPage /> */}
          {/* <DeclinePage /> */}
          <button
            type="button"
            className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
          >
            Proceed
          </button>
        </form>
      </section>
    </>
  );
};

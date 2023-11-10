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
// import DeclinePage from "./DeclinePage";
import GetVerified from "./GetVerified";
import { useSelector } from "react-redux";

export const Trading = () => {
  const { step, totalSteps } = useSelector((state) => state.step);

  const renderStep = () => {
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
      // Add cases for other steps...
      default:
        return <StartTrade />;
    }
  };

  return (
    <>
      <section action="" className="flex flex-col items-center">
        <div className=" relative flex justify-between items-center gap-4 my-2">
          <div className="z-10 flex justify-between items-center gap-4">
            <div className="flex flex-col items-center gap-2 ">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 1
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoDocumentTextOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 1 ? "text-base-100" : "text-base-300"
                }`}
              >
                Start
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 2
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoMailOpenOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 2 ? "text-base-100" : "text-base-300"
                }`}
              >
                Phone
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 3
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoCardOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 3 ? "text-base-100" : "text-base-300"
                }`}
              >
                Wallet
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 4
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoCloudUploadOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 4 ? "text-base-100" : "text-base-300"
                }`}
              >
                Images
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 5
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoStopwatchOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 5 ? "text-base-100" : "text-base-300"
                }`}
              >
                Process
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`border  p-2 rounded-full  ${
                  step >= 6
                    ? "bg-base-100 border-base-100"
                    : "bg-primary border-base-300"
                }`}
              >
                <IoCheckmarkOutline size={"30px"} />
              </span>
              <p
                className={`text-xs ${
                  step >= 6 ? "text-base-100" : "text-base-300"
                }`}
              >
                Finish
              </p>
            </div>
          </div>
          {[...Array(totalSteps)].map((e, i) => (
            <progress
              key={i}
              max="6"
              value={step}
              className="absolute  top-6 h-2 w-full overflow-hidden rounded  bg-base-300 [&::-webkit-progress-bar]:bg-base-300 [&::-webkit-progress-value]:bg-base-100  [&::-moz-progress-bar]:bg-base-100"
            ></progress>
          ))}
        </div>

        <section className=" place-self-center h-fit max-w-lg flex flex-col items-center gap-2 py-10 bg-base-100  rounded-3xl ">
          <div className="w-full   flex flex-col gap-2 items-center">
            {renderStep()}
          </div>
        </section>
      </section>
    </>
  );
};

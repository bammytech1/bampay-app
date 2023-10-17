import { IoCheckmarkOutline, IoCopy } from "react-icons/io5";
import { Link } from "react-router-dom";

function SuccessPage() {
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
          <li>
            USDT Address: <span>u23mdec78q014cu17r1rz0813rtu10</span>
          </li>
        </ul>
        <fieldset className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-center gap-4 rounded-3xl w-full p-4">
            <h3 className="text-xl font-bold">Trade Successful!</h3>
            <p className="text-center">
              $450 Successfully sent to 783446gbw3445423yy9q845689760
            </p>

            <span className="bg-primary rounded-full">
              <IoCheckmarkOutline size={"180px"} className="text-neutral" />
            </span>
            <p className="text-center text-sm">
              it may take some minute to show in your wallet
            </p>
            <p className="text-center text-sm">
              Have any complains?{" "}
              <Link to={"contact"} className="text-red-700">
                here
              </Link>{" "}
            </p>
          </div>
          {/* <div>image will preview here</div> */}
        </fieldset>
      </section>
    </>
  );
}

export default SuccessPage;

import { IoCopy, IoTime } from "react-icons/io5";

function Processing() {
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
        <div className="flex max-w-sm flex-col items-start bg-base-100 rounded-3xl w-full  p-4">
          <div className="flex max-w-sm flex-col items-center gap-4 rounded-3xl w-full p-4">
            <p className="text-center">
              Please wait while we process your card{" "}
            </p>
            {/* <div className="bg-primary p-6 grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 10 }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 24 }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": 44 }}></span>
                </span>
                sec
              </div>
            </div> */}

            <IoTime size={"180px"} className="text-primary" />
          </div>
          <p className="text-center">
            Please wait while we process your Transaction. This takes
            approximately <span className="text-primary">1:30min</span> sit back
            and relax you can also listen to some music{" "}
            <span className="text-primary">here</span>
          </p>
          {/* <div>image will preview here</div> */}
        </div>
      </section>
    </>
  );
}

export default Processing;

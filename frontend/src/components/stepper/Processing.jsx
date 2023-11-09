import { IoCopy, IoTime } from "react-icons/io5";
import { useSelector } from "react-redux";

function Processing() {
  const getData = useSelector((state) => state.step);
  return (
    <>
      <section className="flex flex-col items-center w-full px-2">
        <p className="text-center flex justify-center items-center gap-3 mb-4 ">
          Trade ID: {getData.id}
          <span className="text-secondary">
            <IoCopy />
          </span>
        </p>
        <ul className=" flex flex-col text-neutral text-sm md:text-base items-start gap-1 py-2 px-4 bg-primary w-full ">
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

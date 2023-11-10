import { motion } from "framer-motion";
import { IoCopy, IoTime } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, nextStep } from "../../redux/stepperSlice";

function Processing() {
  //to be removed
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setFormData(Object.fromEntries(data.entries())));
    dispatch(nextStep());
  };
  // to be removed
  const getData = useSelector((state) => state.step);

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
          <button
            type="submit"
            className=" capitalize w-[90%] btn  btn-primary font-thin  text-neutral hover:btn-accent hover:text-neutral border-2 rounded-3xl border-neutral"
          >
            Proceed
          </button>
        </div>
      </form>
    </>
  );
}

export default Processing;

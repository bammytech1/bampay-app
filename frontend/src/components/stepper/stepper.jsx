import { useEffect } from "react";

const Stepper = ({ steps, currentStep }) => {
  useEffect(() => {
    //create object
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
  }, [steps, currentStep]);
  return <div>S</div>;
};

export default Stepper;

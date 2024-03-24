import { useState, useEffect, useRef } from "react";

function Countdown({ waitTime, onTimeUpdate }) {
  const targetTimeRef = useRef(new Date().getTime() + waitTime * 60000);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTimeRef.current - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      onTimeUpdate(newTimeLeft); // Call the callback with the updated time left
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUpdate]); // Include onTimeUpdate in the dependency array

  // Clamp function to ensure values are between 0 and 99
  const clampValue = (value) => Math.min(99, Math.max(0, value));

  return (
    <div className="bg-primary p-6 rounded-3xl grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="w-14 flex flex-col px-2 bg-neutral rounded-box text-primary">
        <span className=" text-5xl">
          <span
            className=" text-3xl text-base-300"
            style={{ "--value": clampValue(timeLeft.hours) }}
          >
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
        </span>
        hours
      </div>
      <div className="w-14 flex flex-col px-2 bg-neutral rounded-box text-primary">
        <span className="text-5xl">
          <span
            className=" text-3xl text-base-300"
            style={{ "--value": clampValue(timeLeft.minutes) }}
          >
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
        </span>
        min
      </div>
      <div className="w-14 flex flex-col px-2 bg-neutral rounded-box text-primary">
        <span className=" text-5xl">
          <span
            className=" text-3xl text-base-300"
            style={{ "--value": clampValue(timeLeft.seconds) }}
          >
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
        </span>
        sec
      </div>
    </div>
  );
}

export default Countdown;

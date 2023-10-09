import { useState, useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";

import tradeImage from "../assets/digitalcurrency.svg";
import MinFooter from "../components/MinFooter";
import { Trading } from "../components/stepper/Trading";

function Trade() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <>
      <section className="mb-6  bg-primary w-full flex justify-center items-center py-8 px-6  rounded-[50px] md:rounded-[100px] mt-32  ">
        <div className="container   w-full max-w-7xl md:py-8 ">
          <div className="place-content-center gap-1  grid md:grid-cols-2 ">
            <motion.picture
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
              className="!hidden md:!flex flex-col max-w-lg md:py-20 text-center lg:py-36 gap-4 justify-center items-center md:items-start"
            >
              <img className="" src={tradeImage} alt="wallet icon" />
            </motion.picture>
            <Trading />
          </div>
        </div>
      </section>
      <MinFooter />
    </>
  );
}

export default Trade;

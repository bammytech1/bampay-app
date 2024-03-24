import { useState, useRef, useEffect } from "react";

import Sell from "../exchange/Sell";
import Buy from "../exchange/Buy";

function StartTrade() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 2,
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
      <fieldset className="px-6 flex flex-col items-center justify-center gap-4">
        <ul className="flex items-center gap-4" role="tablist" ref={wrapperRef}>
          <li className="" role="presentation">
            <a
              className={`text-3xl cursor-pointer  ${
                tabSelected.currentTab === 1
                  ? " text-primary border-b-2 border-b-primary hover:text-base-200 focus:text-primary disabled:"
                  : "w-full justify-self-center "
              }`}
              id="tab-label-1e"
              role="tab"
              aria-setsize="2"
              aria-posinset="1"
              tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
              aria-controls="tab-panel-1e"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span>GiftCard</span>
            </a>
          </li>
          <li className="" role="presentation">
            <a
              className={`text-3xl cursor-pointer   ${
                tabSelected.currentTab === 2
                  ? " text-primary border-b-2 border-b-primary hover:text-base-200 focus:text-primary disabled:"
                  : "w-full justify-self-center "
              }`}
              id="tab-label-2e"
              role="tab"
              aria-setsize="2"
              aria-posinset="2"
              tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
              aria-controls="tab-panel-2e"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span>crypto</span>
            </a>
          </li>
        </ul>
        <div
          className={` py-4 ${tabSelected.currentTab === 1 ? "" : "hidden"}`} //changed padding
          id="tab-panel-1e"
          aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
          role="tabpanel"
          aria-labelledby="tab-label-1e"
          tabIndex="-1"
        >
          <Buy />
        </div>
        <div
          className={`py-4 ${tabSelected.currentTab === 2 ? "" : "hidden"}`}
          id="tab-panel-2e"
          aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
          role="tabpanel"
          aria-labelledby="tab-label-2e"
          tabIndex="-1"
        >
          <Sell />
        </div>
      </fieldset>
    </>
  );
}

export default StartTrade;

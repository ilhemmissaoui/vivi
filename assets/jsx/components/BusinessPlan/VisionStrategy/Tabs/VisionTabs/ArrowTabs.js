import React from "react";
import IconMoon from "../../../../Icon/IconMoon";

const ArrowTabs = ({ tab, handleTabsChange }) => {
  return (
    <div className="flex justify-center items-center">
      <button disabled={tab === 0} onClick={() => handleTabsChange(tab - 1)}>
        <IconMoon
          className={`bg-opacity-50 m-6  rounded-full px-2 box-icon bg-red-500 ${
            tab != 0 && "hover:bg-my-red"
          }`}
          color={"white"}
          name={"arrow-left"}
          size={36}
        />
      </button>
      <button disabled={tab === 2} onClick={() => handleTabsChange(tab + 1)}>
        <IconMoon
          className={`bg-opacity-50 m-6 rounded-full px-2 box-icon bg-red-500 ${
            tab != 2 && "hover:bg-my-red"
          }`}
          color={"white"}
          name={"arrow-right"}
          size={36}
        />
      </button>
    </div>
  );
};
export default ArrowTabs;

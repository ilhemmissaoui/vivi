import React from "react";

const EyeTabShow = ({ setTableIsOpen, tableIsOpen, children }) => {
  return (
    <div className="mb-[5px]">
      <button
        onClick={() => setTableIsOpen(!tableIsOpen)}
        className="flex flex-col justify-items-end"
      >
        {children}
      </button>
    </div>
  );
};

export default EyeTabShow;

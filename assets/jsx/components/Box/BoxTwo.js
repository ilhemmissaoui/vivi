import React from "react";
import IconMoon from "../Icon/IconMoon";
import { useHistory } from "react-router-dom";

const BoxTwo = ({
  title,
  color,
  iconNameOne,
  iconNameTwo,
  iconColor,
  titleColor,
  children,
  handlePrevStep,
  step,
}) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/business-model");
  };
  return (
    <div className={`bmc-box my-3 ${color} flex-row `}>
      <div className="flex justify-start items-center mx-4">
        <button onClick={handleGoBack}>
          <IconMoon
            className={`bg-white rounded-full px-2 box-icon ${color} `}
            color="#000"
            name={"edit-input1"}
            size={36}
          />
        </button>
      </div>
      <div className="flex-grow flex justify-center items-center px-4">
        {title ? (
          <span className={`${titleColor} bp-box-title`}>{title}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
};

BoxTwo.defaultProps = {
  color: "bg-white",
};
export default BoxTwo;

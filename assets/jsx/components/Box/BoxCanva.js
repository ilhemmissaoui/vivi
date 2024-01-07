import React from "react";
import IconMoon from "../Icon/IconMoon";
import { useHistory } from "react-router-dom";

const BoxCanva = ({
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
    handlePrevStep();
  };
  return (
    <div className={`bmc-box my-3 ${color} flex-row `}>
      {iconNameOne ? (
        <div className="flex justify-start items-center mx-4">
          <button onClick={handleGoBack} disabled={step < 1}>
            {step >= 1 ? (
              <IconMoon
                className={`bg-opacity-50 rounded-full px-2 box-icon ${color}`}
                color={"#0000FF"}
                name={iconNameOne}
                size={36}
              />
            ) : null}
          </button>
        </div>
      ) : null}
      <div className="flex-grow flex justify-center items-center px-4">
        {iconNameTwo ? (
          <div className="flex justify-center items-center mx-2">
            <IconMoon
              className="bg-opacity-50"
              color={"#FFF"}
              name={iconNameTwo}
              size={46}
            />
          </div>
        ) : null}
        {title ? (
          <span className={`${titleColor} bp-box-title`}>{title}</span>
        ) : null}
      </div>

      {children}
    </div>
  );
};

BoxCanva.defaultProps = {
  color: "bg-white",
};
export default BoxCanva;

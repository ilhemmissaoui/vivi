import React from "react";
import IconMoon from "../Icon/IconMoon";
import { useHistory } from "react-router-dom";

const Box = ({
  title,
  color,
  iconNameOne,
  iconNameTwo,
  iconColor,
  titleColor,
  children,
}) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/business-plan");
  };
  return (
    <div className={`bmc-box my-3 ${color} flex-row `}>
      {iconNameOne ? (
        <div className="flex justify-start items-center mx-4">
          <button onClick={handleGoBack}>
            <IconMoon
              className={`bg-white rounded-full px-2 box-icon ${color}`}
              color={color}
              name={iconNameOne}
              size={36}
            />
          </button>
        </div>
      ) : null}
      <div className="flex-grow flex justify-center items-center px-4">
        {iconNameTwo ? (
          <div className="flex justify-center items-center me-2">
            <IconMoon
              className="bg-opacity-50 items-center justify-center me-2"
              color={"#FFF"}
              name={iconNameTwo}
              size={46}
            />
          </div>
        ) : null}
        {title ? (
          <span
            className={`${titleColor} bp-box-title items-center justify-center`}
          >
            {title}
          </span>
        ) : null}
      </div>

      {children}
    </div>
  );
};

Box.defaultProps = {
  color: "bg-white",
};
export default Box;

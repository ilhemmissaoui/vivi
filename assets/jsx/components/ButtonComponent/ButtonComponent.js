import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({
  title,
  onClick,
  type,
  backgroundColor,
  colorText,
  disabled,
}) => {
  return (
    <button
      className={`${
        disabled
          ? "bg-light-gray text-yellow-500"
          : { backgroundColor } +
            { colorText } +
            "hover:bg-black hover:border-none py-2 px-4 rounded focus:outline-none self-center shadow-md"
      }`}
      onClick={onClick}
      type={type ? type : null}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

ButtonComponent.defaultProps = {
  backgroundColor: "bg-light-orange",
  colorText: "text-white",
};
export default ButtonComponent;

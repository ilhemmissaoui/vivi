import React from "react";

const ArrowSlider = () => {
  const triangleStyle = {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "15px 0 15px 30px",
    borderColor: "transparent transparent transparent #ffd9de",
    lineHeight: 0,
  };
  return (
    <div
      className="absolute right-[-27px] bottom-[-10px]"
      style={triangleStyle}
    ></div>
  );
};

export default ArrowSlider;

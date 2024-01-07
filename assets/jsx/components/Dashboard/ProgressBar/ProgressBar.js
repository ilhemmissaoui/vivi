import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressBar = (props) => {
  const { progress, pathColor, textColor, trailColor } = props;

  const circularTextBackgroundStyle = {
    position: "relative",
  };

  const circularTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F1EAFF",
    borderRadius: "100%",
    padding: "8px",
    width: "42%",
    height: "42%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: textColor,
    fontSize: "1rem",
  };

  return (
    <div style={circularTextBackgroundStyle}>
      <CircularProgressbar
        value={progress}
        text=""
        circleRatio={0.7}
        strokeWidth={17}
        styles={buildStyles({
          textSize: "20px",
          rotation: 1 / 2 + 1 / 7,
          strokeLinecap: "butt",
          trailColor: trailColor,
          pathColor: pathColor,
          textColor: "textColor",
          backgroundColor: "transparent",
        })}
      />
      <div style={circularTextStyle}>{`${progress}%`}</div>
    </div>
  );
};

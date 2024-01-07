import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { styled } from "@mui/material/styles";

const ProgressLinear = ({ progress, color }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    // backgroundColor: "#2C2C2C",
    color: "#2C2C2C",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <div className="flex flex-row justify-center items-center my-4">
      <div className="mx-1 items-center linerar-progress">
        <BorderLinearProgress
          sx={{
            backgroundColor: "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }}
          variant="determinate"
          value={progress}
        />
      </div>
      <div className="font-bold text-sm ">
        <span style={{ color: color }}>{progress}%</span>
      </div>
    </div>
  );
};
export default ProgressLinear;

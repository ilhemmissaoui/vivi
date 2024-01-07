import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import IconMoon from "../../Icon/IconMoon.js";
import { ProgressBar } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import ProgressLinear from "../../ProgressLinear/ProgressLinear.js";

const per = 60;
const date = "2023-04-10T09:30:00.000Z";
const relativeDate = moment(date).fromNow();
const formattedDate = moment(date).format("MMM D, YYYY");

const Card = (props) => {
  const {
    month,
    date,
    avancement,
    ProgressColor,
    title,
    colorText,
    colorbadge,
    progressBar,
    icon,
    bgColor,
    border,
    path,
    backGround,
    disabled,
  } = props;

  const [progress, setProgress] = useState(0);
  const handleProgress = () => {
    setProgress(progress + 10);
  };
  return (
    <div>
      {disabled ? (
        <Tooltip
          arrow
          placement="bottom"
          title={
            <p>
              Vous n'avez pas accès à ce composant. Veuillez contacter
              l'administrateur pour obtenir l'autorisations.
            </p>
          }
        >
          <Link to={`${path}`}>
            <div
              className={`bp-card ${backGround} ${border} border-0.3 disabled cursor-not-allowed`}
            >
              <span
                className={`badge ${colorText} ${colorbadge} bg-opacity-50  self-start mx-3`}
              >
                {date}
              </span>
              <div
                className={`rounded-full  ${bgColor}  p-3 flex items-center justify-center`}
              >
                <IconMoon color="#fff" name={icon} size={28} />
              </div>
              <div className="bp-card-title">
                <div className={colorText}>
                  <span className="font-black">{title}</span>
                </div>
                <div>
                  <ProgressLinear progress={avancement} color={ProgressColor} />
                </div>
              </div>

              <span
                className={`badge ${colorText}  ${colorbadge} bg-opacity-50 self-end mx-3`}
              >
                {month}
              </span>
            </div>
          </Link>
        </Tooltip>
      ) : (
        <Link to={`${path}`}>
          <div className={`bp-card ${backGround} ${border} border-0.3`}>
            <span
              className={`badge ${colorText} ${colorbadge} bg-opacity-50  self-start mx-3`}
            >
              {date}
            </span>
            <div
              className={`rounded-full  ${bgColor}  p-3 flex items-center justify-center`}
            >
              <IconMoon color="#fff" name={icon} size={28} />
            </div>
            <div className="bp-card-title">
              <div className={colorText}>
                <span className="font-black">{title}</span>
              </div>

              {/*  <ProgressBar
                className={`${progressBar}`}
                now={per}
                label={`${per}%`}
                color="#000"
              /> */}
              <ProgressLinear progress={avancement} color={ProgressColor} />
            </div>

            <span
              className={`badge ${colorText}  ${colorbadge} bg-opacity-50 self-end mx-3`}
            >
              Il y'a {month} mois
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Card;

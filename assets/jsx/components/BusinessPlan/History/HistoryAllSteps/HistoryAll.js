import React, { useEffect } from "react";

import IconMoon from "../../../Icon/IconMoon";
import image from "../../../../../images/temp-user.jpeg";
import Box from "../../../Box/Box";
import partsData from "../data/data";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import ProgressLinear from "../../../ProgressLinear/ProgressLinear";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessPlanHistoryAction } from "../../../../../store/actions/BusinessPlanActions";

const HistoryAll = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const businessPlanInfo = useSelector((state) => state.bp.historyInfo);
  const partenaire = businessPlanInfo?.partenaire;
  const secteur = businessPlanInfo?.secteur;
  const tendance = businessPlanInfo?.tendance;
  const cible = businessPlanInfo?.cible;
  const avancement =
    businessPlanInfo && businessPlanInfo.avancement
      ? businessPlanInfo.avancement
      : 0;
  const selectedProject = localStorage.getItem("selectedProjectId");

  const handleNavigate = (path) => {
    history.push(path);
  };
  useEffect(() => {
    dispatch(getBusinessPlanHistoryAction(selectedProject));
  }, [dispatch, selectedProject]);
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <Header />
        <div className="mb-7">
          <ProgressLinear progress={avancement} color="#EF9118" />
        </div>
        <div className="flex w-full justify-center items-center py-5 ">
          <div className="me-5">
            <div className="flex flex-col justify-between w-full ">
              <>
                {partsData[0] && (
                  <div>
                    <button
                      key={partsData[0].id}
                      className={
                        partenaire
                          ? "bg-light-orange bg-opacity-50 flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2"
                          : "flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2 "
                      }
                      onClick={() => handleNavigate(partsData[0].path)}
                    >
                      <span className="text-xl font-bold">
                        {" "}
                        {partsData[0].title}
                      </span>

                      <IconMoon
                        color={"bg-light-orange bg-opacity-50"}
                        name={"arrow-chevron"}
                        size={14}
                      />
                    </button>
                  </div>
                )}
              </>
              <IconMoon
                className="ms-5"
                color={"bg-light-orange bg-opacity-50"}
                name={"curved-arrow-left"}
                size={150}
              />
              <IconMoon
                className="ms-5"
                color={"bg-light-orange bg-opacity-50"}
                name={"curved-arrow-left-bottom"}
                size={150}
              />
              {partsData[1] && (
                <div>
                  <button
                    key={partsData[1].id}
                    className={
                      cible
                        ? "bg-light-orange bg-opacity-50 flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2"
                        : "flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2 "
                    }
                    onClick={() => handleNavigate(partsData[1].path)}
                  >
                    <span className="text-xl font-bold">
                      {" "}
                      {partsData[1].title}
                    </span>

                    <IconMoon
                      color={"bg-light-orange bg-opacity-50"}
                      name={"arrow-chevron"}
                      size={14}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className=" rounded-full w-medium1 h-mediumm1 me-5
            "
            style={{
              width: "118px",
              height: "118px",
            }}
          >
            <img
              src={image}
              alt="thumbnail"
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="">
            <div className="flex flex-col justify-between w-full ">
              <>
                {partsData[0] && (
                  <div>
                    <button
                      key={partsData[2].id}
                      className={
                        tendance
                          ? "bg-light-orange bg-opacity-50 flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2"
                          : "flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2 "
                      }
                      onClick={() => handleNavigate(partsData[2].path)}
                    >
                      <span className="text-xl font-bold">
                        {" "}
                        {partsData[2].title}
                      </span>

                      <IconMoon
                        color={"bg-light-orange bg-opacity-50"}
                        name={"arrow-chevron"}
                        size={14}
                      />
                    </button>
                  </div>
                )}
                <IconMoon
                  color={"bg-light-orange bg-opacity-50"}
                  name={"curved-arrow-right"}
                  size={150}
                />
              </>

              <IconMoon
                color={"bg-light-orange bg-opacity-50"}
                name={"curved-arrow-right-bottom"}
                size={150}
              />
              {partsData[1] && (
                <div>
                  <button
                    key={partsData[3].id}
                    className={
                      secteur
                        ? "bg-light-orange bg-opacity-50 flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2"
                        : "flex flex-row h-50 w-100 border-1 mb-4 border-light-orange border-opacity-25 rounded-lg py-2 px-4  text-black-1  hover:bg-light-orange hover:text-white hover:bg-opacity-50 justify-center items-center mx-2 "
                    }
                    onClick={() => handleNavigate(partsData[3].path)}
                  >
                    <span className="text-xl font-bold">
                      {" "}
                      {partsData[3].title}
                    </span>

                    <IconMoon
                      color={"bg-light-orange bg-opacity-50"}
                      name={"arrow-chevron"}
                      size={14}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bmc-step-page">
          <button
            className="bmc-page-count"
            // onClick={handleNextStep}
          >
            <Link to="members">
              <IconMoon color="#EF9118" name="arrow-left" size={24} />
            </Link>
          </button>
          <span>
            {3}/{3}
          </span>
        </div>
      </div>
    </div>
  );
};
export default HistoryAll;

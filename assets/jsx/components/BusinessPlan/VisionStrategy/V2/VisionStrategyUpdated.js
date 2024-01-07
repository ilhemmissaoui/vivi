import React, { useEffect, useRef, useState } from "react";
import Box from "../../../Box/Box";
import BouncingDotsLoader from "../BouncingDotsLoader/BouncingDotsLoader";
import SliderVision from "./components/SliderVision";
import { calculateData, calculateMarks, currentYear, getYearId } from "./Utils";
import NewMarkModal from "./components/NewMarkModal";
import { useDispatch, useSelector } from "react-redux";
import { getVisionStrategyAction } from "../../../../../store/actions/BusinessPlanActions";
import { allVisionsSelector } from "../../../../../store/selectors/BusinessPlanSelectors";
import ArrowSlider from "./components/ArrowSlider";
import EyeTabShow from "./components/EyeTabShow";
import TableVision from "./components/TableVision";
import SubHeaderMessage from "../SubHeader/SubHeaderMessage";
// import ProgressLinear from "../../../ProgressLinear/ProgressLinear";
import Header from "../Header/Header";
import IconMoon from "../../../Icon/IconMoon";
import {
  getAllVisionStrategiesForAllYears,
  getAllYearsList,
} from "../../../../../services/BusinessPlanService";
import TableAllYearsVisions from "./components/TableAllYearsVisions";

const VisionStrategyUpdated = () => {
  const [loader, setLoader] = useState(true);
  const [newMarkData, setNewMarkData] = useState(newMark);
  const [initialMarks, setInitialMarks] = useState([]); // Initial marks object
  const [marks, setMarks] = useState([]); // Initial marks object
  const [data, setData] = useState([]); // Initial data object
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [tableAllIsOpen, setTableAllIsOpen] = useState(false);
  const [allYears, setAllYears] = useState(null);
  const [yearTab, setYearTab] = useState(currentYear); // Initial tab index
  const [isOpenNewMarkModal, setIsOpenNewMarkModal] = useState(false);
  const [allVisionsAllYears, setAllVisionsAllYears] = useState([]);

  const newMark = {
    annee: yearTab,
    idVisionStrategies: "",
    dateVisionStrategies: "",
    actionVision: {
      actionDateFin: "",
      action: "",
      cible: "",
    },
    objectifVision: {
      description: "",
    },
    coutVision: {
      cout: "",
    },
  };

  const ended = useSelector((state) => state.project.ended);
  const visionsStrategie = useSelector(allVisionsSelector);
  const [status, setStatus] = useState(false);

  // if (visionsStrategie) {
  //   const avancement =
  //     visionsStrategie && visionsStrategie.VisionStrategieAvancement
  //       ? visionsStrategie.VisionStrategieAvancement
  //       : 0;
  //   let total = visionsStrategie.nbrVisionStrategies;

  //   progress = avancement ? (avancement / total).toFixed(2) : 0;
  // }

  const dispatch = useDispatch();
  const selectedProject = localStorage.getItem("selectedProjectId");

  const visions = useSelector(allVisionsSelector)[0];
  // let progress = visions ? visions.length * 10 : 0;

  useEffect(() => {
    setLoader(true);
    getAllYearsList(selectedProject).then((res) => {
      if (res) {
        setAllYears(res);
        const yearId = getYearId(res, yearTab.toString());
        setNewMarkData(newMark);
        setMarks([]);
        setInitialMarks([]);
        dispatch(
          getVisionStrategyAction({
            projectId: selectedProject,
            yearId: yearId,
          })
        );
        setLoader(false);
      }
    });
    getAllVisionStrategiesForAllYears(selectedProject)
      .then((res) => setAllVisionsAllYears(res.data.VisionStrategiesListeAnnee))
      .catch((err) => console.error(err));
  }, [yearTab, setNewMarkData, selectedProject, status]);

  useEffect(() => {
    if (visions) {
      const marks = calculateMarks(visions);
      setMarks(marks);
      setInitialMarks(marks);
      const myData = calculateData(visions);
      setData(myData);
    }
  }, [visions, yearTab, selectedProject, status]);

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container">
        {loader ? (
          <div className="loader mt-5">
            <BouncingDotsLoader />
          </div>
        ) : (
          <div className="flex flex-col justify-between h-1/2">
            <div className="flex flex-col justify-around">
              <Header />
              <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
                Vous prévoyez ou allez prévoir des actions à mettre en place
                pour développer votre projet. Ces actions peuvent être
                multiples. De la campagne de crowdfunding à la campagne
                publicitaire sur les réseaux sociaux pour ventre votre solution
                aux jalons de développement de votre produits (ex: TRL1, TRL2
                etc.). Indiquez les actions à mener par année (sur autant
                d'année que vous le souhaitez).
              </div>
              <div className="flex justify-center items-center">
                {visions && (
                  <EyeTabShow
                    setTableIsOpen={setTableIsOpen}
                    tableIsOpen={tableIsOpen}
                  >
                    <div title="Les visions de l'année">
                      <IconMoon
                        color="#E73248"
                        name="eye1"
                        size={24}
                        border="#ffff"
                      />
                    </div>
                  </EyeTabShow>
                )}
                <h3 className="px-4 text-[#E73248]">{yearTab}</h3>
                {allVisionsAllYears && (
                  <EyeTabShow
                    setTableIsOpen={setTableAllIsOpen}
                    tableIsOpen={tableAllIsOpen}
                  >
                    <div title="Toutes les visions">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#E73248"
                        className="bi bi-card-list"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      </svg>
                    </div>
                  </EyeTabShow>
                )}

                {/* <ProgressLinear progress={progress} color="#E73248" /> */}
              </div>
              <SubHeaderMessage />
              <div className="relative mx-5">
                <div>
                  <SliderVision
                    setIsOpenNewMarkModal={setIsOpenNewMarkModal}
                    setStatus={setStatus}
                    setNewMarkData={setNewMarkData}
                    marks={marks}
                    initialMarks={initialMarks}
                    setMarks={setMarks}
                    setLoader={setLoader}
                    data={data}
                    visions={visions}
                    setTableIsOpen={setTableIsOpen}
                    viewedYear={yearTab}
                    allYears={allYears}
                    yearTab={yearTab}
                    setYearTab={setYearTab}
                  />
                  <ArrowSlider />
                </div>
              </div>
              {isOpenNewMarkModal &&
                newMarkData?.dateVisionStrategies &&
                !tableIsOpen && (
                  <NewMarkModal
                    setIsOpenNewMarkModal={setIsOpenNewMarkModal}
                    setStatus={setStatus}
                    status={status}
                    newMarkData={newMarkData}
                    setNewMarkData={setNewMarkData}
                    setLoader={setLoader}
                    yearTab={yearTab}
                    allYears={allYears}
                  />
                )}
              {tableIsOpen && visions && (
                <TableVision
                  visions={visions}
                  loader={loader}
                  setLoader={setLoader}
                />
              )}
              {tableAllIsOpen && allVisionsAllYears && (
                <TableAllYearsVisions
                  visions={allVisionsAllYears}
                  loader={loader}
                  setLoader={setLoader}
                />
              )}
            </div>
            <div className="flex justify-center pt-32">
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <button
                    className="flex justify-center items-center"
                    onClick={() => {
                      setNewMarkData(newMark);
                      setYearTab(yearTab - 1);
                      setTableIsOpen(false);
                    }}
                  >
                    <IconMoon
                      className={`m-2 rounded-full px-2 box-icon bg-red-600 ${
                        yearTab != 0 && "hover:bg-my-red"
                      }`}
                      color={"white"}
                      name={"arrow-left"}
                      size={30}
                    />
                    <h6 className="rounded-2xl flex justify-center items-center text-[#E73248] flex-row mb-0">
                      {yearTab - 1}
                    </h6>
                  </button>

                  <button
                    className="flex justify-center items-center"
                    onClick={() => {
                      setNewMarkData(newMark);
                      setYearTab(yearTab + 1);
                      setTableIsOpen(false);
                    }}
                  >
                    <h6 className="rounded-2xl flex justify-center items-center text-[#E73248] flex-row mb-0">
                      {yearTab + 1}
                    </h6>
                    <IconMoon
                      className={`m-2 rounded-full px-2 box-icon bg-red-600 ${
                        yearTab != 0 && "hover:bg-my-red"
                      }`}
                      color={"white"}
                      name={"arrow-right"}
                      size={30}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionStrategyUpdated;

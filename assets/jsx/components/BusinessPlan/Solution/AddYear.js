import React, { useEffect, useState } from "react";
import IconMoon from "../../Icon/IconMoon";
import Box from "../../Box/Box";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import { IconButton, Modal } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import YearPicker from "../../YearPicker/YearPicker";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import BouncingDotsLoader from "../VisionStrategy/BouncingDotsLoader/BouncingDotsLoader";
import {
  addSolutionYearAction,
  getBusinessPlanSolutionsAction,
  getSolutionAllYearsAction,
} from "../../../../store/actions/BusinessPlanActions";
import { getAllYearsList } from "../../../../services/BusinessPlanService";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import "./AddYear.css";
import { getAllSolutionsSelector } from "../../../../store/selectors/BusinessPlanSelectors";

const AddYear = () => {
  const years = useSelector((state) => state.bp.yearsSolution);
  const currentDay = new Date().getDate;
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs(currentYear));
  const selectedProject = localStorage.getItem("selectedProjectId");
  const [status, setStatus] = useState("");
  const history = useHistory();

  const [selectedYear, setSelectedYear] = useState("");
  const [yearToAdd, setYearToAdd] = useState("");

  const { addYearLoading } = useSelector((state) => state.bp);

  const [isAddYearPopupOpen, setIsAddYearPopupOpen] = useState(false);

  const [solutionYears, setSolutionYears] = useState([]);

  const [validationMessage, setValidationMessage] = useState("");

  const [listOfYears, setListOfYears] = useState([]);
  useEffect(() => {
    dispatch(getBusinessPlanSolutionsAction(selectedProject));
  }, [dispatch, selectedProject]);
  const allSolutions = useSelector(getAllSolutionsSelector);
  const solutions = allSolutions?.SolutionListe;
  useEffect(() => {
    dispatch(getSolutionAllYearsAction(selectedProject)).catch((error) => {
      console.error("Error fetching years:", error);
      // Handle error here
    });
  }, [dispatch, selectedProject]);

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));

  const handleAddYear = () => {
    if (!yearToAdd) {
      setValidationMessage("L'année ne peut pas être vide.");
      return;
    }

    if (isNaN(yearToAdd)) {
      setValidationMessage("L'année doit être un nombre.");
      return;
    }

    const isUsedYear = listOfYears.some(
      (year) => year.Name === yearToAdd.toString()
    );
    if (isUsedYear) {
      setValidationMessage("L'année existe déjà dans la liste.");
      return;
    }
    if (validationMessage) {
      return;
    }

    if (yearToAdd < 2020) {
      setValidationMessage("L'année ne doit pas être inférieure à 2020");
      return;
    }
    if (yearToAdd > 2100) {
      setValidationMessage("L'année ne doit pas être supérieure à 2100");
      return;
    }

    dispatch(
      addSolutionYearAction(selectedProject, {
        annee: yearToAdd.toString(),
      })
    )
      .then((response) => {
        setYearToAdd("");
        setValidationMessage("");
        localStorage.setItem("yearId", response.data.idAnneeSolution);
        setIsAddYearPopupOpen(false);
        history.push("add-solution");
      })
      .catch((error) => {});
    setIsAddYearPopupOpen(false);
    setValidationMessage("");
  };

  const handleAddYearSolution = () => {
    history.push("add-solution");
    // dispatch(addSolutionYearAction(selectedProject)).then(() => {
    // history.push("add-solution");
    // });
    /* if (!selectedYear) {
      return;
    } */
    /* const yearHasSolutions = years.AllanneeSolutions.some(
      (yearData) =>
        yearData.annee === selectedYear.toString() &&
        yearData.SolutionListe.length > 0
    );

    if (yearHasSolutions) {
      setValidationMessage(
        `L'année ${selectedYear} a déjà une solution. Vous pouvez consulter la solution en cliquant sur le bouton ci-dessous.`
      );
    } else {
      dispatch(
        addSolutionYearAction(selectedProject, {
          annee: selectedYear.toString(),
        })
      )
        .then((response) => {
          localStorage.setItem("yearId", response.data.idAnneeSolution);
          history.push("add-solution");
        })
        .catch((error) => {});
    } */
  };

  const fetchYears = async () => {
    try {
      const years = await getAllYearsList(selectedProject);

      setListOfYears(years);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, [selectedProject]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setStatus("");
  };

  const handleListOfYears = (years) => {
    setListOfYears(years);
  };

  const toggleAddYearPopup = () => {
    setIsAddYearPopupOpen(!isAddYearPopupOpen);
  };
  const avancement = years && years.avancement ? years.avancement : 0;
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />

      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"NOTRE SOLUTION"}
              color={"bg-banana"}
              iconNameOne={"grid"}
              iconNameTwo={"people-2"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <LightTooltip
            arrow
            placement="top-start"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 500 }}
            title={
              <p>
                Ici, vous pouvez ajouter toutes les situations/activités sources
                de revenus pour votre projet.
                <br />
                Par exemple si vous commercialisez une plateforme web, vous
                pouvez ajouter &#x2039;&#x2039;Plateforme Web
                &#x203A;&#x203A;,l'expliquer en détail, indiquer en quoi elle
                est innovante (si c'est le cas), ainsi que ces points forts (par
                rapport aux solutions de la concurence).
              </p>
            }
          >
            <div className="flex items-center mx-1">
              <div className="p-2 bg-banana bg-opacity-50 rounded-full">
                <IconMoon type="button" color={"white"} name={"i"} size={25} />
              </div>
            </div>
          </LightTooltip>
        </div>
        {/* <ProgressLinear progress={20} color="#FDD691" />
        <div className="flex flex-col items-center mt-10">
          <p className="text-lg text-center text-[#979797]">
            Vous pouvez ajouter autant de vignette que de solution
          </p>
        </div> */}
        <div className="mb-7">
          <ProgressLinear progress={avancement} color="#FDD388" />
        </div>
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
          Ici, vous pouvez ajouter toutes les situations/activités sources de
          revenus pour votre projet.
          <br />
          Par exemple si vous commercialisez une plateforme web, vous pouvez
          ajouter &#x2039;&#x2039;Plateforme Web &#x203A;&#x203A;,l'expliquer en
          détail, indiquer en quoi elle est innovante (si c'est le cas), ainsi
          que ces points forts (par rapport aux solutions de la concurence).
        </div>

        {addYearLoading ? (
          <BouncingDotsLoader />
        ) : (
          <>
            <div className="flex justify-center items-center mt-5 mx-5">
              <div
                className={`flex bmc-box my-5 bg-white flex-col  border-banana border-0.2 px-3 w-[32rem]`}
              >
                {/* <div className="flex flex-col gap-3 md:grid md:grid-cols-6 items-center bg-light-gray rounded my-4 py-3">
                  <YearPicker
                    className="col-span-2"
                    selectedYear={selectedYear}
                    handleYearChange={handleYearChange}
                    listOfYears={listOfYears}
                  />

                  <span className="col-span-3 text-[17px] font-medium">
                    Ajouter une année
                  </span>
                  <IconButton className="col" onClick={toggleAddYearPopup}>
                    <IconMoon name="plus-basic" color="#2C2C2C" size={20} />
                  </IconButton>
                </div> */}

                {
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-6 items-center bg-light-gray rounded my-4 py-3 ">
                    <div className="col-span-2"></div>
                    <span className="col-span-3 text-[17px] font-medium">
                      Ajouter une solution
                    </span>
                    {/*  <LightTooltip
                      className={selectedYear ? "hidden" : ""}
                      arrow
                      placement="top-start"
                      TransitionComponent={Zoom}
                      TransitionProps={{ timeout: 500 }}
                      title={<p>Choisissez une année</p>}
                    > */}
                    <IconButton className="col" onClick={handleAddYearSolution}>
                      <IconMoon name="plus-basic" color="#2C2C2C" size={20} />
                    </IconButton>
                    {/*  </LightTooltip> */}
                  </div>
                }
              </div>
            </div>
            {solutionYears.map((index) => (
              <div key={index} className="solution-card-item">
                <div className="">
                  <div className="rounded-lg px-2 pt-2 h-auto bg-white pb-2 min-h-[92px]">
                    <span className="font-bold text-sm">{item.title}</span>
                    <br />
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-center ">
          {/* <ButtonComponent
            title="Voir toutes les solutions"
            backgroundColor="bg-banana"
            textColor="text-white"
            fontWeight="font-bold"
            fontSize="text-lg"
            borderRadius="rounded-lg"
            padding="px-6 py-4"
            hoverBackgroundColor="hover:bg-yellow-500"
            hoverTextColor="hover:text-white"
            focusRing="focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            disabled={!selectedYear}
            onClick={() => history.push("annees")}
          /> */}
          <button
            className={`text-white bg-banana hover:bg-[rgb(253 214 145 / 1)] font-bold hover:border-none py-2 px-6 rounded-lg focus:outline-none self-center shadow-md ${
              solutions && solutions.length === 0
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
            onClick={() => history.push("annees")}
          >
            Voir toutes les solutions
          </button>
        </div>
      </div>

      <div
        className={`modal fade bd-example-modal-sm ${
          isAddYearPopupOpen ? "show" : ""
        }`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!isAddYearPopupOpen}
        style={{ display: isAddYearPopupOpen ? "block" : "none" }}
        centered="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#f6f6f6" }}>
            <div className="modal-header">
              <h4 className="flex justify-center items-center">
                Ajouter année
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal" // This attribute closes the modal
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  onClick={() => {
                    setIsAddYearPopupOpen(false);
                    setValidationMessage("");
                  }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="flex-col p-4">
              <input
                onChange={(e) => {
                  if (validationMessage) {
                    setValidationMessage("");
                  }
                  setYearToAdd(e.target.value);
                }}
                placeholder="Entrez l'année"
                className="input-style"
                type="number"
                value={yearToAdd}
              />
              {validationMessage && (
                <>
                  <div className="text-sm text-red-500">
                    {validationMessage}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="button-style-annuler"
                onClick={() => {
                  setYearToAdd("");
                  setValidationMessage("");
                  setIsAddYearPopupOpen(false);
                }}
              >
                Annuler
              </button>
              <button className="button-style" onClick={() => handleAddYear()}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddYear;

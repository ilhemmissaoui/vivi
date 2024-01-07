import React, { useState, useEffect } from "react";
import Box from "../../Box/Box";
import IconMoon from "../../Icon/IconMoon";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessPlanHistoryInfoLoaderSelector,
  getBusinessPlanHistorySelector,
  getUpdateMessageHistory,
} from "../../../../store/selectors/BusinessPlanSelectors";
import {
  getBusinessPlanHistoryAction,
  updateBusinessPlanParamAction,
} from "../../../../store/actions/BusinessPlanActions";
import Popup from "./Popup";

import { useHistory } from "react-router-dom";

import { Spinner } from "react-bootstrap";
import Header from "./Header/Header";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const History = () => {
  const [companyPres, setCompanyPres] = useState("");
  const history = useHistory();
  const charCount = companyPres ? companyPres.length : 0;
  const maxLetters = 1000;
  const dispatch = useDispatch();
  const [validationCompleted, setValidationCompleted] = useState(false);

  const businessPlanInfo = useSelector((state) => state.bp.historyInfo);
  const isLoading = useSelector(getBusinessPlanHistoryInfoLoaderSelector);
  const isLoading2 = useSelector((state) => state.project.isloading);

  const [showPopup, setShowPopup] = useState(false);

  const allProjects = localStorage.getItem("allProjects");

  const ended = useSelector((state) => state.project.ended);
  const selectedProject = localStorage.getItem("selectedProjectId");

  const [step, setStep] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const numSteps = 3;
  const isUpdated = useSelector(getUpdateMessageHistory);

  const handleInputChange = (event) => {
    setCompanyPres(event.target.value);
  };
  const [enableEdit, setEnableInput] = useState(true);

  const handleEditClick = () => {
    setEnableInput(!enableEdit);
  };
  const jsonData = { ["presentationSociete"]: companyPres };

  const avancement =
    businessPlanInfo && businessPlanInfo.avancement
      ? businessPlanInfo.avancement
      : 0;

  useEffect(() => {
    let timeout;

    if (showMessage) {
      timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showMessage]);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleUpdateData = () => {
    dispatch(updateBusinessPlanParamAction(selectedProject, jsonData));
    // Display a toast notification
    toast.success("Champ mis à jour !", {
      className: "custom-success-toast",
    });

    setValidationCompleted(true); // Set validation as completed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch();
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
    if (step === 0) {
      handleNavigate({ stepNumber: step });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    dispatch(getBusinessPlanHistoryAction(selectedProject));
  }, [ended]);

  useEffect(() => {
    if (businessPlanInfo) {
      if ("presentationSociete" in businessPlanInfo)
        setCompanyPres(businessPlanInfo["presentationSociete"]);
      else setCompanyPres("");
    } else setCompanyPres("");
  }, [businessPlanInfo]);

  const handleNavigate = (prop) => {
    history.push("history/members", prop);
  };
  const handleOkClick = () => {
    setShowPopup(false);
    // history.push("history/members");
    setValidationCompleted(true);
  };
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <Header />
        <div> </div>
        {isLoading || isLoading2 ? (
          <div className="loader mb-5">
            <Spinner
              animation="border"
              role="status"
              size="md"
              currentcolor="#E73248"
            />
          </div>
        ) : (
          <>
            <div className="mb-5">
              <ProgressLinear progress={avancement} color="#EF9118" />
            </div>
            <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
              La partie &laquo;Histoire et Equipe&raquo; constitue la première
              partie du votre Business Plan. Elle sert à introduire et expliquer
              dans les grandes lignes votre projet(la génèse, comment cette idée
              vous est venue, ce que vous faites et comment vous le faites)
              ainsi que la présentation rapide des membres de votre équipe. Vous
              indiquerez également les tendances de votre marché (est-ce un
              marché en croissance ? etc.), cette partie sert de &laquo;bande
              annonce&raquo; de votre Business Plan, avant de rentrer dans les
              détails dans la catégorie &laquo;Marché et Concurrence&raquo; .
            </div>
            <div className="mt-5">
              {step === 0 ? (
                <div>
                  <label className="text-xl font-normal text-black-1 mx-5 mb-3">
                    <span>Présentation de la société</span>
                  </label>
                  <div className="relative mx-5 mb-5 ">
                    <div className="relative w-full  	">
                      <textarea
                        className="bp-step-input border-inherit "
                        type="text"
                        value={companyPres}
                        onChange={handleInputChange}
                        // disabled={enableEdit}
                        // maxLength={1000}
                      ></textarea>
                      <div className="absolute bottom-0 right-2.5">
                        <div className="bmc-step-count">
                          {/* {charCount}/{maxLetters} */}
                        </div>
                      </div>
                    </div>

                    {/* <div className="inner" onClick={handleEditClick}>
                      <IconMoon
                        className="bmc-edit-icon"
                        color="#959494"
                        name="edit-input"
                      />
                    </div> */}
                  </div>
                  <div className="flex justify-center align-center self-center">
                    {/* <button
                      onClick={handleUpdateData}
                      className="bg-light-orange hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24	 self-center "
                    >
                      Valider
                    </button> */}
                    <button
                      onClick={handleUpdateData}
                      disabled={companyPres?.length === 0}
                      className={`${
                        companyPres?.length === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-light-orange hover:bg-black"
                      } text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center`}
                    >
                      Valider
                    </button>
                  </div>

                  <div>
                    {showPopup && isUpdated && (
                      <div
                        className="popup-container"
                        style={{ marginLeft: "30px" }}
                      >
                        <div className="popup-content">
                          <div className="popup-message">{isUpdated}</div>
                          <button
                            className="popup-close-btn"
                            onClick={handleOkClick}
                          >
                            ok
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bmc-step-page">
                    <button
                      className="bmc-page-count"
                      onClick={handlePrevStep}
                      disabled={step < 1}
                    >
                      {step >= 1 ? (
                        <IconMoon
                          color="##EF9118"
                          name="arrow-left"
                          size={24}
                        />
                      ) : null}
                    </button>
                    <span>
                      {step + 1}/{numSteps}
                    </span>
                    <button
                      onClick={handleNextStep}
                      disabled={companyPres?.length === 0}
                      className={`${
                        companyPres?.length === 0
                          ? "cursor-not-allowed gray-arrow"
                          : "bmc-page-count"
                      }`}
                    >
                      {step < numSteps - 1 ? (
                        <IconMoon
                          color={companyPres?.length === 0 ? "gray" : "#EF9118"}
                          name="arrow-right"
                          size={24}
                        />
                      ) : null}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default History;

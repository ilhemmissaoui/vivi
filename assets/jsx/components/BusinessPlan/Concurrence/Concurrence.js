import React, { useState, useEffect } from "react";
import Box from "../../Box/Box";
import IconMoon from "../../Icon/IconMoon";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessPlanConcurrenceInfoLoaderSelector,
  getBusinessPlanConcurrenceSelector,
  getUpdateMessageConcurrence,
} from "../../../../store/selectors/BusinessPlanSelectors";
import { getBusinessPlanConcurrenceAction } from "../../../../store/actions/BusinessPlanActions";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { useHistory } from "react-router-dom";
import { updateBusinessPlanMarcheConcurrence } from "../../../../services/BusinessPlanService";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Concurrence = () => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));
  const [companyPres, setCompanyPres] = useState("");
  // const [avancement, setAvancement] = useState(0);
  const concurrenceInfo = useSelector((state) => state.bp.concurrenceInfo);
  const avancement = concurrenceInfo.avancement;
  useEffect(() => {
    concurrenceInfo.probleme
      ? setCompanyPres(concurrenceInfo?.probleme)
      : setCompanyPres("");
  }, [concurrenceInfo]);
  const charCount = companyPres ? companyPres.length : 0;
  const maxLetters = 1000;
  const history = useHistory();
  const dispatch = useDispatch();
  const businessPlanInfo = useSelector(getBusinessPlanConcurrenceSelector);
  const isLoading = useSelector((state) => state.project.isloading);
  const isLoading2 = useSelector(getBusinessPlanConcurrenceInfoLoaderSelector);
  const selectedProject = localStorage.getItem("selectedProjectId");
  const selectedProjecttt = useSelector(
    (state) => state.project.selectedProject
  );
  const ended = useSelector((state) => state.project.ended);
  const [step, setStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const numSteps = 2;
  const isUpdated = useSelector(getUpdateMessageConcurrence);
  const handleInputChange = (event) => {
    setCompanyPres(event.target.value);
  };
  const jsonData = { ["probleme"]: companyPres };
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

  const handleUpdateData = async () => {
    const response = await updateBusinessPlanMarcheConcurrence(
      selectedProject,
      jsonData
    );
    //handleShowPopup();
    toast.success("Champ mis à jour !", {
      className: "custom-success-toast",
    });
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
    dispatch(getBusinessPlanConcurrenceAction(selectedProjecttt.id));
  }, [ended]);

  const handleNavigate = (prop) => {
    history.push("/market-competition/societies", prop);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleOkClick = () => {
    setShowPopup(false);
  };
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <div className="mx-5 flex items-center">
          <div className="flex-grow">
            <Box
              title={"MARCHÉ & CONCURRENCE"}
              color={"bg-dark-purple"}
              iconNameOne={"grid"}
              iconNameTwo={"go-up"}
              iconColor={"#fff"}
              titleColor={"text-white"}
            />
          </div>
          <LightTooltip
            arrow
            placement="top-start"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 500 }}
            title={
              <p>
                Dans cette partie, vous pourrez détailler plus précisément à
                quel(s) probléme(s) du marché vous répondez avec votre projet et
                quels sont les concurrents qui répondent(plus ou moins) à ces
                mêmes problémes. Cette partie fait directement suite au module
                &laquo;tendances du marché&raquo; abordé dans la partie Histoire
                & Equipe .
              </p>
            }
          >
            <div className="flex items-center mx-1">
              <div className="p-2 bg-dark-purple rounded-full">
                <IconMoon color={"#fff"} name={"i"} size={25} />
              </div>
            </div>
          </LightTooltip>
        </div>
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
            <div className="mb-7">
              <ProgressLinear progress={avancement} color="#342752" />
            </div>
            <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
              Dans cette partie, vous pourrez détailler plus précisément à
              quel(s) probléme(s) du marché vous répondez avec votre projet et
              quels sont les concurrents qui répondent(plus ou moins) à ces
              mêmes problémes. Cette partie fait directement suite au module
              &laquo;tendances du marché&raquo; abordé dans la partie Histoire &
              Equipe .
            </div>
            {step === 0 ? (
              <div>
                <label className="text-xl font-normal text-black-1 mx-5 mb-3">
                  <span>A quels problèmes/besoins répondez-vous ?</span>
                </label>
                <div className="relative mx-5 mb-5">
                  <div className="relative w-full">
                    <textarea
                      className="bp-step-input border-inherit"
                      type="text"
                      value={companyPres}
                      onChange={handleInputChange}
                      // maxLength={1000}
                    />
                    <div className="absolute bottom-0 right-2.5">
                      <div className="bmc-step-count">
                        {/* {charCount}/{maxLetters} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center align-center self-center">
                  <button
                    onClick={handleUpdateData}
                    disabled={companyPres?.length === 0}
                    className={`${
                      companyPres?.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-dark-purple hover:bg-black"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center`}
                  >
                    Valider
                  </button>
                </div>
                <div>
                  {showPopup && isUpdated && (
                    <div className="popup-container">
                      <div className="popup-content">
                        <div className="popup-message">{isUpdated}</div>
                        <button
                          className="popup-close-btn2"
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
                      <IconMoon color="#342752" name="arrow-left" size={24} />
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
                        color={companyPres?.length === 0 ? "gray" : "#342752"}
                        name="arrow-right"
                        size={24}
                      />
                    ) : null}
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
export default Concurrence;

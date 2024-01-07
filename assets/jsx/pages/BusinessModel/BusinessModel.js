import React, { useState, useEffect } from "react";
import stepsData from "./stepsData";
import BusinessModelStep from "../../components/businessModel/BusinessModelStep";
import IconMoon from "../../components/Icon/IconMoon";
import { Link } from "react-router-dom";
import {
  getBusinessModelInfoLoader,
  getBusinessModelInfoSelector,
} from "../../../store/selectors/BusinessModelSelectors";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessModelInfoAction } from "../../../store/actions/BusinessModelActions";
import Spinner from "react-bootstrap/Spinner";
import BoxCanva from "../../components/Box/BoxCanva";

const BusinessModel = () => {
  const [step, setStep] = useState(0);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  const numSteps = stepsData.length;
  const dispatch = useDispatch();
  const businessModelInfo = useSelector(getBusinessModelInfoSelector);
  const businessModelInfoLoader = useSelector(getBusinessModelInfoLoader);
  const [isValidationCompleted, setIsValidationCompleted] = useState(false);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const selectedprojecttt = useSelector(
    (state) => state.project.selectedProject
  );

  useEffect(() => {
    dispatch(getBusinessModelInfoAction(selectedProject));
  }, [selectedprojecttt]);
  const handleValidationComplete = (isCompleted) => {
    setIsValidationCompleted(isCompleted);
  };
  return (
    <div>
      <BoxCanva
        handlePrevStep={handlePrevStep}
        title={"Business Model Canvas"}
        color="bg-white"
        iconNameOne={"arrow-left"}
        step={step}
      />

      {businessModelInfoLoader ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className="bp-container pb-4">
          <Link to="/business-model-result" className="view-bmc">
            <IconMoon color="#484848" name="eye" size={24} />
          </Link>
          <BusinessModelStep
            data={stepsData[step]}
            bmcInfo={businessModelInfo}
            stepNumber={step + 1}
            handleNextStep={handleNextStep}
            onValidationComplete={handleValidationComplete}
            isLastStep={step === numSteps - 1}
          />
          <div className="bmc-step-page">
            <button
              className="bmc-page-count"
              onClick={handlePrevStep}
              disabled={step < 1}
            >
              {step >= 1 ? (
                <IconMoon color="#484848" name="arrow-left" size={24} />
              ) : null}
            </button>
            <span>
              {step + 1}/{numSteps}
            </span>
            <button
              className="bmc-page-count"
              onClick={handleNextStep}
              // disabled={step >= stepsData.length - 1 || !isValidationCompleted}
            >
              {step < stepsData.length - 1 ? (
                <IconMoon color="#484848" name="arrow-right" size={24} />
              ) : null}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessModel;

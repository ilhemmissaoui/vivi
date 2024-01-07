import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { updateBusinessModelParamAction } from "../../../store/actions/BusinessModelActions";
import { useDispatch, useSelector } from "react-redux";
// import { getUpdateMessage } from "../../../store/selectors/BusinessModelSelectors";
import { useHistory } from "react-router-dom";
import { getBusinessModelInfoAction } from "../../../store/actions/BusinessModelActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getBusinessModelInfoLoader,
  getBusinessModelInfoSelector,
  getUpdateMessage,
} from "../../../store/selectors/BusinessModelSelectors";
import ProgressLinear from "../ProgressLinear/ProgressLinear";
import { getTeamMembers } from "../../../store/selectors/BusinessPlanSelectors";
import { async } from "regenerator-runtime";
const bmcParams = [
  {
    id: 1,
    param: "segmentClient",
  },
  {
    id: 2,
    param: "propositionValeur",
  },
  {
    id: 3,
    param: "canauxDistribution",
  },
  {
    id: 4,
    param: "relationClient",
  },
  {
    id: 5,
    param: "fluxRevenus",
  },
  {
    id: 6,
    param: "resourceCles",
  },
  {
    id: 7,
    param: "activiteCles",
  },
  {
    id: 8,
    param: "partenaireStratedique",
  },
  {
    id: 9,
    param: "structureCouts",
  },
];

const BusinessModelStep = ({
  data,
  bmcInfo,
  stepNumber,
  handleNextStep,
  onValidationComplete,
  isLastStep,
}) => {
  const bmcParam = bmcParams.find((p) => p.id === data.id);
  const paramName = bmcParam.param;
  const businessModelInfoLoader = useSelector(getBusinessModelInfoLoader);
  const [isValidationCompleted, setIsValidationCompleted] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (
      bmcInfo &&
      bmcInfo.busnessModelinfo &&
      bmcInfo.busnessModelinfo[paramName]
    ) {
      setInputValue(bmcInfo.busnessModelinfo[paramName]);
    } else setInputValue("");
  }, [stepNumber]);

  const jsonData = { [paramName]: inputValue };
  const [showPopup, setShowPopup] = useState(false);

  const updateMessage = useSelector(getUpdateMessage);

  const [enableEdit, setEnableInput] = useState(true);

  const charCount = inputValue.length;

  const dispatch = useDispatch();

  const allProjects = localStorage.getItem("allProjects");

  const idProject = allProjects[0];

  const selectedProject = localStorage.getItem("selectedProjectId");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditClick = () => {
    setEnableInput(!enableEdit);
  };

  const handleSubmit = async () => {
    toast.success("Champ mis à jour !", {
      className: "custom-success-toast",
    });
    setEnableInput(!enableEdit);
    if (isLastStep) {
      history.push("/business-model-result");
    } else {
      await dispatch(updateBusinessModelParamAction(selectedProject, jsonData));

      await dispatch(getBusinessModelInfoAction(selectedProject));
    }
  };

  const handleOkClick = () => {
    setShowPopup(false);
    if (isLastStep) {
      history.push("/business-model-result");
    } else {
      dispatch(getBusinessModelInfoAction(selectedProject));
      setIsValidationCompleted(false);
      onValidationComplete(false);
    }
  };
  const avancement = useSelector(getBusinessModelInfoSelector)["avancement"];
  return (
    <>
      <div className="quarter-circle">
        <span className="bmc-step-nb">0{data.id}</span>
        <div className="bmc-step-contain">
          <hr className="bmc-step-line" />
          <span className="bmc-all-step-nb">09</span>
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <div className="bmc-step-img-container">
            <img
              className="h-[220px] w-[240px]"
              src={data.image}
              alt="bmc-step-img"
            />
          </div>
          <div className="bmc-step-content-wrapper">
            <div className="flex justify-center">
              <span className="text-center text-gray-700 font-bold font-roboto text-xl ">
                {data.title}
              </span>
            </div>
            <div className="mb-5">
              <ProgressLinear progress={avancement} color="#514495" />
            </div>

            <div className="bg-[#fff4c9] rounded-md p-4 h-[220px]">
              <p className="bmc-step-content-text">{data.description}</p>
              <ul className="list-disc">
                {data?.liste &&
                  data.liste.map((el) => (
                    <li className="bmc-step-content-text">{el}</li>
                  ))}
              </ul>
            </div>
            <div>
              <div className="bmc-step-input-container">
                <div className="outer">
                  <textarea
                    className="bmc-step-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    // disabled={enableEdit}
                    maxLength={254}
                  ></textarea>
                  <div className="bmc-step-count-container">
                    <div className="bmc-step-count">{charCount}/254</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bmc-step-content-btn-container">
              <Button
                onClick={handleSubmit}
                disabled={inputValue?.length === 0}
                className="bmc-step-content-btn"
              >
                Valider
              </Button>
            </div>
            {/* <div>
              ): (<div className="profile-success-message"></div>) :
            </div> */}
          </div>
        </div>
        <div>
          {showPopup && updateMessage && (
            <div className="popup-container" style={{ marginLeft: "30px" }}>
              <div className="popup-content">
                <div className="popup-message">{updateMessage}</div>
                <button
                  className="popup-close-btn-canva"
                  onClick={handleOkClick}
                >
                  ok
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessModelStep;

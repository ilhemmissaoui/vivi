import React, { useState, useEffect } from "react";
import Box from "../../Box/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessPlanHistoryAction,
  updateBusinessPlanParamAction,
} from "../../../../store/actions/BusinessPlanActions";
import {
  getBusinessPlanHistoryInfoLoaderSelector,
  getBusinessPlanHistorySelector,
  getUpdateMessageHistory,
} from "../../../../store/selectors/BusinessPlanSelectors";
import { Spinner } from "react-bootstrap";
import Header from "./Header/Header";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import IconMoon from "../../Icon/IconMoon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HistoryParts = (props) => {
  const { title, name, description } = props;
  const info = useSelector(getBusinessPlanHistorySelector);
  const history = useHistory();

  const [value, setValue] = useState("");
  const charCount = value ? value?.length : 0;

  const [enableEdit, setEnableInput] = useState(true);

  const maxLetters = 1000;

  const jsonData = { [name]: value };

  const selectedProject = localStorage.getItem("selectedProjectId");

  const isUpdated = useSelector(getUpdateMessageHistory);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(getBusinessPlanHistoryInfoLoaderSelector);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleEditClick = () => {
    setEnableInput(!enableEdit);
  };
  const handleUpdateData = () => {
    dispatch(updateBusinessPlanParamAction(selectedProject, jsonData));
    // Display a toast notification
    toast.success("Champ mis à jour !", {
      className: "custom-success-toast",
    });
  };

  /*  useEffect(() => {
    dispatch(getBusinessPlanHistoryAction(selectedProject));
  }, [dispatch, selectedProject]); */

  useEffect(() => {
    setValue(info && info[name] ? info[name] : "");
  }, [info]);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const businessPlanInfo = useSelector((state) => state.bp.historyInfo);

  const avancement =
    businessPlanInfo && businessPlanInfo.avancement
      ? businessPlanInfo.avancement
      : 0;
  const handleGoBack = () => {
    history.push("history-all");
  };
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <Header />

        {isLoading ? (
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
            <ProgressLinear progress={avancement} color="#EF9118" />

            <label className="text-xl font-normal text-black-1 mx-5 mb-3 text-center">
              <span>{title}</span>
            </label>
            <span className=" font-normal text-black-1 mx-5 mb-3 text-center">
              {description}
            </span>
            <div className="relative mx-5 mb-5 ">
              <div className="relative w-full  	">
                <textarea
                  className="bp-step-input border-inherit "
                  type="text"
                  value={value}
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
              <button
                onClick={handleGoBack}
                className="bg-gray-400 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center me-5"
              >
                <IconMoon
                  className="bg-opacity-50"
                  color="#FFF"
                  name="arrow-left"
                  size={18}
                />
              </button>

              <button
                onClick={handleUpdateData}
                className={`${
                  value?.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-light-orange hover:bg-black"
                } text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center`}
              >
                Valider
              </button>
            </div>
            <div>
              {showPopup && isUpdated && (
                <Popup
                  message={isUpdated}
                  onClose={() => setShowPopup(false)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HistoryParts;

import React from "react";
import IconMoon from "../../../../../Icon/IconMoon";
import {
  addVisionStrategyCompleteAction,
  getVisionStrategyAction,
} from "../../../../../../../store/actions/BusinessPlanActions";
import { useDispatch } from "react-redux";
import { getYearId, newMark } from "../../Utils";

const ArrowTabs = ({
  tab,
  handleTabsChange,
  setLoader,
  newMarkData,
  setNewMarkData,
  yearTab,
  allYears,
  setStatus,
  status,
}) => {
  const selectedProject = localStorage.getItem("selectedProjectId");
  const dispatch = useDispatch();

  //!Add Vision

  const addVision = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      await dispatch(
        addVisionStrategyCompleteAction(selectedProject, newMarkData)
      );
      // Successful deletion
    } catch (error) {
      // Handle error, you can log or display an error message
    } finally {
      dispatch(
        getVisionStrategyAction({
          projectId: selectedProject,
          yearId: getYearId(allYears, yearTab.toString()),
        })
      );
      setStatus(!status);
    }
    setLoader(false);
    setNewMarkData(newMark);
  };
  return (
    <div className="flex justify-center items-center">
      <button disabled={tab === 0} onClick={() => handleTabsChange(tab - 1)}>
        <IconMoon
          className={`m-6  rounded-full px-2 box-icon bg-red-600 ${
            tab != 0 && "hover:bg-my-red"
          }`}
          color={"white"}
          name={"arrow-left"}
          size={36}
        />
      </button>
      {tab === 2 ? (
        <button onClick={addVision} className="mt-[7px]">
          <IconMoon
            className={`rounded-full px-2`}
            color="#15803d"
            name="check"
            size={78}
          />
        </button>
      ) : (
        <button disabled={tab === 2} onClick={() => handleTabsChange(tab + 1)}>
          <IconMoon
            className={`m-6 rounded-full px-2 box-icon bg-red-600 ${
              tab != 2 && "hover:bg-my-red"
            }`}
            color={"white"}
            name={"arrow-right"}
            size={36}
          />
        </button>
      )}
    </div>
  );
};
export default ArrowTabs;

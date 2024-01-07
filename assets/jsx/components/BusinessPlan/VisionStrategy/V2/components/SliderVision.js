import React from "react";
import Slider from "rc-slider";
import { dateFormatInput, getYearId, newMark } from "../Utils";
import IconButton from "@mui/material/IconButton";
import IconMoon from "../../../../Icon/IconMoon";
import { useDateFormat } from "../../../../../../hooks/useDateFormat";
import { dotStyle, handleStyle, railStyle, trackStyle } from "../SliderStyle";
import {
  deleteVisionStrategyByIdAction,
  getVisionStrategyAction,
  selectVisionAction,
} from "../../../../../../store/actions/BusinessPlanActions";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const SliderVision = ({
  setNewMarkData,
  marks,
  initialMarks,
  setMarks,
  data,
  setLoader,
  visions,
  setTableIsOpen,
  viewedYear,
  allYears,
  yearTab,
  setIsOpenNewMarkModal,
}) => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const selectedProject = localStorage.getItem("selectedProjectId");
  const formatDate = useDateFormat();
  const dispatch = useDispatch();

  const handleChangeSlider = (value) => {
    setIsOpenNewMarkModal(true);
    setMarks(initialMarks);
    setTableIsOpen(false);
    const formattedDate = formatDate(new Date(value));
    const isExistingMark = marks[value];
    const selectedMarkData = data[value];
    dispatch(selectVisionAction(selectedMarkData));
    const newMarkPoint = {
      [value]: formattedDate,
    };
    if (!isExistingMark) {
      setMarks((prevMarks) => ({
        ...prevMarks,
        ...newMarkPoint,
      }));
      setNewMarkData({
        ...newMark,
        dateVisionStrategies: dateFormatInput(formattedDate),
        annee: viewedYear,
      });
    }
  };

  const handelDeleteVisionStrategy = async (event, value) => {
    event.preventDefault();
    const selectedMark = data[value];
    setLoader(true);
    try {
      if (selectedMark.idVisionStrategies) {
        await dispatch(
          deleteVisionStrategyByIdAction(
            selectedProject,
            selectedMark.idVisionStrategies
          )
        );
      }
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
      setLoader(false);
    }
    setNewMarkData(newMark);
    const copyMarks = marks;
    delete copyMarks[value];
    setMarks(copyMarks);
  };
  const handleClickSliderMark = (value) => {
    const selectedVision = visions.filter(
      (vision) => vision.idVisionStrategies === data[value].idVisionStrategies
    );
    setNewMarkData(selectedVision[0]);
    setIsOpenNewMarkModal(true);
  };

  return (
    <div className="flex flex-col justify-between items-center mt-5">
      <Slider
        min={new Date(viewedYear, 0, 1).getTime()}
        max={new Date(viewedYear, 11, 31).getTime()}
        step={5}
        onChange={handleChangeSlider}
        marks={Object.keys(marks).reduce((acc, value, index) => {
          acc[value] = {
            label: (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <LightTooltip
                  className="mb-2"
                  onClick={() => handleClickSliderMark(value)}
                  arrow
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 600 }}
                  title={
                    visions &&
                    visions[index] && (
                      <div className="flex justify-center items-center gap-2 p-2">
                        <div
                          className="bg-transparent cursor-pointer"
                          onClick={(e) => handelDeleteVisionStrategy(e, value)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash-fill text-red-600"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </div>
                      </div>
                    )
                  }
                >
                  <div className="relative min-w-[70px] cursor-pointer">
                    <span className="bg-transparent pt-5">{marks[value]}</span>
                  </div>
                </LightTooltip>
                {visions &&
                visions[index] &&
                visions[index]?.actionVision?.action ? (
                  <div className="flex justify-center items-center absolute bottom-12">
                    <div className="text-[#E73248] text-center ml-5">
                      {visions[index].actionVision.action}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ),
            style: {
              position: "absolute",
              transform: "translateX(-50%)",
              zIndex: 1,
            },
          };
          return acc;
        }, {})}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        dotStyle={dotStyle}
        railStyle={railStyle}
      />
    </div>
  );
};

export default SliderVision;

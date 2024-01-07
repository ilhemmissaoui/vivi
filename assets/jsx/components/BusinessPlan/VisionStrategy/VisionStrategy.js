import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Box from "../../Box/Box";
import Header from "./Header/Header";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import SubHeaderMessage from "./SubHeader/SubHeaderMessage";
import {
  addVisionStrategyAction,
  addVisionStrategyTypeByIdAction,
  getVisionStrategyAction,
  selectVisionAction,
  deleteVisionStrategyByIdAction,
  addVisionStrategyCompleteAction,
} from "../../../../store/actions/BusinessPlanActions";
import { useDispatch, useSelector } from "react-redux";
import {
  allVisionsSelector,
  selectedVisionSelector,
} from "../../../../store/selectors/BusinessPlanSelectors";
import { useDateFormat } from "../../../../hooks/useDateFormat";
import IconButton from "@mui/material/IconButton";
import IconMoon from "../../Icon/IconMoon";
import Tooltip from "@mui/material/Tooltip";
import { format, parse, isValid } from "date-fns";
import ActionForm from "./Form/ActionForm";
import ObjectifForm from "./Form/ObjectifForm";
import CostForm from "./Form/CostForm";
import TabPanel from "./Tabs/TabPanel";
import VisionTabs from "./Tabs/VisionTabs/VisionTabs";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";

import BouncingDotsLoader from "./BouncingDotsLoader/BouncingDotsLoader";
import { TableHead } from "@mui/material";
import ArrowTabs from "./Tabs/VisionTabs/ArrowTabs";
import { Button } from "react-bootstrap";
import styled from "@emotion/styled";

const TextOnlyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`color: black;background-color: transparent;`);

const VisionStrategy = () => {
  const [marks, setMarks] = useState([]); // Initial marks object
  const [data, setData] = useState([]); // Initial marks object

  const dispatch = useDispatch();
  const selectedProject = localStorage.getItem("selectedProjectId");
  const visionsStrategie = useSelector(allVisionsSelector);
  const visions = useSelector(allVisionsSelector)[0];
  const [loader, setLoader] = useState(true);
  const formatDate = useDateFormat();
  const today = new Date();

  const VisionStrategieAction3 = visions?.[2];

  const [tab, setTab] = React.useState(0);

  const oneYearsFromNow = new Date();

  oneYearsFromNow.setFullYear(today.getFullYear() + 1);

  const todayDate = today.getTime();

  const max = oneYearsFromNow.getTime();

  const firstMarkKey = Object.keys(marks)[0];

  const firstMarkValue = marks[firstMarkKey];

  const min = firstMarkValue ? new Date(firstMarkValue).getTime() : todayDate;

  const [selectedData, setSelectedData] = useState(null);

  const [startAction, setStartAction] = useState(selectedMarkData);

  const [endAction, setEndAction] = useState("");

  const [cibleAction, setCibleAction] = useState("");

  const [actionAction, setActionAction] = useState("");

  const [startObjectif, setStartObjectif] = useState("");

  const [endObjectif, setEndObjectif] = useState("");

  const [cibleObjectif, setCibleObjectif] = useState("");

  const [actionObjectif, setActionObjectif] = useState("");

  const [startCost, setStartCost] = useState("");

  const [endCost, setEndCost] = useState("");

  const [cibleCost, setCibleCost] = useState("");

  const [actionCost, setActionCost] = useState("");

  const [isSliderClick, setSliderClick] = useState(false);

  const selectedV = useSelector(selectedVisionSelector);

  const [selectedMarkData, setSelectedMarkData] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setSliderClick(false);
    setIsTableVisible(!isTableVisible);
  };

  let progress = 0;

  if (visionsStrategie) {
    const avancement =
      visionsStrategie && visionsStrategie.VisionStrategieAvancement
        ? visionsStrategie.VisionStrategieAvancement
        : 0;
    let total = visionsStrategie.nbrVisionStrategies;

    progress = avancement ? ((avancement / total) * 100).toFixed(2) : 0;
  }

  useEffect(() => {}, [selectedV]);

  useEffect(() => {
    if (visions) {
      const marks = calculateMarks(visions);

      setMarks(marks);
      const myData = calculateData(visions);
      setData(myData);
    }
  }, [visions, visionsStrategie]);

  const formatMyDate = (date) => {
    const formattedDate = formatDate(new Date(date));
    const parsedDate = parse(formattedDate, "dd-MM-yyyy", new Date());
    const formattedStartDate = format(parsedDate, "yyyy-MM-dd");
    return formattedStartDate;
  };

  const handleSliderChange = (value) => {
    setSliderClick(true);
    const formattedDate = formatDate(new Date(value));
    const parsedDate = parse(formattedDate, "dd-MM-yyyy", new Date());

    if (!isValid(parsedDate)) {
      return;
    }
    const formattedStartDate = format(parsedDate, "yyyy-MM-dd");

    const isExistingMark = marks[value];
    const selectedMarkData = data[value];
    setSelectedMarkData(value);
    setSelectedData(selectedMarkData);
    dispatch(selectVisionAction(selectedMarkData));
    const newMark = {
      [value]: formattedDate,
    };

    if (!isExistingMark) {
      setMarks((prevMarks) => ({
        ...prevMarks,
        ...newMark,
      }));
    }

    if (selectedMarkData) {
      setStartAction(
        selectedMarkData.VisionStrategieAction.debut
          ? formatMyDate(selectedMarkData.VisionStrategieAction.debut)
          : formatMyDate(today)
      );

      setEndAction(
        selectedMarkData.VisionStrategieAction.fin
          ? formatMyDate(selectedMarkData.VisionStrategieAction.fin)
          : formatMyDate(today)
      );

      setStartObjectif(
        selectedMarkData.VisionStrategieObjectif.debut
          ? formatMyDate(selectedMarkData.VisionStrategieObjectif.debut)
          : formatMyDate(today)
      );
      setStartCost(
        selectedMarkData.VisionStrategieCout.debut
          ? formatMyDate(selectedMarkData.VisionStrategieCout.debut)
          : formatMyDate(today)
      );
      setActionAction(selectedMarkData.VisionStrategieAction.action);
      setCibleAction(selectedMarkData.VisionStrategieAction.cible);
      setEndObjectif(
        selectedMarkData.VisionStrategieObjectif.fin
          ? formatMyDate(selectedMarkData.VisionStrategieObjectif.fin)
          : formatMyDate(today)
      );
      setActionObjectif(selectedMarkData.VisionStrategieObjectif.action);
      setCibleObjectif(selectedMarkData.VisionStrategieObjectif.cible);
      setEndCost(
        selectedMarkData.VisionStrategieCout.fin
          ? formatMyDate(selectedMarkData.VisionStrategieCout.fin)
          : formatMyDate(today)
      );
      setActionCost(selectedMarkData.VisionStrategieCout.action);
      setCibleCost(selectedMarkData.VisionStrategieCout.cible);
    }
    setSelectedDate(value); // Update the selected date
    setModalOpen;
  };

  useEffect(() => {
    dispatch(getVisionStrategyAction(selectedProject));

    setLoader(false);
  }, [dispatch]);

  const calculateMarks = (visions) => {
    return visions.reduce((acc, item) => {
      const timestamp = new Date(item.dateVisionStrategies).getTime();
      acc[timestamp] = formatDate(new Date(item.dateVisionStrategies));
      return acc;
    }, {});
  };

  const calculateData = (visions) => {
    return visions.reduce((acc, item) => {
      const timestamp = new Date(item.dateVisionStrategies).getTime();
      acc[timestamp] = { ...item }; // Store the entire vision object
      return acc;
    }, {});
  };
  const handleTabsChange = (event, newValue) => {
    setTab(newValue);
  };
  const addAction = (event) => {
    event.preventDefault();
    dispatch(
      addVisionStrategyTypeByIdAction(
        selectedProject,
        selectedData.idVisionStrategies,
        {
          actionDateDebut: startAction,
          actionDateFin: endAction,
          action: actionAction,
          cible: cibleAction,
        },
        "action"
      )
    );
  };

  const addObjectif = (event) => {
    event.preventDefault();
    dispatch(
      addVisionStrategyTypeByIdAction(
        selectedProject,
        selectedData.idVisionStrategies,
        {
          actionDateDebut: startObjectif,
          actionDateFin: endObjectif,
          action: actionObjectif,
          cible: cibleObjectif,
        },
        "objectif"
      )
    );
  };

  const addCost = (event) => {
    event.preventDefault();
    dispatch(
      addVisionStrategyTypeByIdAction(
        selectedProject,
        selectedData.idVisionStrategies,

        {
          actionDateDebut: startCost,
          actionDateFin: endCost,
          action: actionCost,
          cible: cibleCost,
        },
        "cout"
      )
    );
  };

  //!Add Vision
  const addVision = (event) => {
    event.preventDefault();
    dispatch(
      addVisionStrategyCompleteAction(selectedProject, {
        dateVisionStrategies: startAction,
        actionVision: {
          actionDateFin: endAction,
          action: actionAction,
          cible: cibleAction,
        },
        objectifViosin: {
          actionDateFin: endObjectif,
          action: actionObjectif,
          cible: cibleObjectif,
        },
        coutVision: {
          actionDateFin: endCost,
          action: actionCost,
          cible: cibleCost,
        },
      })
    );
  };

  const handleStartActionChange = (e) => {
    setStartAction(e.target.value);
  };
  const handleEndActionChange = (e) => {
    setEndAction(e.target.value);
  };
  const handleActionActionChange = (e) => {
    setActionAction(e.target.value);
  };
  const handleCibleActionChange = (e) => {
    setCibleAction(e.target.value);
  };

  const handleStartObjectifChange = (e) => {
    setStartObjectif(e.target.value);
  };
  const handleEndObjectifChange = (e) => {
    setEndObjectif(e.target.value);
  };
  const handleActionObjectifChange = (e) => {
    setActionObjectif(e.target.value);
  };
  const handleCibleObjectifChange = (e) => {
    setCibleObjectif(e.target.value);
  };

  const handleStartCostChange = (e) => {
    setStartCost(e.target.value);
  };
  const handleEndCostChange = (e) => {
    setEndCost(e.target.value);
  };
  const handleActionCostChange = (e) => {
    setActionCost(e.target.value);
  };
  const handleCibleCostChange = (e) => {
    setCibleCost(e.target.value);
  };

  const handleAddVisionStrategy = () => {
    setLoader(true);

    dispatch(
      addVisionStrategyAction(selectedProject, {
        dateVisionStrategies: marks[selectedMarkData],
      })
    )
      .then((data) => {})
      .catch((error) => {})
      .finally(() => {
        dispatch(getVisionStrategyAction(selectedProject));

        setLoader(false);
      });
  };

  const handelDeleteVisionStrategy = async () => {
    setLoader(true);

    try {
      await dispatch(
        deleteVisionStrategyByIdAction(
          selectedProject,
          selectedData.idVisionStrategies,
          {
            dateVisionStrategies: marks[selectedMarkData],
          }
        )
      );

      // Successful deletion
    } catch (error) {
      // Handle error, you can log or display an error message
    } finally {
      dispatch(getVisionStrategyAction(selectedProject));
    }
    setLoader(false);
  };

  const [currentVisionIndex, setCurrentVisionIndex] = useState(0);

  // ... Rest of the code ...

  const visionsPerPage = 1; // Display one vision per page

  const handlePrevVision = () => {
    if (currentVisionIndex > 0) {
      setCurrentVisionIndex(currentVisionIndex - 1);
    }
  };

  const handleNextVision = () => {
    if (currentVisionIndex < visions.length - 1) {
      setCurrentVisionIndex(currentVisionIndex + 1);
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === "prev") {
      setCurrentVisionIndex(Math.max(currentVisionIndex - 1, 0));
    } else if (direction === "next") {
      setCurrentVisionIndex(
        Math.min(currentVisionIndex + 1, visions.length - visionsPerPage)
      );
    }
  };

  const handleDateClick = (value) => {
    const selectedVision = data[value];
    if (selectedVision) {
      const selectedVisionIndex = visions.findIndex(
        (vision) =>
          vision.idVisionStrategies === selectedVision.idVisionStrategies
      );
      if (selectedVisionIndex !== -1) {
        setCurrentVisionIndex(selectedVisionIndex);
        setSelectedV(selectedVision.idVisionStrategies); // Set the selected vision
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState(0); // Initial tab index

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalTabChange = (event, newValue) => {
    setModalTab(newValue);
  };
  const arrowModalTabChange = (newValue) => {
    if (newValue === 2) {
      setModalTab(0);
    } else {
      setModalTab(newValue);
    }
  };

  const handleMarkClick = (value) => {
    setSliderClick(false);
    setSelectedMarkData(value);
    setSliderClick(true);
    setModalTab(0); // Set the initial tab index
    setModalOpen(true);
  };

  return (
    <div>
      <div className="bp-container pb-32">
        <Header />

        {loader ? (
          <div className="loader mb-5">
            <BouncingDotsLoader />
          </div>
        ) : (
          <>
            <ProgressLinear progress={progress} color="#E73248" />
            <SubHeaderMessage />
            <div className="flex justify-between items-center mx-5 mt-5">
              <Slider
                min={min ? min : todayDate}
                max={max}
                onClick={modalOpen}
                marks={Object.keys(marks).reduce((acc, value) => {
                  acc[value] = {
                    label: (
                      <Tooltip
                        placement="top"
                        leaveDelay={6000}
                        PopperProps={{
                          sx: {
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "transparent",
                              marginBottom: "-14px",
                            },
                          },
                        }}
                        title={
                          <div className="bg-transparent ml-2">
                            <IconButton
                              style={{
                                padding: 0,
                                background: "none",
                                cursor: "pointer",
                                marginTop: "27px",
                              }}
                              onClick={() => handelDeleteVisionStrategy()}
                            >
                              <IconMoon
                                color="#FDD388" // Set the icon color
                                name="trash"
                                size={15}
                              />
                            </IconButton>
                            <IconButton
                              style={{
                                background: "none",
                                cursor: "pointer",
                                marginTop: "30px",
                                padding: 0,
                              }}
                              onClick={handleAddVisionStrategy}
                            >
                              <IconMoon
                                color="#15803d"
                                name="check"
                                size={30}
                              />
                            </IconButton>
                          </div>
                        }
                        onClick={(value) => handleMarkClick(value)}
                      >
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <span>{marks[value]}</span>
                        </div>
                      </Tooltip>
                    ),
                    style: {
                      position: "absolute",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                    },
                  };
                  return acc;
                }, {})}
                onChange={handleSliderChange}
                trackStyle={{
                  backgroundColor: "transparent",
                  height: 7,
                  opacity: 0.5,
                }}
                handleStyle={{
                  height: 20,
                  width: 20,
                  borderRadius: "50%",
                  borderColor: "#E73248",
                  borderWidth: "0.25rem",
                  marginTop: "-6px",
                }}
                dotStyle={{
                  borderColor: "#E73248",
                  borderWidth: "0.25rem",
                  borderRadius: "50%",
                  height: 20,
                  width: 20,
                  cursor: "pointer",
                  bottom: "-10px",
                }}
                railStyle={{ backgroundColor: "#FFD9DE", height: 10 }}
              />
              <div className="ml-3 mt-2">
                <button
                  onClick={toggleTableVisibility}
                  className="flex flex-col justify-items-end"
                >
                  <IconMoon
                    color="#E73248"
                    name="eye1"
                    size={20}
                    border="#ffff"
                  />
                </button>
              </div>
            </div>

            {isSliderClick && selectedV ? (
              <div className="flex justify-center items-center mt-20">
                <div className="w-auto border-2 rounded border-[#FFD9DE]">
                  <VisionTabs
                    tab={modalTab}
                    handleTabsChange={handleModalTabChange}
                  />
                  <TabPanel value={modalTab} index={0}>
                    {/* Form for Tab 1 */}
                    <ActionForm
                      addAction={handleAddVisionStrategy}
                      startAction={startAction}
                      endAction={endAction}
                      actionAction={actionAction}
                      cibleAction={cibleAction}
                      handleStartActionChange={handleStartActionChange}
                      handleEndActionChange={handleEndActionChange}
                      handleActionActionChange={handleActionActionChange}
                      handleCibleActionChange={handleCibleActionChange}
                    />
                  </TabPanel>
                  <TabPanel value={modalTab} index={1}>
                    {/* Form for Tab 2 */}
                    <ObjectifForm
                      addObjectif={addObjectif}
                      startObjectif={startObjectif}
                      endObjectif={endObjectif}
                      actionObjectif={actionObjectif}
                      cibleObjectif={cibleObjectif}
                      handleStartObjectifChange={handleStartObjectifChange}
                      handleEndObjectifChange={handleEndObjectifChange}
                      handleActionObjectifChange={handleActionObjectifChange}
                      handleCibleObjectifChange={handleCibleObjectifChange}
                    />
                  </TabPanel>
                  <TabPanel value={modalTab} index={2}>
                    {/* Form for Tab 3 */}
                    <CostForm
                      addCost={addCost}
                      startCost={startCost}
                      endCost={endCost}
                      actionCost={actionCost}
                      cibleCost={cibleCost}
                      handleStartCostChange={handleStartCostChange}
                      handleEndCostChange={handleEndCostChange}
                      handleActionCostChange={handleActionCostChange}
                      handleCibleCostChange={handleCibleCostChange}
                    />
                  </TabPanel>
                  {/* <button onClick={closeModal}>Close Modal</button> */}
                  {modalTab === 2 && (
                    <div className="flex justify-center items-center my-3">
                      <Button
                        onClick={addVision}
                        className="calendar-btn btn btn-primary"
                      >
                        Ajouter
                      </Button>
                    </div>
                  )}
                  <ArrowTabs tab={modalTab} handleTabsChange={setModalTab} />
                </div>
              </div>
            ) : null}
            {isTableVisible && (
              <div
                style={{
                  width: "-80%",
                  marginTop: "50px",
                }}
              >
                <Table
                  style={{
                    marginLeft: "70px",
                    width: "80%",
                    height: "333px",

                    flexShrink: 0,
                    borderRadius: "10px",
                    border: "1px solid #FCE6E9",
                    background: "#FFF",
                  }}
                >
                  <TableHead>
                    <TableRow
                      style={{
                        textAlign: "center",
                        color: "#595959",
                        fontFeatureSettings: "'clig' off, 'liga' off",
                        fontFamily: "Roboto",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "143%" /* 18.59px */,
                        letterSpacing: "0.17px",
                        borderRadius: "10px 10px 0px 0px",
                        background: "#FFF8F8",
                        width: "auto",
                      }}
                    >
                      <TableCell>vision</TableCell>

                      <TableCell>type</TableCell>
                      <TableCell>Début</TableCell>
                      <TableCell>Fin</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Cible</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visions
                      ?.slice(
                        currentVisionIndex,
                        currentVisionIndex + visionsPerPage
                      )
                      .map((vision, index) => (
                        <React.Fragment key={index}>
                          <TableRow
                            onClick={() => handleVisionClick(vision.id)}
                          >
                            <TableCell>
                              {formatMyDate(vision.dateVisionStrategies)}
                            </TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>
                              {vision.VisionStrategieAction.debut || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieAction.fin || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieAction.action || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieAction.cible || "x"}
                            </TableCell>
                          </TableRow>
                          <TableRow key={`objectif-${index}`}>
                            <TableCell>
                              {formatMyDate(vision.dateVisionStrategies)}
                            </TableCell>
                            <TableCell>Objectif</TableCell>
                            <TableCell>
                              {vision.VisionStrategieObjectif.debut || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieObjectif.fin || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieObjectif.action || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieObjectif.cible || "x"}
                            </TableCell>
                          </TableRow>
                          <TableRow key={`cout-${index}`}>
                            <TableCell>
                              {formatMyDate(vision.dateVisionStrategies)}
                            </TableCell>
                            <TableCell>Cout</TableCell>
                            <TableCell>
                              {vision.VisionStrategieCout.debut || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieCout.fin || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieCout.action || "x"}
                            </TableCell>
                            <TableCell>
                              {vision.VisionStrategieCout.cible || "x"}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                  </TableBody>
                </Table>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center", //
                    marginLeft: "1400px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => handleArrowClick("prev")}
                  >
                    &larr;
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      color: "#595959",
                      fontFeatureSettings: "'clig' off, 'liga' off",
                      fontFamily: "Roboto",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "143%" /* 18.59px */,
                      letterSpacing: "0.17px",
                      borderRadius: "10px 10px 0px 0px",
                      background: "#FFF8F8",
                    }}
                  >
                    Vision {currentVisionIndex + 1} of {visions.length}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={() => handleArrowClick("next")}
                  >
                    &rarr;
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default VisionStrategy;

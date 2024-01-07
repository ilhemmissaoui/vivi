import React, { useEffect } from "react";
import Box from "../../Box/Box";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import IconMoon from "../../Icon/IconMoon";
// import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import flech from "../../../../images/flech.svg";
import { useHistory } from "react-router-dom";
import {
  getPositioning,
  getBPPositioningLoaderSelector,
  addPositioningLoaderSelector,
} from "../../../../store/selectors/BusinessPlanSelectors";
import Zoom from "@mui/material/Zoom";
import {
  addPositioningAction,
  deletePositioningAction,
  getBusinessPlanAllPositioningAction,
  editPositioningAction,
} from "../../../../store/actions/BusinessPlanActions";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";

const Positioning = () => {
  const selectedProject = localStorage.getItem("selectedProjectId");
  const dispatch = useDispatch();
  const allPositioning = useSelector(getPositioning);
  const avancemet =
    useSelector(getPositioning).PositionnementConcurrentielAvancement;
  const [besoins, setBesoins] = useState([]);
  const [heightLeftContent, setheightLeftContent] = useState(60);
  const [rightSlotsContent, setRightSlotsContent] = useState(
    Array(7).fill(null)
  );

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));

  useEffect(() => {
    dispatch(getBusinessPlanAllPositioningAction(selectedProject));
  }, [dispatch, selectedProject]);

  useEffect(() => {
    const tableNull = Array(7).fill(null);
    allPositioning &&
      allPositioning.besoin?.forEach((el) => {
        tableNull[el.position - 1] = el;
      });
    setRightSlotsContent(tableNull);
  }, [allPositioning]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (besoins.length < 12) {
        setheightLeftContent(heightLeftContent + 70);
        const newItem = {
          id: Date.now().toString(),
          name: event.target.value.trim(),
        };

        setBesoins([...besoins, newItem]);
        event.target.value = "";
      }
    }
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    setBesoins(besoins.filter((el) => el.id != id));
  };

  const handleDelete2 = (idBesoin, position) => {
    const newRightSlotsContent = [...rightSlotsContent];
    newRightSlotsContent[position - 1] = null;
    setRightSlotsContent(newRightSlotsContent);
    dispatch(deletePositioningAction(selectedProject, idBesoin));
  };

  // const avancement = useSelector(getBPPositioningLoaderSelector)[
  //   "PositionnementConcurrentielAvancement"
  // ];

  //progress barr calcul
  let progress = 0;
  if (avancemet) {
    progress = ((avancemet / 100) * 100).toFixed(2);
  }

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = Number(result.destination.droppableId);

    if (
      (result.destination.droppableId === "besoinsList") &
      (result.source.droppableId != "besoinsList")
    ) {
      setBesoins([...besoins, rightSlotsContent[sourceIndex]]);
      const newRightSlotsContent = [...rightSlotsContent];
      newRightSlotsContent[sourceIndex] = null;
      setRightSlotsContent(newRightSlotsContent);
      const idBesoin = rightSlotsContent[sourceIndex].id;
      await dispatch(deletePositioningAction(selectedProject, idBesoin));
      return;
    }

    if (
      (result.source.droppableId === result.destination.droppableId) ===
      "besoinsList"
    ) {
      const items = Array.from(besoins);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setBesoins(items);
      return;
    }
    if (
      result.source.droppableId != "besoinsList" &&
      result.destination.droppableId != "besoinsList"
    ) {
      const newRightSlotsContent = [...rightSlotsContent];
      if (!rightSlotsContent[destinationIndex]) {
        newRightSlotsContent[destinationIndex] =
          newRightSlotsContent[sourceIndex];
        newRightSlotsContent[sourceIndex] = null;
        setRightSlotsContent(newRightSlotsContent);
        const besoin = {
          id: rightSlotsContent[sourceIndex].id,
          position: destinationIndex + 1,
        };
        await dispatch(editPositioningAction(selectedProject, besoin));
        return;
      } else {
        const besoin1 = {
          id: rightSlotsContent[destinationIndex].id,
          position: rightSlotsContent[sourceIndex].position,
        };
        const besoin2 = {
          id: rightSlotsContent[sourceIndex].id,
          position: rightSlotsContent[destinationIndex].position,
        };
        const x = rightSlotsContent[sourceIndex];
        newRightSlotsContent[sourceIndex] = rightSlotsContent[destinationIndex];
        newRightSlotsContent[destinationIndex] = x;
        setRightSlotsContent(newRightSlotsContent);
        await dispatch(editPositioningAction(selectedProject, besoin1));

        await dispatch(editPositioningAction(selectedProject, besoin2));
        return;
      }
    }

    if (
      !rightSlotsContent[destinationIndex] &&
      result.destination.droppableId != "besoinsList"
    ) {
      const newRightSlotsContent = [...rightSlotsContent];

      newRightSlotsContent[destinationIndex] = besoins[sourceIndex];

      const newPositioning = {
        name: besoins[sourceIndex].name,
        position: destinationIndex + 1,
      };
      setRightSlotsContent(newRightSlotsContent);
      setBesoins(besoins.filter((_, i) => i != sourceIndex));

      await dispatch(addPositioningAction(selectedProject, newPositioning));

      return;
    }
  };

  const handleNextStep = () => {
    if (allPositioning.besoin.length) {
      handleNavigate();
    }
  };

  const handleNavigate = () => {
    history.push("/positionnement/positionnement_two");
  };
  const history = useHistory();
  const numSteps = 3;

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32 min-h-[800px]">
        <div className="mx-5 mb-7 flex items-center">
          <div className="flex-grow">
            <Box
              title={"POSITIONNEMENT CONCURRENTIEL"}
              color={"bg-yellow"}
              iconNameOne={"grid"}
              iconNameTwo={"people"}
              iconColor={"#fff"}
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
                Cette partie est faite pour vous amener à confronter les
                besoins/problèmes du marché de vos clients expliqués dans la
                partie &#x2039;&#x2039; Marché et Concurrence &#x203A;&#x203A; à
                la manière dont vous y répondez vous et vos concurrents. L'idée
                est, pour chaque besoin client, d'attribuer une note qui
                indiquera à quel point vous répondez à ce même besoin par
                rapport à vos concurrents. Cela vous donnera une idée assez
                précise de la manière dont vous êtes positionnés par rapport à
                vos concurrents.
              </p>
            }
          >
            <div className="flex items-center mx-1">
              <div className="p-2 bg-yellow  rounded-full">
                <IconMoon color={"#fff"} name={"i"} size={25} />
              </div>
            </div>
          </LightTooltip>
        </div>
        <div className="mb-5">
          <ProgressLinear progress={progress} color="#F7D44B" />
        </div>
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 mt-4 mb-7">
          Cette partie est faite pour vous amener à confronter les
          besoins/problèmes du marché de vos clients expliqués dans la partie
          &#x2039;&#x2039; Marché et Concurrence &#x203A;&#x203A; à la manière
          dont vous y répondez vous et vos concurrents.
          <br />
          L'idée est, pour chaque besoin client, d'attribuer une note qui
          indiquera à quel point vous répondez à ce même besoin par rapport à
          vos concurrents. Cela vous donnera une idée assez précise de la
          manière dont vous êtes positionnés par rapport à vos concurrents.
        </div>

        <div className="my-6">
          {/* <ProgressLinear progress={progress} color="#342752" /> */}
          <p className="flex text-center justify-center items-center opacity-40">
            Ajouter et nommer les besoins client à partir du champs ci-dessous
            (Créer un besoin...).
          </p>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 mx-10">
            <div className="flex-col">
              <h2 className="text-start my-4"> Ajouter un besoin</h2>
              <Form.Control
                type="text"
                onKeyPress={handleKeyPress}
                className="form-control1 input-default mb-3 w-[350px] xl:w-[450px] md:w-[400px] md:ml-6"
                placeholder="Créer un besoin..."
              />

              <div>
                <Droppable droppableId="besoinsList">
                  {(provided) => (
                    <div
                      className={`flex flex-col h-[${heightLeftContent}px]`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {besoins.length > 0 &&
                        besoins.map((el, index) => {
                          return (
                            el && (
                              <Draggable
                                key={el.id}
                                draggableId={`entré-${index}`}
                                index={index}
                              >
                                {(provided) => (
                                  <LightTooltip
                                    title="Faites glisser votre besoin dans le tableau &#128073;"
                                    followCursor
                                  >
                                    <div
                                      className="input-scroll1 w-[250px] xl:w-[350px] md:w-[300px] md:ml-6 bg-yellow mb-4 flex items-center text-center justify-between"
                                      key={index}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      {el.name}
                                      <button
                                        onClick={(e) => handleDelete(el.id, e)}
                                        type="button"
                                      >
                                        <IconMoon
                                          color="#000"
                                          name="xmark-solid"
                                          size={15}
                                        />
                                      </button>
                                    </div>
                                  </LightTooltip>
                                )}
                              </Draggable>
                            )
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            <div className=" colContent flex-col">
              {" "}
              <h2 className="text-start mt-4 mb-[76px]">
                Hiérarchiser les besoins
              </h2>
              <div className="besionContent flex flex-row">
                <img src={flech} alt="fleche" className="max-h-[460px]" />
                <div className="listBesoin flex flex-col justify-between max-h-[460px]">
                  {rightSlotsContent.map((el, index) => {
                    return (
                      <Droppable
                        className="droppable"
                        key={index}
                        droppableId={`${index}`}
                        direction="vertical"
                      >
                        {(provided) => (
                          <div className="flex flex-row text-center h-[50px]">
                            <h2 className="text-[#ff8000]">{index + 1}</h2>
                            <div
                              className="besoin w-[250px] xl:w-[350px] md:w-[300px] flex items-center text-center justify-between h-[20px]"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {el && (
                                <Draggable
                                  key={el.id}
                                  draggableId={`${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      className="input-scroll3 w-full flex items-center text-center justify-between"
                                      key={index}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      {el.name}
                                      <button
                                        onClick={() =>
                                          handleDelete2(el.id, el.position)
                                        }
                                        type="button"
                                      >
                                        <IconMoon
                                          color="#000"
                                          name="xmark-solid"
                                          size={15}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              )}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
        <div>
          <div>
            <div></div>
            <div className="bmc-step-page">
              <span>
                {1}/{numSteps}
              </span>
              <button
                className="bmc-page-count"
                onClick={() => handleNextStep()}
              >
                {allPositioning.besoin && allPositioning.besoin.length ? (
                  <IconMoon color="#F7D44B" name="arrow-right" size={24} />
                ) : (
                  <IconMoon color="#C0C0C0" name="arrow-right" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Positioning;

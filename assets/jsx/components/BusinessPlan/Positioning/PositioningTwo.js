import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "../../Box/Box";
import { Button, Dropdown, Modal, ModalFooter } from "react-bootstrap";
import IconMoon from "../../Icon/IconMoon";
import {
  getPositioning,
  getBPPositioningLoaderSelector,
  addPositioningLoaderSelector,
} from "../../../../store/selectors/BusinessPlanSelectors";
import {
  getBusinessPlanAllPositioningAction,
  addConcurrencePositioningAction,
  getBusinessPlanAllSocietiesAction,
  addCollaboratorAction,
  getBusinessPlanTeamMembersAction,
  deleteConcurrencePositioningAction,
  addConcurrencePositioningProjetAction,
} from "../../../../store/actions/BusinessPlanActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { async } from "regenerator-runtime";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

// import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import {
  addConcurrencePositioningProjet,
  addSocietyBesoin,
  getAllPositioning,
  getAllSocieties,
  getAllSocietiesPositionnement,
  getSocietyPositioning,
} from "../../../../services/BusinessPlanService";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";

const PositioningTwo = () => {
  const isAddingLoading = useSelector(addPositioningLoaderSelector);
  let progress = 0;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getSocietiesLoader = useSelector(
    (state) => state.bp.getSocietiesLoading
  );
  const getDataLoader = useSelector(
    (state) => state.bp.isGetPositioningLoading
  );

  const selectAllProjecttt = useSelector(
    (state) => state.project.selectedProject
  );
  const Positioning = useSelector(getPositioning);
  const allPositioning = Positioning.besoin;
  const selectedProject = localStorage.getItem("selectedProjectId");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  const [concurrent, setConcurrent] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [logo, setLogo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [society, setSociety] = useState([]);
  const [volume, setVolume] = useState("1");
  const [selectedBesoinId, setSelectedBesoinId] = useState(null);
  const [selectedSocietyId, setSelectedSocietyId] = useState(null);
  const [allSocieties, setAllSocieties] = useState([]);
  const [positioning, setPositioning] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose3 = () => setShow3(false);
  const avancement =
    useSelector(getPositioning).PositionnementConcurrentielAvancement;
  if (avancement) {
    progress = ((avancement / 100) * 100).toFixed(2);
  }

  const numSteps = 3;

  const handleNextStep = () => {
    history.push("positionnement_two/positionnement_three");
  };
  const handlePrevStep = () => {
    history.push("/positionnement");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch(getBusinessPlanAllPositioningAction(selectedProject));
  }, [dispatch, selectedProject]);

  useEffect(() => {
    setPositioning(allPositioning);
  }, [allPositioning]);

  useEffect(() => {
    dispatch(getBusinessPlanAllSocietiesAction(selectedProject));
  }, [dispatch, selectedProject]);

  const listSocieties = async () => {
    try {
      setLoading(true);
      const response = await getSocietyPositioning(selectedProject);

      if (response.status == 200) {
        setSociety(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    listSocieties();
    getAllSocietiesPositionnement(selectedProject).then((res) => {
      if (res) {
        setAllSocieties(res?.data?.listeSociete);
      }
    });
  }, [selectedProject]);

  const handleShow = (idBesoin, idSociete, name, loogoo) => {
    setSelectedBesoinId(idBesoin);
    setSelectedSocietyId(idSociete);
    setName(name);
    setVolume("1");
    setLogo(loogoo);
    setShow(true);
  };

  // ajout concurrent note/volume
  const handleShow2 = (volume, idBesoin, idSociete, name, loogoo) => {
    if (volume == undefined) {
      setVolume("1");
    } else {
      setVolume(volume);
    }
    setSelectedBesoinId(idBesoin);
    setSelectedSocietyId(idSociete);
    setName(name);
    setLogo(loogoo);
    setShow(true);
  };
  // ajout concurrent note/volume pour un projet
  const handleShow1 = (volume, idBesoin, idSociete, name, loogoo) => {
    setVolume(volume);
    setSelectedBesoinId(idBesoin);
    setSelectedSocietyId(idSociete);
    setName(name);
    setLogo(loogoo);
    setShow1(true);
  };
  const handleSubmit = async () => {
    const volumes = {
      besoinId: selectedBesoinId,
      societyId: selectedSocietyId,
      name: name,
      volume: volume,
    };
    setConcurrent((prevConcurrent) => [...prevConcurrent, volumes]);
    try {
      dispatch(
        addConcurrencePositioningAction(
          selectedProject,
          selectedBesoinId,
          selectedSocietyId,
          volumes
        )
      );
    } catch (error) {}
    handleClose();
  };

  const handleSubmit1 = async () => {
    const volumes = {
      besoinId: selectedBesoinId,
      societyId: selectedSocietyId,
      name: name,
      volume: volume,
    };
    setConcurrent((prevConcurrent) => [...prevConcurrent, volumes]);
    try {
      dispatch(
        addConcurrencePositioningProjetAction(
          selectedProject,
          selectedBesoinId,
          selectedSocietyId,
          volumes
        )
      );
    } catch (error) {}
    handleClose1();
  };

  const handleSubmit3 = async () => {
    const volumes = {
      besoinId: selectedBesoinId,
      societyId: selectedSocietyId,
      name: name,
      volume: volume,
    };
    setConcurrent((prevConcurrent) => [...prevConcurrent, volumes]);
    try {
      dispatch(
        deleteConcurrencePositioningAction(
          selectedProject,
          selectedBesoinId,
          selectedSocietyId,
          volumes
        )
      );
    } catch (error) {}
    handleClose3();
  };
  //checkbox ajouter un concurrent
  const handleCheckboxChange = async (user) => {
    const selectedSocietyId = user.id;
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.includes(user.id)
        ? prevSelectedMembers.filter((id) => id !== user.id)
        : [user.id]
    );

    if (!selectedMembers.includes(user.id)) {
      try {
        await addSocietyBesoin(selectedProject, selectedSocietyId);

        setLoading(true);
        const response = await getAllSocietiesPositionnement(selectedProject);
        setAllSocieties(response?.data?.listeSociete);

        await listSocieties();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {}, [allSocieties]);
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));
  const handleOpenModal = () => {
    if (allSocieties?.length === 0 || !allSocieties) {
      setIsModalOpen(true);
    }
  };
  const toggleDropdown = () => {
    if (allSocieties?.length > 0) {
      setIsOpen(!isOpen);
    }
  };
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
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
          Cette partie est faite pour vous amener à confronter les
          besoins/problèmes du marché de vos clients expliqués dals la partie
          &#x2039;&#x2039; Marché et Concurrence &#x203A;&#x203A; à la manière
          dont vous y répondez vous et vos concurrents.
          <br />
          L'idée est, pour chaque besoin client, d'attribuer une note qui
          indiquera à quel point vous répondez à ce même besoin par rapport à
          vos concurrents. Cela vous donnera une idée assez précise de la
          manière dont vous êtes positionnés par rapport à vos concurrents.
        </div>

        <span
          className="text-gray-400 
           py-3 text-center"
        >
          Cliquer sur le + ci-dessous pour ajouter un concurrent
        </span>
        {isLoading ? (
          <div className="text-center ">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <div className="h-700 mt-5 mx-auto  p-5" style={{ width: "90%" }}>
              {/* {!allSocieties ? (
                <div class="alert alert-primary" role="alert">
                  Afin de pouvoir attribuer des notes à vos concurrents, vous
                  devez tout d'abord les ajouter en utilisant ce lien{" "}
                  <a href="/market-competition/societies" class="alert-link">
                    VIVITOOL
                  </a>
                </div>
              ) : ( */}
              <div className="flex flex-row">
                <Grid container>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="col md-4">Besoins</TableCell>

                            <>
                              {society.listeSociete
                                ? society.listeSociete.map((element, index) => (
                                    <TableCell align="center" key={index}>
                                      {element.name}
                                    </TableCell>
                                  ))
                                : null}
                            </>
                          </TableRow>
                        </TableHead>
                        <>
                          <TableBody>
                            {positioning?.map((besoin, rowIndex) => (
                              <TableRow key={rowIndex}>
                                <TableCell
                                  className="font-bold"
                                  style={{ borderBottomWidth: "0.5px" }}
                                >
                                  {besoin?.name}
                                </TableCell>

                                {society.listeSociete
                                  ? society.listeSociete.map(
                                      (society, colIndex) => {
                                        const concurrent =
                                          besoin?.concurrent?.find(
                                            (concurrent) =>
                                              concurrent.societe == society.id
                                          );

                                        return (
                                          <TableCell
                                            className="flex justify-center items-center"
                                            style={{
                                              paddingTop: "50px",
                                              borderBottomWidth: "0.5px",
                                              height: "100px",
                                            }}
                                            key={colIndex}
                                            align="center"
                                          >
                                            <div className="relative group">
                                              <div className="relative">
                                                <Tooltip
                                                  arrow
                                                  placement="top"
                                                  PopperProps={{
                                                    sx: {
                                                      "& .MuiTooltip-tooltip": {
                                                        backgroundColor:
                                                          "white",
                                                        marginBottom: "1px",
                                                      },
                                                    },
                                                  }}
                                                  title={
                                                    <div className="bg-transparent shadow-md p-2 rounded-sm">
                                                      <IconButton
                                                        style={{
                                                          padding: 0,
                                                          background: "white",
                                                          cursor: "pointer",
                                                          marginTop: "1px",
                                                        }}
                                                        onClick={() =>
                                                          handleShow2(
                                                            concurrent?.volume,
                                                            besoin.id,
                                                            society.id,
                                                            society.name,
                                                            society.logo
                                                          )
                                                        }
                                                      >
                                                        <IconMoon
                                                          className="bg-slate-50 font-bold"
                                                          color="rgb(247, 212, 75)"
                                                          name="edit-input"
                                                          size={17}
                                                        />
                                                      </IconButton>
                                                      {/* <IconButton
                                                          style={{
                                                            padding: 0,
                                                            background: "none",
                                                            cursor: "pointer",
                                                            marginTop: "27px",
                                                          }}
                                                          onClick={() =>
                                                            handleShow3(
                                                              concurrent.volume,
                                                              besoin.id,
                                                              society.id,
                                                              society.name,
                                                              society.logo
                                                            )
                                                          }
                                                        >
                                                          <IconMoon
                                                            color="rgba(112, 112, 112, 0.1)"
                                                            name="trash"
                                                            size={20}
                                                          />
                                                        </IconButton> */}
                                                    </div>
                                                  }
                                                >
                                                  {concurrent?.volume ? (
                                                    <input
                                                      className="range blue w-108.94 h-1.5 rounded-full mb-2"
                                                      type="range"
                                                      min="1"
                                                      max="10"
                                                      value={concurrent?.volume}
                                                      style={{
                                                        background: `linear-gradient(to right, #FE1711 0%, #FF1B00 20%, #FF7F00 40%, #FFC500 60%, #A5F700 80%, #62A300 100%)`,
                                                      }}
                                                      id="inputrange"
                                                    />
                                                  ) : (
                                                    <div>Ajouter une note</div>
                                                  )}
                                                  <div className=" mt-2 pt-3">
                                                    {concurrent?.volume ? (
                                                      <p className="relative">
                                                        {concurrent?.volume}
                                                      </p>
                                                    ) : null}
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                          </TableCell>
                                        );
                                      }
                                    )
                                  : null}
                              </TableRow>
                            ))}
                          </TableBody>
                        </>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>

                <Dropdown
                  className="sidebar-dropdown-container"
                  show={isOpen}
                  onToggle={toggleDropdown}
                  onClick={() => handleOpenModal()}
                >
                  <Dropdown.Toggle
                    className="sidebar-dropdown-icon"
                    id="dropdown-basic"
                  >
                    <IconMoon
                      className="plus-icon"
                      color="#F7D44B"
                      name="plus1"
                      size={32}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ width: "200px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {allSocieties &&
                      Array.isArray(allSocieties) &&
                      allSocieties?.map((element) => (
                        <Dropdown.Item key={element.id}>
                          <label>
                            <input
                              style={{ marginRight: "15px" }}
                              type="checkbox"
                              checked={selectedMembers.includes(element.id)}
                              onChange={() => handleCheckboxChange(element)}
                            />
                            {element.name}
                          </label>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        )}
        <div>
          <div></div>
          <div className="bmc-step-page">
            <button className="bmc-page-count" onClick={handlePrevStep}>
              <IconMoon color="#F7D44B" name="arrow-left" size={24} />
            </button>
            <span>
              {2}/{numSteps}
            </span>
            {society.listeSociete && society.listeSociete.length ? (
              <button className="bmc-page-count" onClick={handleNextStep}>
                <IconMoon color="#F7D44B" name="arrow-right" size={24} />
              </button>
            ) : (
              <button className="bmc-page-count">
                <IconMoon color="#C0C0C0" name="arrow-right" size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div
          className={`modal fade bd-example-modal-sm ${
            isModalOpen ? "show" : ""
          }`}
          tabIndex="-1"
          role="dialog"
          aria-hidden={!isModalOpen}
          style={{ display: isModalOpen ? "block" : "none" }}
          centered="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="flex justify-center items-center">
                  Tu seras redirigé vers la page 'Liste des concurrents' pour
                  pouvoir ajouter un nouveau concurrent.
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    aria-hidden="true"
                    onClick={() => setIsModalOpen(false)}
                  >
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-footer">
                <button
                  className="buttonn-style-annuler"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  className="buttonn-style"
                  onClick={() => history.push("/market-competition/societies")}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Modal show={show} onHide={handleClose} style={{ top: "40%" }} size="sm">
        <Modal.Header closeButton>
          <div className="flex text-center items-center">
            <img src={logo} alt="logo" className="w-14 rounded-full mr-3" />
            <div>{name}</div>
          </div>
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <div>
            <p className="volumeNumber" style={{ bottom: "20px" }}>
              {volume}
            </p>
            <input
              className="range blue w-108.94 h-1.5 rounded-full"
              onChange={(e) => setVolume(e.target.value)}
              type="range"
              min="1"
              max="10"
              value={volume}
              style={{
                background: `linear-gradient(to right, #FE1711 0%, #FF1B00 20%, #FF7F00 40%, #FFC500 60%, #A5F700 80%, #62A300 100%)`,
              }}
              id="inputrange"
            />
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button
            variant="primary"
            style={{
              backgroundColor: "#001D6E",
              color: "white",
              padding: "6px 3px",
            }}
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        show={show1}
        onHide={handleClose1}
        style={{ top: "40%" }}
        size="sm"
      >
        <Modal.Header closeButton>
          <div className="flex text-center items-center">
            <img src={logo} alt="logo" className="w-14 rounded-full mr-3" />
            <div>{name}</div>
          </div>
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <div>
            <p className="volumeNumber" style={{ bottom: "20px" }}>
              {volume}
            </p>
            <input
              className="range blue w-108.94 h-1.5 rounded-full"
              onChange={(e) => setVolume(e.target.value)}
              type="range"
              min="1"
              max="10"
              value={volume}
              style={{
                background: `linear-gradient(to right, #FE1711 0%, #FF1B00 20%, #FF7F00 40%, #FFC500 60%, #A5F700 80%, #62A300 100%)`,
              }}
              id="inputrange"
            />
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button
            variant="primary"
            style={{
              backgroundColor: "#001D6E",
              color: "white",
              padding: "6px 3px",
            }}
            onClick={handleSubmit1}
          >
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        show={show3}
        onHide={handleClose3}
        style={{ top: "40%" }}
        size="sm"
      >
        <Modal.Body className="flex justify-center items-center">
          <div>
            <p className="volumeNumber" style={{ bottom: "20px" }}>
              Are you sure you want to delete
            </p>
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button
            variant="primary"
            style={{
              backgroundColor: "#001D6E",
              color: "white",
              padding: "6px 3px",
            }}
            onClick={handleSubmit3}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default PositioningTwo;

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActivitySelector,
  getAllActivityLoadingSelector,
} from "../../../../../store/selectors/BusinessPlanSelectors";
import {
  addActivityAction,
  AddMontantAnneeAction,
  addActivityLoaderAction,
  addMontantAnneeLoaderAction,
  getAllActivityAction,
  deleteActivityAction,
  deleteMontantAnneeAction,
} from "../../../../../store/actions/BusinessPlanActions";

import { editMonthsValue } from "../../../../../services/BusinessPlanService";

import ConfirmationModal from "../ChiffreAffaire/ConfirmationModal";

import IconMoon from "../../../Icon/IconMoon";
import Box from "../../../Box/BoxFinancement";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@material-ui/core";
import Spinner from "react-bootstrap/Spinner";

import ListYearsModal from "../ListYearsModal";
import classNames from "classnames";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const ChiffreAffaire = () => {
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddAnneeNameModal, setShowAddAnneeNameModal] = useState(false);
  const [showListeAnne, setShowListeAnne] = useState(false);
  const [colomnsNames, setColomnsNames] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [names, setNames] = useState("");
  const [data, setData] = useState([]);
  const [chiffreAffaireListe, setChiffreAffaireListe] = useState([]);
  const [montantAnneeListe, setMontantAnneeListe] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);
  const [valeur, setValeur] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [activityValidationMessage, setActivityValidationMessage] =
    useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [listOftYears, setListOftYears] = useState([]);
  const dispatch = useDispatch();
  const allData = useSelector(getAllActivitySelector);
  const allchiffreAffaireListe = allData.chiffreAffaireListe;
  const allmontantAnneeListe = allData.montantAnneeListe;
  const allvalueListe = allData.valueListe;
  const isLoadingAllchiffreAffaireListe = useSelector(
    getAllActivityLoadingSelector
  );
  const load = useSelector((state) => state.project.isloading);

  const selectedprojecttt = useSelector(
    (state) => state.project.selectedProject
  );

  const [showinput, setShowinput] = useState(false);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const handleAddActivityClick = () => {
    if (!names.trim()) {
      setActivityValidationMessage("  Champ obligatoire.");
      return;
    }
    setActivityValidationMessage("");

    const activityExists = chiffreAffaireListe.some(
      (idChiffreAffaire) => idChiffreAffaire.name === names.trim()
    );

    if (activityExists) {
      setActivityValidationMessage("L'activité existe déjà.");
      return;
    }

    setActivityValidationMessage("");

    const name = {
      activiteName: names.trim(),
    };
    setNames("");
    setShowAddActivityModal(false);

    const newRow = {
      id: allchiffreAffaireListe.length,
      column1: name.activiteName,
      column2: "",
      hasButton: true,
    };

    setData((prevData) => [...prevData, newRow]);
    setChiffreAffaireListe((prevchiffreAffaireListe) => [
      ...prevchiffreAffaireListe,
      name,
    ]);

    dispatch(addActivityAction(selectedProject, name));
    dispatch(addActivityLoaderAction(true));
  };

  const handleAddMontantAnnee = () => {
    if (!colomnsNames.trim()) {
      setValidationMessage("Veuillez entrer un nom valide pour l'année.");
      return;
    }
    const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(colomnsNames)) {
      setValidationMessage("Veuillez entrer une année valide au format YYYY.");
      return;
    }

    const year = parseInt(colomnsNames, 10);
    if (year < 2004) {
      setValidationMessage("Veuillez entrer une année à partir de 2004.");
      return;
    }

    const maxYear = montantAnneeListe.reduce((max, montant) => {
      const montantYear = parseInt(montant.name, 10);
      return montantYear > max ? montantYear : max;
    }, 0);

    if (year <= maxYear) {
      setValidationMessage(
        "Veuillez entrer une année supérieure à celle déjà ajoutée."
      );
      return;
    }
    const yearExists = montantAnneeListe.some(
      (montant) => montant.name === colomnsNames.trim().toUpperCase()
    );

    if (yearExists) {
      setValidationMessage(
        "L'année existe déjà. Veuillez en choisir une autre."
      );
      return;
    }
    const colomnsName = {
      montantName: colomnsNames.trim().toUpperCase(),
    };
    setColomnsNames("");
    setShowAddAnneeNameModal(false);
    setValidationMessage("");

    const newColomn = {
      id: allmontantAnneeListe.length,
      column1: colomnsName.montantName,
      column2: "",
      hasButton: true,
    };

    setData((prevData) => [...prevData, newColomn]);
    setMontantAnneeListe((prevMontantAnneeListe) => [
      ...prevMontantAnneeListe,
      colomnsName,
    ]);

    dispatch(AddMontantAnneeAction(selectedProject, colomnsName));
    dispatch(addMontantAnneeLoaderAction(true));
  };

  ///////////

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };

  const handleOpenAddActivityModal = () => {
    setActivityValidationMessage("");
    setShowAddActivityModal(true);
  };

  const handleOpenListeAnne = () => {
    setShowListeAnne(true);
  };

  const handleCloseListeAnne = () => {
    setShowListeAnne(false);
  };

  const [cellsValue, setCellsValue] = useState({
    idChiffreAffaire: "",
    idMontant: "",
  });

  const handleOpenConfirmationModal = (
    idChiffreAffaire,
    idMontant,
    monthId
  ) => {
    localStorage.setItem("idChiffreAffaire", idChiffreAffaire);
    localStorage.setItem("montant", idMontant);
    setCellsValue({ idChiffreAffaire, idMontant, monthId });

    setShowConfirmationModal(true);
  };

  useEffect(() => {
    dispatch(getAllActivityAction(selectedProject));
  }, [selectedprojecttt]);

  useEffect(() => {
    if (allData && allData.chiffreAffaireListe) {
      setChiffreAffaireListe(allData.chiffreAffaireListe);
    }
    if (allData && allData.montantAnneeListe) {
      setMontantAnneeListe(allData.montantAnneeListe);
    }
  }, [allData]);

  const renderValeur = (idChiffreAffaire, montant) => {
    let test = allvalueListe.find(
      (x) =>
        x.chiffreAffaireActiviteId == idChiffreAffaire &&
        x.montantAnneeId == montant
    );
    if (test) {
      return test.Valeur;
    } else {
      return 0;
    }
  };

  const handleDeleteActivity = (id) => {
    dispatch(deleteActivityAction(selectedProject, id));
  };

  const handleDeleteMontantAnnee = (montantId) => {
    dispatch(deleteMontantAnneeAction(selectedProject, montantId));
  };

  const handleEditMonthValue = (
    id_ChiffreAffaire,
    id_Montant,
    MonthsValue_id
  ) => {
    localStorage.getItem("response");

    dispatch(
      editMonthsValue(
        selectedProject,
        id_ChiffreAffaire,
        id_Montant,
        MonthsValue_id
      )
    );
  };

  const updateListOftYears = (newListOftYears) => {
    setListOftYears(newListOftYears);
  };
  return (
    <div>
      <div>
        <Box title={"BUSINESS PLAN"} color="bg-white" />
        <div className="bp-container h-auto pb-5">
          <div className="mx-5 mb-15 flex items-center">
            <div className="flex-grow">
              <Box
                title={"FINANCEMENT & CHARGES"}
                color={"bg-light-purple"}
                iconNameOne={"grid"}
                iconNameTwo={"charge"}
                iconColor={"#fff"}
                titleColor={"text-white"}
              />
              <div className="flex justify-center items-center flex-col my-4 text-4xl font-bold mb-4">
                Chiffre d'affaires
              </div>
            </div>

            <div
              className="flex items-center mx-1"
              style={{ marginTop: "-4rem" }}
            >
              <div className="p-2 bg-light-purple rounded-full">
                <IconMoon color={"#fff"} name={"i"} size={25} />
              </div>
            </div>
          </div>

          {isLoadingAllchiffreAffaireListe || load ? (
            <div className="loader mb-5">
              <Spinner
                animation="border"
                role="status"
                size="md"
                currentcolor="#E73248"
              />
            </div>
          ) : (
            <div>
              <div className="flex">
                <div
                  className="table-responsive"
                  style={{ width: "95%", marginLeft: "50px" }}
                >
                  <>
                    <TableContainer component={Paper}>
                      <Table style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                textAlign: "left",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "17px",
                                fontWeight: "bold",
                                paddingLeft: "45px",
                              }}
                            >
                              ACTIVITÉ
                            </TableCell>

                            {montantAnneeListe.map((montant) => (
                              <TableCell
                                key={montant.id}
                                style={{
                                  border: "1px solid rgba(112, 112, 112, 0.1)",
                                  fontSize: "20px",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "50%" }}></div>
                                  <div style={{ width: "50%" }}>
                                    {montant.name || montant.montantName}
                                  </div>
                                  <div
                                    style={{
                                      width: "16%",
                                      marginBottom: "-6px",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        handleDeleteMontantAnnee(montant.id)
                                      }
                                    >
                                      <IconMoon
                                        color="rgba(112, 112, 112, 0.1)"
                                        name="trash"
                                        size={22}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {chiffreAffaireListe.map((idChiffreAffaire) => (
                            <TableRow key={idChiffreAffaire.id}>
                              <TableCell>
                                <div style={{ display: "flex" }}>
                                  <div
                                    style={{
                                      width: "25%",
                                      fontFamily: "Roboto",
                                      fontSize: "17px",
                                      opacity: 0.4,
                                      paddingLeft: "27px",
                                    }}
                                  >
                                    {idChiffreAffaire.name ||
                                      idChiffreAffaire.activiteName}
                                  </div>
                                  <div style={{ flex: "1" }}></div>
                                  <div style={{ width: "4%" }}></div>
                                  <div
                                    style={{
                                      width: "4%",
                                      marginBottom: "-6px",
                                      marginTop: "-5px",
                                    }}
                                  >
                                    <button
                                      className="p-2 bg-color: #959494 text-white font-bold opacity-50"
                                      onClick={() =>
                                        handleDeleteActivity(
                                          idChiffreAffaire.id
                                        )
                                      }
                                    >
                                      <IconMoon
                                        color="rgba(112, 112, 112, 0.1)"
                                        name="trash"
                                        size={20}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </TableCell>
                              {montantAnneeListe.map((montant) => (
                                <TableCell
                                  key={montant.id}
                                  style={{
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    fontSize: "17px",
                                    fontFamily: "Roboto, sans-serif",
                                    textAlign: "center",
                                  }}
                                >
                                  <div>
                                    {idChiffreAffaire.column2 &&
                                    idChiffreAffaire.column2[montant.id] ? (
                                      <>
                                        {idChiffreAffaire.hasButton && (
                                          <div style={{ display: "flex" }}>
                                            <div style={{ width: "20%" }}></div>
                                            <div style={{ width: "70%" }}>
                                              {renderValeur(
                                                idChiffreAffaire.id,
                                                montant.id
                                              )}
                                            </div>
                                            <div style={{ width: "10%" }}>
                                              <button
                                                onClick={() =>
                                                  handleOpenConfirmationModal(
                                                    idChiffreAffaire.id,
                                                    montant.id
                                                  )
                                                }
                                              >
                                                <IconMoon
                                                  color="#707070"
                                                  name="edit-input1"
                                                  size={20}
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <div style={{ display: "flex" }}>
                                        <div style={{ width: "20%" }}></div>
                                        <div style={{ width: "60%" }}>
                                          {/* {isLoading ? (
                                              <p>Loading...</p>
                                            ) : ( */}
                                          <div>
                                            {renderValeur(
                                              idChiffreAffaire.id,
                                              montant.id
                                            )}
                                          </div>
                                          {/* )} */}
                                        </div>
                                        <div style={{ width: "20%" }}>
                                          <button
                                            onClick={() =>
                                              handleOpenConfirmationModal(
                                                idChiffreAffaire.id,
                                                montant.id
                                              )
                                            }
                                          >
                                            <IconMoon
                                              color="#707070"
                                              name="edit-input1"
                                              size={24}
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#edf1f9",
                                textAlign: "left",
                                fontSize: "17px",
                                fontFamily: "Roboto",
                                paddingLeft: "40px",
                              }}
                            >
                              Chiffre d'affaires total
                            </TableCell>
                            {montantAnneeListe.map((montant) => (
                              <TableCell
                                key={montant.id}
                                style={{
                                  border: "1px solid rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#edf1f9",
                                  textAlign: "center",
                                  fontSize: "17px",
                                  fontFamily: "Roboto",
                                  fontWeight: "bold",
                                }}
                              >
                                {chiffreAffaireListe.reduce(
                                  (sum, idChiffreAffaire) =>
                                    sum +
                                    renderValeur(
                                      idChiffreAffaire.id,
                                      montant.id
                                    ),
                                  0
                                )}
                                €
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  </>
                </div>

                <div className="flex items-center">
                  <button
                    className="p-2 bg-color: #959494 rounded-full"
                    onClick={handleOpenListeAnne}
                    // onAfterClick={() => setUpdateClicked(true)}
                  >
                    <IconMoon color="#514495" name="plus1" size={30} />
                  </button>
                </div>
              </div>
              <div className="flex items-start mt-3 ml-7">
                <button
                  type="button"
                  className="ml-6 bg-[#514495] hover:bg-[#51449589] text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={handleOpenAddActivityModal}
                >
                  Ajouter une activité
                </button>
              </div>
            </div>
          )}

          <ConfirmationModal
            show={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            handleOpenConfirmationModal={() => setShowConfirmationModal(true)}
            itemId={selectedItemId}
            columnIndex={selectedColumnIndex}
            setValeurProp={setValeur}
            setSelectedItemId={setSelectedItemId}
            setSelectedColumnIndex={setSelectedColumnIndex}
            cellsValue={cellsValue}
          />

          <Modal
            show={showAddActivityModal}
            onHide={() => {
              handleCloseAddActivityModal();
              setValidationMessage("");
            }}
            dialogClassName="modal-lg"
            centered
          >
            <div>
              <Modal.Header closeButton />
              <form>
                <div className="modal-header">
                  <div className="text-center w-100">
                    <h4
                      className="uppercase fs-26 font-bold"
                      style={{ color: "#514495" }}
                    >
                      Ajouter une activité
                    </h4>
                  </div>
                </div>
                <div
                  className="modal-body"
                  style={{ padding: "1.8rem 0.5rem" }}
                >
                  <div className="form-group mb-3 w-[80%]">
                    <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                      Nom de l'activité
                    </label>
                    <div className="contact-name">
                      <input
                        type="text"
                        className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                        autoComplete="off"
                        name="name"
                        required="required"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        placeholder="Ajouter un nom"
                      />
                      {activityValidationMessage && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#ff5555",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            fontSize: "14px",
                          }}
                        >
                          {activityValidationMessage}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <div className="form-group mb-2   w-100">
                    <div className="contact-name ">
                      <input
                        type="text"
                        className="rounded-xl p-2 mb-2 w-full"
                        autoComplete="off"
                        name="Nom"
                        required="required"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        placeholder="Nom de l'activité"
                      />

                      {activityValidationMessage && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: "24%",
                            transform: "translateX(-50%)",
                            padding: "5px 10px",
                            fontSize: "14px",
                            color: "#e73248",
                          }}
                        >
                          {activityValidationMessage}
                        </span>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="modal-footer">
                  <div className="text-center w-100">
                    <button
                      type="button"
                      onClick={handleAddActivityClick}
                      className="bg-[#514495] text-white font-bold py-1 px-4 rounded focus:outline-none"
                    >
                      Valider
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>

          <Modal
            show={showListeAnne}
            onHide={handleCloseListeAnne}
            dialogClassName="modal-sm"
            centered
          >
            <div className="modal-content">
              <form>
                <Modal.Header closeButton>
                  <div className="text-center w-full">
                    <h4 style={{ color: "#514495" }}> Liste des années</h4>
                  </div>
                </Modal.Header>
                <div className="flex flex-col items-center justify-center p-2">
                  <ListYearsModal
                    selectedYears={selectedYears}
                    setSelectedYears={setSelectedYears}
                    yearsList={listOftYears}
                    updateListOftYears={updateListOftYears}
                    year={montantAnneeListe}
                  />
                  <div className="form-group">
                    <button
                      className="p-2 bg-color: #959494 rounded-full"
                      onClick={(e) => {
                        e.preventDefault(), setShowinput(!showinput);
                      }}
                    >
                      <IconMoon color="#514495" name="plus1" size={30} />
                    </button>
                  </div>
                </div>
                {showinput && (
                  <div className="mx-6 py-4">
                    <label className="text-black font-w500">
                      Entrer la nouvelle année
                    </label>
                    <div className="contact-name">
                      <input
                        type="number"
                        className="form-group w-full rounded-xl p-2"
                        autoComplete="off"
                        name="année"
                        value={colomnsNames}
                        onChange={(e) => setColomnsNames(e.target.value)}
                        min={new Date().getFullYear()}
                        max={2100}
                        step={1}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                )}
                <div className="modal-footer">
                  <div className="text-center w-100">
                    <button
                      type="button"
                      className={classNames(
                        "bg-[#514495] text-white font-bold py-2 px-4 rounded"
                        /* {
                          "bg-gray-500":
                            selectedYears.length === 0 || !colomnsNames,
                        } */
                      )}
                      onClick={() => {
                        handleCloseListeAnne();
                        selectedYears.forEach((year) => {
                          dispatch(
                            AddMontantAnneeAction(selectedProject, {
                              montantName: year,
                            })
                          );
                        });
                        colomnsNames && handleAddMontantAnnee();
                      }}
                      /* disabled={selectedYears.length === 0 && !colomnsNames} */
                      style={{ marginRight: "6px" }}
                    >
                      Valider
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ChiffreAffaire;

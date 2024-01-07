import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  addExternalChargeAction,
  getAllExternalChargesAction,
  addExternalChargeMontantAction,
  deleteExternalChargeAction,
  deleteOneYearExternalChargeAction,
} from "../../../../../store/actions/BusinessPlanActions";
import {
  getAllExternalChargesSelector,
  getAllExternalChargesloading,
} from "../../../../../store/selectors/BusinessPlanSelectors";
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
import { Modal, Spinner } from "react-bootstrap";
import Box from "../../../Box/Box";
import IconMoon from "../../../Icon/IconMoon";
import ProgressLinear from "../../../ProgressLinear/ProgressLinear";
import ChargeExterneModal from "../ExternalCharges/ChargeExterneModal";
import ListYearsModal from "../ListYearsModal";
import { setYear } from "date-fns";

const ExternalCharges = () => {
  const [showListeAnne, setShowListeAnne] = useState(false);
  const [showinput, setShowinput] = useState(false);

  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddAnneeModal, setShowAddAnneeModal] = useState(false);
  const [data, setData] = useState([]);
  const [names, setNames] = useState("");
  const [annees, setAnnes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ChargeExt, setChargeExt] = useState([]);
  const [montantAnnee, setMontantAnnee] = useState([]); // Change from {} to []
  const [showChargeExterneModal, setShowChargeExterneModal] = useState(false);
  const [cellsValue, setCellsValue] = useState({
    idChargeExt: "",
    idMontant: "",
  });

  const [listYears, setListYears] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const load = useSelector((state) => state.project.isloading);

  const selectedprojecttt = useSelector(
    (state) => state.project.selectedProject
  );

  const [validationMessage, setValidationMessage] = useState("");
  const [activityValidationMessage, setActivityValidationMessage] =
    useState("");

  const dispatch = useDispatch();
  const allData = useSelector(getAllExternalChargesSelector);
  const allChargeExt = allData.ChargeExt;
  const allMontantAnnee = allData?.montantAnneeListe?.montantAnnee || [];

  const isLoadingAllExternalChargesList = useSelector(
    getAllExternalChargesloading
  );

  const valuerList = allData.valeurListe;

  const selectedProject = localStorage.getItem("selectedProjectId");

  useEffect(() => {
    dispatch(getAllExternalChargesAction(selectedProject));
  }, [selectedprojecttt]);

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };
  const handleOpenAddActivityModal = () => {
    setShowAddActivityModal(true);
  };
  const handleOpenAddAnneeModal = () => {
    setShowAddAnneeModal(true);
  };
  const handleOpenListeAnne = () => {
    setShowListeAnne(true);
  };

  const handleCloseListeAnne = () => {
    setShowListeAnne(false);
  };

  const handleAddActivityClick = () => {
    if (!selectedCategory || !names.trim()) {
      // Check if the category or names input is empty
      setActivityValidationMessage(
        "Veuillez remplir à la fois la catégorie et les noms"
      );
      return; //
    }

    const yearChargeExtExists = ChargeExt.some(
      (charge) => charge.name === names.trim()
    );
    if (yearChargeExtExists) {
      setActivityValidationMessage(
        "Une charge avec le même nom d'année existe déjà."
      );
      return;
    }

    const newCharge = {
      idDepenseCategorie: selectedCategory,
      chargeName: names,
    };
    setNames("");
    setShowAddActivityModal(false);
    setActivityValidationMessage(""); // Clear the validation message for the activity form

    // setData((prevData) => [...prevData, newCharge]);
    // setChargeExt((prevChargeExt) => [...prevChargeExt, newCharge]);

    dispatch(addExternalChargeAction(selectedProject, newCharge));
  };

  //////////////

  const handleAddAnneeClick = () => {
    const yearRegex = /^\d{4}$/; // Regular expression for a valid year (4 digits)

    if (!annees.trim()) {
      setValidationMessage("L'input ne peut pas être vide.");
      return;
    }

    if (!yearRegex.test(annees.trim())) {
      setValidationMessage(
        "Veuillez entrer une année valide (quatre chiffres)."
      );
      return;
    }

    const year = parseInt(annees.trim(), 10);

    if (year < 2004) {
      setValidationMessage("Veuillez entrer une année à partir de 2004.");
      return;
    }

    // Check if the year already exists in montantAnneeListe
    const yearExistsInMontantAnnee =
      allData.montantAnneeListe.montantAnnee.some(
        (item) => item.montantName === annees.trim().toUpperCase()
      );
    if (yearExistsInMontantAnnee) {
      setValidationMessage("L'année existe déjà.");
      return;
    }

    // Check if the year already exists in ChargeExt
    const yearExistsInChargeExt = allData.montantAnneeListe.ChargeExt.some(
      (item) => item.name === annees.trim()
    );
    if (yearExistsInChargeExt) {
      setValidationMessage("Une colonne avec le même nom d'année existe déjà.");
      return;
    }

    // Check if the year is greater than or equal to the maximum year in montantAnneeListe
    const maxYearInMontantAnnee = allData.montantAnneeListe.montantAnnee.reduce(
      (maxYear, montantName) => {
        const year = parseInt(montantName.name, 10);
        return year > maxYear ? year : maxYear;
      },
      0
    );

    // If all conditions pass, proceed with adding the year
    const newMontantAnnee = {
      id: allData.montantAnneeListe.montantAnnee.length + 1,
      montantName: annees.trim().toUpperCase(),
    };

    setAnnes("");
    setShowAddAnneeModal(false);
    setValidationMessage("");

    setMontantAnnee((prevMontantAnnee) => [
      ...prevMontantAnnee,
      newMontantAnnee,
    ]);

    dispatch(addExternalChargeMontantAction(selectedProject, newMontantAnnee));
  };

  const handleOpenChargeExterneModal = (idMontant) => {
    setCellsValue({ idMontant });

    setShowChargeExterneModal(true);
  };

  const handleCloseChargeExterneModal = () => {
    setShowChargeExterneModal(false);
  };

  useEffect(() => {
    if (allData && allData.ChargeExt) {
      setChargeExt(allData.ChargeExt);
    }
    if (allData && allData.montantAnnee) {
      setMontantAnnee(allData.montantAnnee);
    }
  }, [allData]);

  const handleDeleteOneCharge = (idChargeExt) => {
    const charge = ChargeExt.find((charge) => charge.id === idChargeExt);
    if (charge) {
      const idMontant = charge.idMontant;

      dispatch(deleteExternalChargeAction(selectedProject, idChargeExt));
    }
  };

  const handleDeleteOneYearChargeExterne = (idMontant) => {
    dispatch(deleteOneYearExternalChargeAction(selectedProject, idMontant));
  };

  const renderValeur = (idMontant, idChargeExt) => {
    let test = valuerList.find(
      (x) =>
        x.chiffreAffaireActiviteId == idChargeExt &&
        x.montantAnneeId == idMontant
    );
    if (test) {
      return test.volume;
    } else {
      return 0;
    }
  };

  function checkYearInMontantAnneeListeDepenses(year) {
    return allMontantAnnee.some(
      (item) =>
        item.name.trim().toLowerCase() === year.Name.trim().toLowerCase()
    );
  }

  // const getNameById = (data, id) => {
  //   const object = data.find((el) => el.id === id);
  //   return object ? object.name : null;
  // };
  return (
    <div>
      <div>
        <Box title={"BUSINESS PLAN"} color="bg-white" />
        <div className="bp-container h-auto pb-5">
          <div className="mx-5 mb-15 flex items-center">
            <div className="flex-grow">
              <Box
                title={"FINANCEMENT & CHARGES"}
                color="bg-light-purple"
                iconNameOne={"grid"}
                iconNameTwo={"charge"}
                iconColor={"#FDD691"}
                titleColor={"text-white"}
              />
            </div>
            <div className="flex items-center mx-1">
              <div className="p-2 bg-light-purple bg-opacity-50 rounded-full">
                <IconMoon color={"white"} name={"i"} size={25} />
              </div>
            </div>
          </div>
          {isLoadingAllExternalChargesList || load ? (
            <div className="loader mb-5">
              <Spinner
                animation="border"
                role="status"
                size="md"
                currentcolor="#E73248"
              />
            </div>
          ) : (
            <div className="mx-5">
              <div className="flex justify-center items-center">
                <span className="my-4 font-medium text-[21px]">DÉPENSES</span>
              </div>

              <div className="mb-[18px]">
                <div style={{ display: "flex" }}>
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
                            CHARGES
                          </TableCell>
                          {/* Updated mapping over allMontantAnnee */}
                          {allMontantAnnee.map((column, index) => (
                            <TableCell
                              key={column.id}
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "20px",
                                fontWeight: "bold",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <div style={{ width: "55%" }}>
                                  {column.name}
                                </div>
                                <div className="flex justify-between">
                                  <button
                                    className="bg-color: #959494 text-white font-bold opacity-50 mr-1"
                                    onClick={() =>
                                      handleDeleteOneYearChargeExterne(
                                        column.id
                                      )
                                    }
                                  >
                                    <IconMoon
                                      color="rgba(112, 112, 112, 0.1)"
                                      name="trash"
                                      size={20}
                                    />
                                  </button>

                                  <button
                                    className="ml-1"
                                    onClick={() =>
                                      handleOpenChargeExterneModal(column.id)
                                    }
                                  >
                                    <IconMoon
                                      color="rgba(112, 112, 112, 0.5)"
                                      name="edit-input1"
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
                        {ChargeExt.map((charge) => (
                          <TableRow key={charge.id}>
                            <TableCell>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{
                                    fontFamily: "Roboto",
                                    fontSize: "17px",
                                    opacity: 0.4,
                                    paddingLeft: "27px",
                                  }}
                                >
                                  {charge.name}
                                </div>
                                <div style={{ flex: "1" }}></div>

                                <div
                                  style={{
                                    width: "7%",
                                    marginBottom: "-6px",
                                    marginTop: "-5px",
                                  }}
                                >
                                  <button
                                    className="p-2 bg-color: #959494 text-white font-bold opacity-50"
                                    onClick={() =>
                                      handleDeleteOneCharge(charge.id)
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
                            {/* Updated mapping over allMontantAnnee */}
                            {allMontantAnnee.map((column) => (
                              <TableCell
                                key={column.id}
                                style={{
                                  border: "1px solid rgba(0, 0, 0, 0.1)",
                                  textAlign: "center",
                                  fontFamily: "Roboto, sans-serif",
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                }}
                              >
                                <div>{renderValeur(column.id, charge.id)}</div>
                                {/* ...cell content for each column */}
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
                            TOTAL
                          </TableCell>
                          {allMontantAnnee.map((column, colIndex) => (
                            <TableCell
                              key={colIndex}
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#edf1f9",
                                textAlign: "center",
                                fontFamily: "Roboto",
                                fontSize: "17px",
                                paddingLeft: "10px",
                              }}
                            >
                              {ChargeExt.reduce(
                                (sum, charge) =>
                                  sum + renderValeur(column.id, charge.id),
                                0
                              )}
                              €
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                  <div className="flex items-center">
                    <button
                      className="p-2 bg-color: #959494 rounded-full"
                      onClick={handleOpenListeAnne}
                    >
                      <IconMoon color="#514495" name="plus1" size={35} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start mt-3 ml-7">
            <button
              type="button"
              className="ml-6 bg-[#514495] hover:bg-[#51449589] text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={handleOpenAddActivityModal}
            >
              Ajouter une dépense
            </button>
          </div>
        </div>

        <ChargeExterneModal
          show={showChargeExterneModal}
          onClose={handleCloseChargeExterneModal}
          handleOpenConfirmationModal={() => setShowChargeExterneModal(true)}
          cellsValue={cellsValue}
        />

        <Modal
          show={showAddActivityModal}
          onHide={() => {
            handleCloseAddActivityModal();
            setActivityValidationMessage(""); // Clear the validation message when the modal is closed
          }}
          dialogClassName="modal-lg"
          centered
        >
          <div className="relative flex flex-col w-full pointer-events-auto  border border-gray-300 rounded-lg outline-none">
            <Modal.Header closeButton />
            <form>
              <div className="modal-header">
                <div className="text-center w-100">
                  <h4
                    className="uppercase fs-26 font-bold"
                    style={{ color: "#514495" }}
                  >
                    Ajouter une dépense
                  </h4>
                </div>
              </div>

              <div className="modal-body">
                <div className="form-group mb-3 w-[80%]">
                  <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                    Catégorie de dépense
                  </label>
                  <div
                    className="contact-name"
                    style={{ position: "relative" }}
                  >
                    <select
                      className="rounded-md border-2 p-3 w-full"
                      name="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Choisir une option</option>
                      {allData?.categorieDesponses?.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group mb-3 w-[80%]">
                  <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                    Dépense
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
              </div>

              <div className="modal-footer">
                <div className="text-center w-100">
                  <button
                    type="button"
                    onClick={handleAddActivityClick}
                    className="bg-[#514495] text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center shadow-md"
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
                  checkYearInMontantAnneeListeDepenses={
                    checkYearInMontantAnneeListeDepenses
                  }
                  updateListOftYears={setYear}
                  year={allMontantAnnee}
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
                        value={annees}
                        onChange={(e) => setAnnes(e.target.value)}
                        min={new Date().getFullYear()}
                        max={2100}
                        step={1}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <div className="text-center w-100">
                  <button
                    type="button"
                    className={classNames(
                      "bg-[#514495] text-white font-bold py-2 px-4 rounded"
                      /* {
                        "bg-gray-500": selectedYears.length === 0 || !annees,
                      } */
                    )}
                    onClick={() => {
                      handleCloseListeAnne();
                      selectedYears.forEach((year) => {
                        dispatch(
                          addExternalChargeMontantAction(selectedProject, {
                            montantName: year,
                          })
                        );
                      });
                      annees && handleAddAnneeClick();
                    }}
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
  );
};

export default ExternalCharges;

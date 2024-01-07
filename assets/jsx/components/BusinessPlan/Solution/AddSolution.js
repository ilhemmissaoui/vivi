import React, { useState, useEffect } from "react";
import Box from "../../Box/Box";
import { useDispatch } from "react-redux";
import {
  addBusinessPlanSolutionAction,
  addSolutionYearAction,
  getBusinessPlanSolutionsAction,
} from "../../../../store/actions/BusinessPlanActions";
import IconMoon from "../../Icon/IconMoon";
import { IconButton } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import { getAllYearsList } from "../../../../services/BusinessPlanService";
const AddSolution = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isAddYearPopupOpen, setIsAddYearPopupOpen] = useState(false);
  const [yearToAdd, setYearToAdd] = useState("");
  const moveToPage = useHistory();
  const [innovation, setInnovation] = useState("");
  const [strength, setStrength] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [prix, setPrix] = useState([]);
  const [volume, setVolume] = useState([]);
  const [nameVente, setNameVente] = useState([]);
  const dispatch = useDispatch();
  const selectedProject = localStorage.getItem("selectedProjectId");
  const [selectedYears, setSelectedYears] = useState([]);
  const [listOfYears, setListOfYears] = useState([]);
  const fetchYears = async () => {
    try {
      const years = await getAllYearsList(selectedProject);
      setListOfYears(years);
    } catch (error) {
      console.error(error);
    }
  };
  // options of listOfYears
  const yearOptions = listOfYears?.map((year) => ({
    value: parseInt(year.Name, 10),
    label: year.Name,
  }));
  const modifiedSelectedYears = selectedYears.reduce((result, year, index) => {
    result[index] = year.value;
    return result;
  }, {});

  useEffect(() => {
    fetchYears();
  }, [selectedProject]);

  const handleAnneeChange = (selectedOptions) => {
    setSelectedYears(selectedOptions);
  };
  const handleInnovationChange = (event) => {
    const newInnovation = event.target.value;
    setInnovation(newInnovation);
    validateForm(name, newInnovation, strength, description);
  };
  const handleStrengthChange = (event) => {
    const newStrength = event.target.value;
    setStrength(newStrength);
    validateForm(name, innovation, newStrength, description);
  };
  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    validateForm(name, innovation, strength, newDescription);
  };
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    validateForm(newName, innovation, strength, description);
  };
  const validateForm = (name, innovation, strength, description) => {
    const isValid = name && innovation && strength && description;
    setIsFormValid(isValid);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    if (name && innovation && strength && description) {
      dispatch(
        addBusinessPlanSolutionAction(selectedProject, {
          annee: modifiedSelectedYears,
          name: name,
          innovation,
          pointFort: strength,
          descTechnique: description,
        })
      ).then((data) => {
        setSolutionId(data.idSolutions);
      });
      handleShowMessage();
    } else {
      alert("Please fill in all required fields");
    }
  };
  const addNewSolution = async (e) => {
    e.preventDefault();
    if (
      name &&
      innovation &&
      strength &&
      description &&
      modifiedSelectedYears
    ) {
      await dispatch(
        addBusinessPlanSolutionAction(selectedProject, {
          annee: modifiedSelectedYears,
          name: name,
          innovation,
          pointFort: strength,
          descTechnique: description,
        })
      );
      dispatch(getBusinessPlanSolutionsAction(selectedProject));
      moveToPage.push("annees");
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const column = {
      name: nameVente,
      prixVenteHT: prix,
      VolumeVente: volume,
    };
    // Update the state
    setNameVente([...nameVente, column.name]);
    setPrix([...prix, column.prixVenteHT]);
    setVolume([...volume, column.VolumeVente]);
    setShowModal(false);
  };

  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "prix":
        setPrix(value);
        break;
      case "volume":
        setVolume(value);
        break;
      case "nameVente":
        setNameVente(value);
        break;
      default:
        break;
    }
  };
  const toggleAddYearPopup = () => {
    setIsAddYearPopupOpen(!isAddYearPopupOpen);
  };
  const handleAddYear = () => {
    if (!yearToAdd) {
      setValidationMessage("L'année ne peut pas être vide.");
      return;
    }

    if (isNaN(yearToAdd)) {
      setValidationMessage("L'année doit être un nombre.");
      return;
    }

    const isUsedYear = listOfYears.some(
      (year) => year.Name === yearToAdd.toString()
    );
    if (isUsedYear) {
      setValidationMessage("L'année existe déjà dans la liste.");
      return;
    }
    if (validationMessage) {
      return;
    }

    if (yearToAdd < 2020) {
      setValidationMessage("L'année ne doit pas être inférieure à 2020");
      return;
    }
    if (yearToAdd > 2100) {
      setValidationMessage("L'année ne doit pas être supérieure à 2100");
      return;
    } else {
      setYearToAdd("");
      setIsAddYearPopupOpen(false);
      setValidationMessage("");
    }
    selectedYears.push({ value: parseInt(yearToAdd, 10), label: yearToAdd });
  };

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"NOTRE SOLUTION"}
              color={"bg-banana"}
              iconNameOne={"grid"}
              iconNameTwo={"people-2"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-banana bg-opacity-50 rounded-full">
              <IconMoon color={"white"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <div className="mx-5 overflow-scroll rounded-lg border-banana border-1 addsolution-container pb-3">
          <div className="flex flex-col justify-center items-center ">
            <div className="w-full mt-4">
              <div className="w-full mt-4">
                <div className="flex justify-center">
                  <label className="text-base text-black-1 mx-5 mb-3  font-bold">
                    Année
                  </label>
                </div>
                <div className={`relative mx-5 mb-5`}>
                  <div className="relative w-full">
                    <Select
                      options={yearOptions}
                      value={selectedYears}
                      isMulti
                      onChange={handleAnneeChange}
                      placeholder="Selectionner une année"
                    />
                    <span className="col-span-3 text-sm font-medium px-2">
                      Ajouter une année
                    </span>
                    <IconButton className="col" onClick={toggleAddYearPopup}>
                      <IconMoon
                        name="plus-basic"
                        color="banana"
                        size={20}
                        className="bg-banana rounded-full"
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="flex justify-center">
                  <label className="text-base text-black-1 mx-5 mb-3 font-bold">
                    Nom
                    <span className="text-red-600 mx-1 text-lg">*</span>
                  </label>
                </div>
                <div className={`relative mx-5 mb-5`}>
                  <div
                    className={`relative w-full ${!name && "border-red-500"}`}
                  >
                    <textarea
                      className={`box-border border-1 rounded-md overflow-hidden text-base h-14 p-3 relative text-start align-top w-full ${
                        !name && "border-red-500"
                      }`}
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      required
                    ></textarea>
                  </div>
                  {!name && (
                    <p className="text-red-500 mt-2">
                      Ce champ est obligatoire.
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full  mt-4">
                <div className="flex justify-center">
                  <label className="text-base text-black-1 mx-5 mb-3 font-bold">
                    Innovation
                    <span className="text-red-600 mx-1 text-lg">*</span>
                  </label>
                </div>
                <div className={`relative mx-5 mb-5`}>
                  <div
                    className={`relative w-full ${
                      !innovation && "border-red-500"
                    }`}
                  >
                    <textarea
                      className={`box-border border-1 rounded-md overflow-hidden text-base h-[194px] p-3 relative text-start align-top w-full ${
                        !innovation && "border-red-500"
                      }`}
                      type="text"
                      value={innovation}
                      onChange={handleInnovationChange}
                      required
                    ></textarea>
                  </div>
                  {!innovation && (
                    <p className="text-red-500 mt-2">
                      Ce champ est obligatoire.
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full  mt-4">
                <div className="flex justify-center">
                  <label className="text-base text-black-1 mx-5 mb-3 font-bold">
                    Les points forts
                    <span className="text-red-600 mx-1 text-lg">*</span>
                  </label>
                </div>
                <div className={`relative mx-5 mb-5`}>
                  <div
                    className={`relative w-full ${
                      !strength && "border-red-500"
                    }`}
                  >
                    <textarea
                      className={`box-border border-1 rounded-md overflow-hidden text-base h-[194px] p-3 relative text-start align-top w-full ${
                        !strength && "border-red-500"
                      }`}
                      type="text"
                      value={strength}
                      onChange={handleStrengthChange}
                      required
                    ></textarea>
                  </div>
                  {!strength && (
                    <p className="text-red-500 mt-2">
                      Ce champ est obligatoire.
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full  mt-4">
                <div className="flex justify-center">
                  <label className="text-base text-black-1 mx-5 mb-3 font-bold">
                    Description technique
                    <span className="text-red-600 mx-1 text-lg">*</span>
                  </label>
                </div>
                <div className={`relative mx-5 mb-5`}>
                  <div
                    className={`relative w-full ${
                      !description && "border-red-500"
                    }`}
                  >
                    <textarea
                      className={`box-border border-1 rounded-md overflow-hidden text-base h-[194px] p-3 relative text-start align-top w-full ${
                        !description && "border-red-500"
                      }`}
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      required
                    ></textarea>
                  </div>
                  {!description && (
                    <p className="text-red-500 mt-2">
                      Ce champ est obligatoire.
                    </p>
                  )}
                </div>
              </div>
              <>
                <div className="flex justify-center align-center self-center mb-2">
                  <button
                    onClick={addNewSolution}
                    className={`${
                      isFormValid
                        ? "bg-banana hover:bg-black"
                        : "bg-[#FFEDD5] cursor-not-allowed"
                    } text-white py-2 px-4 rounded focus:outline-none w-24 self-center shadow-md`}
                    disabled={!isFormValid}
                  >
                    Valider
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade bd-example-modal-sm ${
          isAddYearPopupOpen ? "show" : ""
        }`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!isAddYearPopupOpen}
        style={{ display: isAddYearPopupOpen ? "block" : "none" }}
        centered="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#f6f6f6" }}>
            <div className="modal-header">
              <h4 className="flex justify-center items-center">
                Ajouter année
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  onClick={() => {
                    setIsAddYearPopupOpen(false);
                    setValidationMessage("");
                  }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="flex-col p-4">
              <input
                onChange={(e) => {
                  if (validationMessage) {
                    setValidationMessage("");
                  }
                  setYearToAdd(e.target.value);
                }}
                placeholder="Entrez l'année"
                className="input-style"
                type="number"
                value={yearToAdd}
              />
              {validationMessage && (
                <>
                  <div className="text-sm text-red-500">
                    {validationMessage}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="button-style-annuler"
                onClick={() => {
                  setYearToAdd("");
                  setValidationMessage("");
                  setIsAddYearPopupOpen(false);
                }}
              >
                Annuler
              </button>
              <button className="button-style" onClick={() => handleAddYear()}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal className="modal fade " show={showModal} onHide={handleModalClose}>
        <div className="" role="document">
          <div className="">
            <div>
              <div className="modal-body">
                <i
                  className="flaticon-cancel-12 close"
                  data-dismiss="modal"
                ></i>
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Nom</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          autoComplete="off"
                          name="nameVente"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Entrer nom"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Prix de vente HT
                      </label>
                      <div className="contact-name">
                        <input
                          min={0}
                          type="number"
                          className="form-control border-1"
                          autoComplete="off"
                          name="prix"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Entrer prix"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Volume de vente
                      </label>
                      <div className="contact-name">
                        <input
                          min={0}
                          type="number"
                          className="form-control border-1"
                          autoComplete="off"
                          name="volume"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Entrer volume"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={handleSubmit}
                  className="bg-banana hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24	 self-center "
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AddSolution;

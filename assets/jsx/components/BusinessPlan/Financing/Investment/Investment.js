import React, { useState, useEffect } from "react";
import Box from "../../../Box/BoxFinancement";
import IconMoon from "../../../Icon/IconMoon";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  addInvestAnneeQuery,
  addInvestQuery,
  addMontantQuery,
  editInvestAnneeQuery,
  getAllAnnesInvestissement,
} from "../../../../../services/BusinessPlanService";
import Spinner from "react-bootstrap/Spinner";

import classNames from "classnames";
import ListYearsForInvest from "../ListYearsForInvest";

const Investment = () => {
  const [showAddInvestModal, setShowAddInvestModal] = useState(false);
  const [showAddAnneeInvestModal, setShowAddAnneeInvestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMontantModal, setShowMontantModal] = useState(false);
  const [showYearsList, setShowYearsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalAnneeLoading, setIsModalAnneeLoading] = useState(false);
  const [isModalAnneeEditLoading, setIsModalAnneeEditLoading] = useState(false);
  const [isMontantLoading, setIsMontantLoading] = useState(false);
  const [anneeId, setAnneeId] = useState(null);
  const [listInvest, setListInvest] = useState([]);
  const [listInvestNature, setListInvestNature] = useState([]);
  const [addAnneInvest, setAddAnneeInvest] = useState("");
  const [editAnneInvest, setEditAnneeInvest] = useState("");
  const [montant, setMontant] = useState("");
  const [investRow, setInvestRow] = useState("");
  const [error, setError] = useState("");
  const [showinput, setShowinput] = useState(false);

  const [addInvest, setAddInvest] = useState({
    name: "",
    nature: "",
    apportEnNature: "",
    duree: "",
    idNatureInvestissement: "",
  });
  const [selectedYears, setSelectedYears] = useState([]);

  const handleCloseAddInvestModal = () => {
    setShowAddInvestModal(false);
  };

  const handleOpenAddInvestModal = (annee_id) => {
    setAnneeId(annee_id);
    setShowAddInvestModal(true);
  };

  const handleOpenAddAnneInvestModal = () => {
    setShowAddAnneeInvestModal(true);
  };

  const handleOpenListAnneInvestModal = () => {
    setShowYearsList(true);
  };

  const handleCloseListAnneInvestModal = () => {
    setShowYearsList(false); // Close the list of years modal
  };

  const handleCloseAddAnneInvestModal = () => {
    setShowAddAnneeInvestModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = (annee_id) => {
    setAnneeId(annee_id);
    setShowEditModal(true);
  };

  const closeAddMontantModal = () => {
    setShowMontantModal(false);
  };

  const openAddMontantModal = (annee_id, invest_id) => {
    setAnneeId(annee_id);
    setInvestRow(invest_id);
    setShowMontantModal(true);
  };

  const selectedProject = localStorage.getItem("selectedProjectId");

  const handleAddInvestToAnne = async () => {
    setIsModalLoading(true);
    await addInvestQuery(selectedProject, anneeId, addInvest);
    setIsModalLoading(false);
    setShowAddInvestModal(false);
    listAnnesInvestQuery();
  };

  const handleAddAnneeInvest = async () => {
    // Check if the entered year is valid (exactly 4 digits)
    if (!/^\d{4}$/.test(addAnneInvest)) {
      setError("L'année doit contenir exactement 4 chiffres.");
      return;
    }

    setError("");
    // Check if the year (AnneeInvestissementName) already exists in the listInvest array
    const yearExists = listInvest[0]?.some(
      (annes) => annes.AnneeInvestissementName === addAnneInvest
    );
    if (yearExists) {
      setError("L'année existe deja .");
      handleCloseListAnneInvestModal();
      return;
    }

    setError("");

    setIsModalAnneeLoading(true);
    await addInvestAnneeQuery(selectedProject, addAnneInvest);
    setIsModalAnneeLoading(false);
    // setShowAddInvestModal(false);

    setShowAddAnneeInvestModal(false);

    listAnnesInvestQuery();
    handleCloseListAnneInvestModal();
  };

  const handleEditAnneeInvest = async () => {
    setIsModalAnneeEditLoading(true);
    const response = await editInvestAnneeQuery(
      selectedProject,
      anneeId,
      editAnneInvest
    );
    setIsModalAnneeEditLoading(false);
    setShowEditModal(false);
    listAnnesInvestQuery();
  };

  const selectedProjecttt = useSelector(
    (state) => state.project.selectedProject
  );

  const handleAddMontant = async () => {
    setIsMontantLoading(true);
    const response = await addMontantQuery(
      selectedProject,
      anneeId,
      investRow,
      montant
    );
    setIsMontantLoading(false);
    setShowMontantModal(false);
    listAnnesInvestQuery();
  };

  const listAnnesInvestQuery = async () => {
    try {
      setIsLoading(true);
      const response = await getAllAnnesInvestissement(selectedProject);
      setListInvest(response.data);
      setListInvestNature(response.data.NatureInvesstissementsListe);
      setIsLoading(false);
    } catch (error) {}
  };

  const getTotalMontant = (annee) => {
    let sum = 0;
    if (annee && annee.Investissement) {
      annee.Investissement.forEach((el) => {
        if (el.montant) {
          sum += el.montant;
        }
      });
    }
    return sum;
  };

  const handleSetAnnee = async () => {
    setIsMontantLoading(true);

    selectedYears?.map(async (el) => {
      await addInvestAnneeQuery(selectedProject, el);
    });
    setSelectedYears([]);
    setIsMontantLoading(false);
    setShowMontantModal(false);
    handleCloseListAnneInvestModal();
    listAnnesInvestQuery();
  };

  useEffect(() => {
    listAnnesInvestQuery();
  }, [selectedProject]);

  const handleNatureChange = (e) => {
    setAddInvest({ ...addInvest, idNatureInvestissement: e.target.value });
  };

  function checkYearInMontantAnneeListeDepenses(years) {
    if (listInvest[0]) {
      const result = years.filter(
        (yearObj) =>
          !listInvest[0].find(
            (yearItem) => yearItem.AnneeInvestissementName === yearObj.Name
          )
      );

      return result;
    }
    return years;
  }
  return (
    <>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <div className="mx-5 mb-3 flex items-center ">
          <div className="flex-grow">
            <Box
              title={"FINANCEMENT & CHARGES"}
              color={"bg-light-purple"}
              iconNameOne={"grid"}
              iconNameTwo={"charge"}
              iconColor={"#fff"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-light-purple  rounded-full">
              <IconMoon color={"#fff"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <div className="w-full text-center -mt-5 ">
          <span className="font-bold text-lg">LES INVESTISSEMENTS</span>
        </div>
        {isLoading ? (
          <div className="loader m-5">
            <Spinner
              animation="border"
              role="status"
              size="md"
              currentcolor="#E73248"
            />
          </div>
        ) : (
          <>
            <div
              className="h-700 mt-10 mx-auto border-2 rounded p-8"
              style={{ width: "80%" }}
            >
              <div
                className="overflow-y-scroll"
                style={{ maxHeight: "600px", height: "93%" }}
              >
                {listInvest?.AnneeInvestissement?.length == 0 ? (
                  <div className="text-center font-bold">
                    {" "}
                    Investissements introuvables{" "}
                  </div>
                ) : (
                  <>
                    {listInvest[0]?.map((annes, index) => (
                      <div key={index} className="py-2 px-5">
                        <div className="flex">
                          <div
                            className=""
                            style={{ marginRight: "16px", paddingTop: "11px" }}
                          >
                            <h4 className="font-bold">
                              {annes.AnneeInvestissementName}
                            </h4>
                          </div>
                          {/*  <button
                            className="mr-2"
                            onClick={() =>
                              handleOpenEditModal(annes.AnneeInvestissementId)
                            }
                          >
                            <IconMoon
                              color="#707070"
                              name="edit-input1"
                              size={22}
                            />
                          </button> */}
                        </div>
                        <div>
                          <table className="w-full border-collapse  border-gray-300 rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 text-center text-sm leading-4 font-bold border uppercase">
                                  INVESTISSEMENT(S)
                                </th>
                                <th className="px-6 py-3 text-center text-sm leading-4 font-bold border uppercase">
                                  MONTANT (HT)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {annes.Investissement.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                    {item.name}
                                  </td>
                                  <td className="flex justify-between w-full px-6 py-2 text-sm text-center leading-5 border text-gray-500 ">
                                    <p>{item.montant}</p>
                                    <button
                                      className="text-end"
                                      onClick={() =>
                                        openAddMontantModal(
                                          annes.AnneeInvestissementId,
                                          item.id
                                        )
                                      }
                                    >
                                      <IconMoon
                                        color="#707070"
                                        name="edit-input1"
                                        size={20}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              <tr className="border-none">
                                <td className="px-6 py-1 text-center text-sm leading-5 font-medium text-gray-500 border-gray-300">
                                  <button
                                    onClick={() =>
                                      handleOpenAddInvestModal(
                                        annes.AnneeInvestissementId
                                      )
                                    }
                                    className="bg-light-purple hover:bg-light-purple text-white font-bold py-1 rounded-full"
                                    style={{
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    +
                                  </button>
                                </td>
                                <td className="px-0 py-1 text-sm leading-5 font-medium text-gray-500">
                                  <div className="w-full p-2 rounded-md flex justify-between bg-gray-300 text-black font-bold">
                                    <div className="px-3">TOTAL</div>
                                    <div className="px-3">
                                      {getTotalMontant(annes)}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center" style={{ padding: "15px" }}>
          <button
            className="bg-light-purple hover:bg-light-purple text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
            onClick={() => handleOpenListAnneInvestModal()}
          >
            Ajouter une Année
          </button>
        </div>
      </div>
      <Modal
        show={showAddInvestModal}
        onHide={handleCloseAddInvestModal}
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
                  Ajouter un investissement
                </h4>
              </div>
            </div>

            <div className="modal-body">
              <div className="form-group mb-3 w-[80%]">
                <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                  La nature de l'investissement
                </label>
                <div className="contact-name" style={{ position: "relative" }}>
                  <select
                    onChange={handleNatureChange}
                    id="idNatureInvestissement"
                    className="rounded-md border-2 p-3 w-full"
                    value={addInvest.idNatureInvestissement}
                  >
                    {listInvestNature?.map((natureOption, index) => (
                      <option key={index} value={natureOption.id}>
                        {natureOption.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mb-3 w-[80%]">
                <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                  S'agit-il d'un rapport en nature ?
                </label>
                <div className="contact-name" style={{ position: "relative" }}>
                  <select
                    onChange={(e) =>
                      setAddInvest({
                        ...addInvest,
                        apportEnNature: e.target.value,
                      })
                    }
                    id="rapport"
                    className="rounded-md border-2 p-3 w-full"
                  >
                    <option selected>choisir la réponse</option>
                    <option value="Y">Oui</option>
                    <option value="N">Non</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-3 w-[80%]">
                <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                  Nom de l'investissement
                </label>
                <input
                  onChange={(e) =>
                    setAddInvest({ ...addInvest, name: e.target.value })
                  }
                  id="name"
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                />
              </div>

              <div className="form-group mb-3 w-[80%]">
                <label
                  htmlFor="duree"
                  className="text-black text-base text-center flex items-center justify-center font-semibold"
                >
                  Durée d'utilisation (en mois)
                </label>
                <input
                  onChange={(e) =>
                    setAddInvest({ ...addInvest, duree: e.target.value })
                  }
                  id="name"
                  type="number"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                />
              </div>
            </div>

            {isModalLoading ? (
              <div className="loader m-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  currentcolor="#E73248"
                />
              </div>
            ) : null}

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={handleAddInvestToAnne}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* List ANNEE INVESTISSMENT */}
      <Modal
        show={showYearsList}
        onHide={handleCloseListAnneInvestModal}
        dialogClassName="modal-sm"
        centered
      >
        <div className="modal-content">
          <form>
            <Modal.Header closeButton>
              <div className="text-center w-full">
                <h4 style={{ color: "#514495" }}>Liste des années</h4>
              </div>
            </Modal.Header>

            <div className="flex flex-col items-center justify-center p-2">
              <ListYearsForInvest
                setSelectedYears={setSelectedYears}
                selectedYears={selectedYears}
                year={listInvest[0]}
                updateListOftYears={checkYearInMontantAnneeListeDepenses}
              />
              <div className="form-group flex justify-center">
                <button
                  className="p-2 bg-color: #959494 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowinput(!showinput);
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
                      onChange={(e) => setAddAnneeInvest(e.target.value)}
                      id="name"
                      type="number"
                      className="form-group w-full rounded-xl p-2"
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
                    className="bg-[#514495] text-white font-bold py-2 px-4 rounded"
                    style={{ width: "100%", maxWidth: "200px" }}
                    onClick={async () => {
                      if (selectedYears.length > 0) {
                        await handleSetAnnee();
                      } else {
                        // Handle "Valider" functionality
                        handleAddAnneeInvest();
                      }

                      await listAnnesInvestQuery();
                      setShowinput(false);
                      setAddAnneeInvest("");
                    }}
                    disabled={selectedYears.length === 0 && !addAnneInvest}
                  >
                    Valider
                  </button>

                  <div style={{ padding: "8px" }}></div>
                  {/*  <button
                  onClick={() => {
                    handleOpenAddAnneeModal();
                    handleCloseListeAnne();
                  }}
                  type="button"
                  className="bg-[#514495] text-white font-bold py-2 px-4 rounded"
                  style={{ width: "100%", maxWidth: "200px" }}
                >
                  Ajouter une Année
                </button> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* <Modal
        show={showAddAnneeInvestModal}
        onHide={handleCloseAddAnneInvestModal}
        dialogClassName="modal-md"
        centered
      >
        <div className="modal-content">
          <form>
            <div className="py-5 text-center">
              <h4 className="font-bold" style={{ color: "#514495" }}>
                AJOUTER UNE ANNEE INVESTISSEMENT
              </h4>
            </div>

            <div className="modal-body -mt-10">
              <div className="form-group mb-3">
                <label
                  for="duree"
                  className="text-black font-bold text-center flex items-center justify-center"
                >
                  Année d'investissement
                </label>
                <input
                  onChange={(e) => setAddAnneeInvest(e.target.value)}
                  id="name"
                  type="number"
                  className="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 pr-8"
                  style={{ border: "1px solid #c7c7c7" }}
                />
              </div>
              <div
                className="text-red-500 mt-4 text-center"
                id="errorMessage"
                style={{ display: error ? "block" : "none" }}
              >
                {error}
              </div>
            </div>
            {isModalAnneeLoading ? (
              <div className="loader m-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  currentcolor="#E73248"
                />
              </div>
            ) : null}

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={() => {
                    handleAddAnneeInvest();
                    // handleCloseAddAnneInvestModal();
                  }}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal> */}
      {/* EDIT ANNEE INVESTISSMENT */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        dialogClassName="modal-md"
        centered
      >
        <div className="modal-content">
          <form>
            <div className="py-5 text-center">
              <h4 className="font-bold" style={{ color: "#514495" }}>
                MODIFIER ANNEE INVESTISSEMENT
              </h4>
            </div>

            <div className="modal-body -mt-10">
              <div className="form-group mb-3">
                <label
                  htmlFor="duree"
                  className="text-black font-bold text-center flex items-center justify-center"
                >
                  Année d'investissement
                </label>
                <input
                  onChange={(e) => setEditAnneeInvest(e.target.value)}
                  id="name"
                  type="text"
                  className="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 pr-8"
                  style={{ border: "1px solid #c7c7c7" }}
                />
              </div>
            </div>

            {isModalAnneeEditLoading ? (
              <div className="loader m-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  currentcolor="#E73248"
                />
              </div>
            ) : null}

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={handleEditAnneeInvest}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Modifier
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* MONTANT MODAL */}
      <Modal
        show={showMontantModal}
        onHide={closeAddMontantModal}
        dialogClassName="modal-md"
        centered
      >
        <div className="modal-content">
          <form>
            <div className="py-5 text-center">
              <h4 className="font-bold" style={{ color: "#514495" }}>
                AJOUTER LE MONTANT
              </h4>
            </div>

            <div className="modal-body -mt-10">
              <div className="form-group mb-3">
                <label
                  htmlFor="duree"
                  className="text-black font-bold text-center flex items-center justify-center"
                >
                  Montant (HT)
                </label>
                <input
                  onChange={(e) => setMontant(e.target.value)}
                  id="name"
                  type="number"
                  className="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 pr-8"
                  style={{ border: "1px solid #c7c7c7" }}
                />
              </div>
            </div>

            {isMontantLoading ? (
              <div className="loader m-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  currentcolor="#E73248"
                />
              </div>
            ) : null}

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={() => {
                    handleAddMontant();
                    setShowAddAnneeInvestModal();
                  }}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Investment;

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import IconMoon from "../../../Icon/IconMoon";
import {
  DeleteDirigeant,
  DeleteYearDirigeant,
  addSocialChargeDirigeant,
  editDirigeant,
  editYearDirigeant,
  getAllDirigentSocialCharge,
  getAllSocialChargeDirigeant,
} from "../../../../../services/BusinessPlanService";
import LeaderChargeModal from "./LeaderChargeModal";
import ListYearsModal from "../ListYearsModal";

const LeaderCharges = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [anneeId, setAnneeId] = useState(null);
  const [selected, setSelectedName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const dispatch = useDispatch();
  const [
    editPourcentageParticipationCapital,
    setEditPourcentageParticipationCapital,
  ] = useState("");
  const [editReparationRenumeratinAnnee, setEditReparationRenumeratinAnnee] =
    useState("");
  const [editBeneficier, setEditBeneficier] = useState("");

  const [anneeName, setAnneeName] = useState("");
  const [showEditModalCollab, setShowEditModalCollab] = useState(false);
  const [dirigId, setDirigId] = useState(null);

  const [year, setYear] = useState([]);

  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState();

  const [showListOfYearsModal, setShowListOfYearsModal] = useState(false);
  const [showinput, setShowinput] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = (annee_id, annee_name) => {
    setAnneeId(annee_id);
    setShowEditModal(true);

    setAnneeName(annee_name);
  };

  const handleDelete = async (annee_id) => {
    try {
      await DeleteYearDirigeant(selectedProject, annee_id);
      await listSocialCharge();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteCollab = async (dirigant_id, annee_id) => {
    try {
      await DeleteDirigeant(selectedProject, dirigant_id, annee_id);
      await listSocialCharge();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleButtonClick = () => {
    setName("");
    setShowModal(true);
  };

  const handleModalClose = async () => {
    setShowModal(false);
  };

  const hanleOpenListOfTheYearsModal = async () => {
    setShowListOfYearsModal(true);
  };

  const hanleCloseListOfTheYearsModal = async () => {
    setShowListOfYearsModal(false);
  };

  const listSocialCharge = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSocialChargeDirigeant(selectedProject);
      setIsLoading(false);

      if (response.status == 200) {
        setYear(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    listSocialCharge();
  }, []);

  const handleOpenAddModal = (annee_id, name) => {
    getAllDirigentSocialCharge(selectedProject, annee_id).then((res) => {
      if (res) {
        setMembers(res?.data);
      }
    });
    setAnneeId(annee_id);
    setSelectedName(name);

    setShowAddModal(true);
  };
  const handleModalSave = async () => {
    const names = {
      name: name,
    };
    await addSocialChargeDirigeant(selectedProject, names);
    setShowModal(false);
    await listSocialCharge();
  };

  const handleModalUpdate = async () => {
    const response = await editYearDirigeant(selectedProject, anneeId, {
      name: anneeName,
    });
    setShowEditModal(false);
    await listSocialCharge();
  };

  const getTotalMontant = (year) => {
    let sumTotal = 0;
    if (Array.isArray(year.DirigentsListe) && year.DirigentsListe.length > 0) {
      year.DirigentsListe.forEach((element) => {
        const reparation = Number(element.reparationRenumeratinAnnee);
        const participation = Number(element.pourcentageParticipationCapital);
        const beneficier = Number(element.beneficier);

        if (!isNaN(reparation) && !isNaN(participation) && !isNaN(beneficier)) {
          sumTotal += reparation + participation + beneficier;
        }
      });
    }

    return sumTotal;
  };
  const handleCloseEditModalCollab = () => {
    setShowEditModalCollab(false);
  };
  const handleOpenEditModalCollab = (
    dirigant_id,
    annee_id,
    pourcentageParticipationCapitalEdit,
    reparationRenumeratinAnneeEdit,
    beneficierEdit
  ) => {
    setDirigId(dirigant_id);
    setAnneeId(annee_id);

    setShowEditModalCollab(true);

    setEditPourcentageParticipationCapital(pourcentageParticipationCapitalEdit);
    setEditReparationRenumeratinAnnee(reparationRenumeratinAnneeEdit);
    setEditBeneficier(beneficierEdit);
  };
  const handleModalUpdateCollab = async () => {
    const response = await editDirigeant(selectedProject, anneeId, dirigId, {
      pourcentageParticipationCapital: editPourcentageParticipationCapital,
      reparationRenumeratinAnnee: editReparationRenumeratinAnnee,
      beneficier: editBeneficier,
    });
    setShowEditModalCollab(false);
    await listSocialCharge();
  };

  const handleSetAnnee = async () => {
    try {
      if (!selectedYears || selectedYears.length === 0) {
        // Handle the case when selectedYears is null or empty.
        throw new Error("No selected years.");
      }

      const promises = selectedYears.map(async (el) => {
        const newYear = {
          name: el,
        };
        await addSocialChargeDirigeant(selectedProject, newYear);
      });

      await Promise.all(promises);

      // After all promises are resolved, you can call listSocialCharge.
      listSocialCharge();
    } catch (error) {
      // Handle errors here.
      console.error("An error occurred:", error);
    }
    hanleCloseListOfTheYearsModal();
  };
  return (
    <div
      className="overflow-y-scroll"
      style={{ maxHeight: "600px", height: "93%" }}
    >
      <div className="MuiTableContainer-root rounded-[5px] css-rorn0c-MuiTableContainer-root">
        <div>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {Array.isArray(year.idAnne) && year.idAnne.length > 0 ? (
                year.idAnne.map((element) => (
                  <div
                    className="py-2 px-2 text-center"
                    key={element.SalaireEtChargeSocialDirigentsId}
                  >
                    <div className="flex">
                      <div
                        className=""
                        style={{ marginRight: "16px", paddingTop: "11px" }}
                      >
                        <h4 className="font-bold">
                          Année : {element.SalaireEtChargeSocialDirigentsName}
                        </h4>
                      </div>

                      {/* <button
                        className="mr-2"
                        onClick={() =>
                          handleOpenEditModal(
                            element.SalaireEtChargeSocialDirigentsId,
                            element.SalaireEtChargeSocialDirigentsName
                          )
                        }
                      >
                        <IconMoon
                          color="#707070"
                          name="edit-input1"
                          size={22}
                        />
                      </button> */}
                      <button
                        className="mr-2"
                        onClick={() =>
                          handleDelete(element.SalaireEtChargeSocialDirigentsId)
                        }
                      >
                        <IconMoon size={20} name="trash" />
                      </button>
                    </div>
                    <div>
                      <table className="w-full border-collapse  border-gray-300 rounded-lg">
                        <thead>
                          <tr>
                            <th className=" px-6 py-3 text-center text-sm leading-4 font-bold border uppercase">
                              DIRIGEANTS
                            </th>
                            <th className="px-6 py-3 text-center text-sm leading-4 font-bold border ">
                              Pourcentage de participation au capital (en %)
                            </th>
                            <th className="px-6 py-3 text-center text-sm leading-4 font-bold border ">
                              Répartition de la rémunération sur l'année{" "}
                            </th>
                            <th className="px-6 py-3 text-center text-sm leading-4 font-bold border ">
                              Le dirigeant bénéficie-t-il de l'ACRE ?{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {element.DirigentsListe.map((user, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="flex justify-between px-6 py-2 w-52 text-sm text-center leading-5 border text-gray-500 ">
                                <div className="">
                                  {user.UserName ?? user.DirigentUserName}
                                </div>
                                <div className="flex justify-between">
                                  <button
                                    onClick={() =>
                                      handleOpenEditModalCollab(
                                        element.SalaireEtChargeSocialDirigentsId,
                                        user.IdDirigeant,
                                        user.pourcentageParticipationCapital,
                                        user.reparationRenumeratinAnnee,
                                        user.beneficier
                                      )
                                    }
                                  >
                                    <IconMoon
                                      color="#707070"
                                      name="edit-input1"
                                      size={20}
                                    />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteCollab(
                                        user.IdDirigeant,
                                        element.SalaireEtChargeSocialDirigentsId
                                      )
                                    }
                                  >
                                    <IconMoon size={20} name="trash" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.pourcentageParticipationCapital}
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.reparationRenumeratinAnnee}
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.beneficier}
                              </td>
                            </tr>
                          ))}

                          <tr className="border-none">
                            <td>
                              <div className="px-6 py-1 text-center text-sm leading-5 font-medium text-gray-500 border-gray-300">
                                <button
                                  className=" text-center text-sm "
                                  type="button"
                                  onClick={() =>
                                    handleOpenAddModal(
                                      element.SalaireEtChargeSocialDirigentsId,
                                      element.SalaireEtChargeSocialDirigentsName
                                    )
                                  }
                                >
                                  <IconMoon
                                    className=" text-center text-sm "
                                    color="#514495"
                                    name="plus1"
                                    size={32}
                                  />{" "}
                                </button>
                              </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td className="px-0 py-1 text-sm leading-5 font-medium text-gray-500">
                              <div className="w-full p-2 rounded-md flex justify-between bg-gray-300 text-black font-bold">
                                <div className="flex justify-between px-6 py-2 text-sm text-center leading-5  text-black">
                                  <div className="pe-3">TOTAL</div>
                                  <div className="text-center w-full">
                                    {" "}
                                    {element.total}
                                  </div>
                                  &euro;
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div>Cliquez pour ajouter une année</div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row mt-5">
          <button
            type="button"
            onClick={hanleOpenListOfTheYearsModal}
            className="shadow-grey-600 shadow-md bg-dark-purple text-white font-bold py-2 px-4 rounded self-center"
          >
            Ajouter une année
          </button>
        </div>
        {Array.isArray(year.idAnne) && year.idAnne.length > 0 && (
          <LeaderChargeModal
            members={members}
            anneeId={anneeId}
            show={showAddModal}
            name={selected}
            onHide={handleCloseAddModal}
            year={year}
            setIsLoading={setIsLoading}
            setYear={setYear}
          />
        )}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter une année</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>année</div>
              <input
                className="form-controls-input"
                type="number"
                min="2020"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleModalClose}
            >
              Annuler
            </Button>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleModalSave}
            >
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showListOfYearsModal}
          onHide={hanleCloseListOfTheYearsModal}
          dialogClassName="modal-sm"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>liste des années</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <ListYearsModal
              setSelectedYears={setSelectedYears}
              selectedYears={selectedYears}
              year={year}
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
                    /*  value={name} */
                    onChange={(e) => setName(e.target.value)}
                    min={new Date().getFullYear()}
                    max={2100}
                    step={1}
                    placeholder="2023"
                  />
                </div>
              </div>
            )}
          </Modal.Body>
          <div className="modal-footer">
            <div className="text-center w-100">
              <button
                className="bg-[#514495] text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  for (const year of selectedYears) {
                    const newYear = {
                      name: year,
                    };
                    await addSocialChargeDirigeant(selectedProject, newYear);
                  }
                  if (name) {
                    handleModalSave();
                  }

                  await listSocialCharge();
                  handleModalClose();
                  hanleCloseListOfTheYearsModal();
                }}
                style={{ marginRight: "6px" }}
              >
                Valider
              </button>
              {/* <button
                className="shadow-grey-600 shadow-md bg-dark-purple text-white font-bold py-2 px-4 rounded self-center"
                type="button"
                onClick={() => {
                  handleButtonClick();
                  hanleCloseListOfTheYearsModal();
                }}
              >
                ajouter une année{" "}
              </button> */}
            </div>
          </div>
        </Modal>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier une année</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>année</div>
              <input
                className="form-controls-input"
                type="number"
                min="2020"
                value={anneeName}
                onChange={(e) => setAnneeName(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleModalClose}
            >
              Annuler
            </Button>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleModalUpdate}
            >
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModalCollab} onHide={handleCloseEditModalCollab}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier un dirigeant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3 ">
              <label className="text-black font-w500">
                Pourcentage Participation Capital
              </label>
              <div className="contact-name">
                <input
                  id="editSalireBrut"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  type="text"
                  value={editPourcentageParticipationCapital}
                  onChange={(e) =>
                    setEditPourcentageParticipationCapital(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-group mb-3 py-2">
              <label className="text-black font-w500">
                Réparation renumeration année
              </label>
              <div className="contact-name">
                <input
                  id="editSalireBrut"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  type="text"
                  value={editReparationRenumeratinAnnee}
                  onChange={(e) =>
                    setEditReparationRenumeratinAnnee(e.target.value)
                  }
                />
              </div>{" "}
            </div>
            <div className="form-group mb-3 py-2">
              <label className="text-black font-w500">Beneficier</label>
              <div className="contact-name">
                <input
                  id="editSalireBrut"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  type="text"
                  value={editBeneficier}
                  onChange={(e) => setEditBeneficier(e.target.value)}
                />
              </div>{" "}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleModalUpdateCollab}
            >
              Enregistrer
            </Button>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleCloseEditModalCollab}
            >
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default LeaderCharges;

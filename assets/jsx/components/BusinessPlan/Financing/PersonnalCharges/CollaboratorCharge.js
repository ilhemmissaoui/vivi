import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addsocialChargeAction } from "../../../../../store/actions/BusinessPlanActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import IconMoon from "../../../Icon/IconMoon";
import AddModal from "./Modal";
import {
  DeleteCollab,
  DeleteYear,
  addSocialCharge,
  editCollab,
  editYear,
  getAllSocialCharge,
  getAllSocialChargeCollaborateurs,
} from "../../../../../services/BusinessPlanService";
import ListYearsModal from "../ListYearsModal";
import classNames from "classnames";

const CollaboratorCharges = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [anneeId, setAnneeId] = useState(null);
  const [collabId, setCollabId] = useState(null);

  const [selected, setSelectedName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalCollab, setShowEditModalCollab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showinput, setShowinput] = useState(false);
  const [loader, setLoader] = useState(false);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const selectedprojecttt = useSelector(
    (state) => state.project.selectedProject
  );

  const dispatch = useDispatch();

  const [editAnnee, setEditAnnee] = useState("");

  const [editSalireBrut, setEditSalaireBrut] = useState("");
  const [editTypeContrat, setEditTypeContrat] = useState("");
  const [editChargeSocial, setEditChargeSocial] = useState("");

  const [selectedYears, setSelectedYears] = useState([]);

  const [year, setYear] = useState([]);
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showAddYearsModal, setShowAddYearsModal] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleCloseEditModalCollab = () => {
    setShowEditModalCollab(false);
  };
  const handleOpenEditModal = (annee_id, annee_name) => {
    setAnneeId(annee_id);
    setShowEditModal(true);

    setEditAnnee(annee_name);
  };
  const handleOpenEditModalCollab = (
    collab_id,
    annee_id,
    collabSalaire,
    collabContrat,
    collabCharge
  ) => {
    setCollabId(collab_id);
    setAnneeId(annee_id);

    setShowEditModalCollab(true);

    setEditSalaireBrut(collabSalaire);
    setEditTypeContrat(collabContrat);
    setEditChargeSocial(collabCharge);
  };

  const handleDelete = async (annee_id) => {
    try {
      await DeleteYear(selectedProject, annee_id);
      await listSocialCharge();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteCollab = async (colab_id, annee_id) => {
    try {
      await DeleteCollab(selectedProject, colab_id, annee_id);
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

  const handleOpenModalOfAddYear = async () => {
    setShowAddYearsModal(true);
  };

  const handleCloseModalOfAddYear = async () => {
    setShowAddYearsModal(false);
  };

  const listSocialCharge = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSocialCharge(selectedProject);

      if (response.status == 200) {
        setYear(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    listSocialCharge();
  }, [selectedprojecttt]);

  const handleOpenAddModal = (annee_id, name) => {
    setLoader(true);
    getAllSocialChargeCollaborateurs(selectedProject, annee_id).then((res) => {
      if (res) {
        setMembers(res?.data);
      }
    });

    setAnneeId(annee_id);
    setSelectedName(name);
    setLoader(false);

    setShowAddModal(true);
  };
  const handleModalSave = async () => {
    const names = {
      name,
    };
    await dispatch(addsocialChargeAction(selectedProject, names));
    setShowModal(false);
    await listSocialCharge();
  };

  const handleModalUpdate = async () => {
    const response = await editYear(selectedProject, anneeId, {
      name: editAnnee,
    });
    setShowEditModal(false);
    await listSocialCharge();
  };

  const handleModalUpdateCollab = async () => {
    const response = await editCollab(selectedProject, anneeId, collabId, {
      salaireBrut: editSalireBrut,
      typeContrat: editTypeContrat,
      chargeSocial: editChargeSocial,
    });
    setShowEditModalCollab(false);
    await listSocialCharge();
  };

  const getTotalMontant = (year) => {
    let sumTotal = 0;
    if (
      Array.isArray(year.collaborateurListe) &&
      year.collaborateurListe.length > 0
    ) {
      year.collaborateurListe.forEach((user) => {
        const salaireBrut = user.salaireBrut || 0;
        const chargeSocial = user.chargeSocial || 0;
        sumTotal += salaireBrut + chargeSocial;
      });
    }
    return sumTotal;
  };

  const handleSetAnnee = async () => {
    await selectedYears?.map(async (el) => {
      await addsocialChargeAction(selectedProject, el);
    });
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
              {Array.isArray(year.idAnnee) && year.idAnnee.length > 0 ? (
                year.idAnnee.map((element) => (
                  <div
                    className=" px-2 text-center"
                    key={element.SalaireEtChargeSocialAnneId}
                  >
                    <div className="flex">
                      <div
                        className=""
                        style={{ marginRight: "16px", paddingTop: "11px" }}
                      >
                        <h4 className="font-bold">
                          Année : {element.SalaireEtChargeSocialAnneName}
                        </h4>
                      </div>
                      <button
                        className="mr-2"
                        onClick={() =>
                          handleDelete(element.SalaireEtChargeSocialAnneId)
                        }
                      >
                        <IconMoon size={22} name="trash" />
                      </button>
                    </div>
                    <div>
                      <table className="w-full border-collapse  border-gray-300 rounded-lg">
                        <thead>
                          <tr>
                            <th className="  py-3  text-sm leading-4 font-bold border uppercase">
                              COLLABORATEUR
                            </th>
                            <th className=" py-3  text-sm leading-4 font-bold border uppercase">
                              SALAIRE BRUT
                            </th>
                            <th className=" py-3  text-sm leading-4 font-bold border uppercase">
                              TYPE DE CONTRAT
                            </th>
                            <th className=" py-3  text-sm leading-4 font-bold border uppercase">
                              CHARGES SOCIALES
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {element.collaborateurListe.map((user, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="flex justify-between px-6 py-2 text-sm text-center leading-5 border text-gray-500 ">
                                <div className="justify-content-start ">
                                  {user.username ?? user.SalarieUserName}
                                </div>
                                <div className="flex justify-between">
                                  <button
                                    className="justify-content-end "
                                    onClick={() =>
                                      handleOpenEditModalCollab(
                                        element.SalaireEtChargeSocialAnneId,
                                        user.idCollaborateur,
                                        user.salaireBrut,
                                        user.typeContrat,
                                        user.chargeSocial
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
                                        user.idCollaborateur,
                                        element.SalaireEtChargeSocialAnneId
                                      )
                                    }
                                  >
                                    <IconMoon size={20} name="trash" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.salaireBrut ?? 0}
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.typeContrat ?? "contrat-pro"}
                              </td>
                              <td className="px-6 py-2 text-sm leading-5 border text-gray-500   ">
                                {user.chargeSocial ?? 0}
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
                                      element.SalaireEtChargeSocialAnneId,
                                      element.SalaireEtChargeSocialAnneName
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
                                    {getTotalMontant(element)}
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
            onClick={handleButtonClick}
            className="shadow-grey-600 shadow-md bg-dark-purple text-white font-bold py-2 px-4 rounded self-center"
          >
            Ajouter une année
          </button>
        </div>

        {year.idAnnee && year.idAnnee.length > 0 && (
          <AddModal
            loader={loader}
            members={members}
            anneeId={anneeId}
            show={showAddModal}
            name={selected}
            onHide={handleCloseAddModal}
            setIsLoading={setIsLoading}
            setYear={setYear}
          />
        )}
        <Modal
          show={showModal}
          onHide={handleModalClose}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      /*  {
                        "bg-gray-500": selectedYears.length === 0,
                      } */
                    )}
                    onClick={async () => {
                      for (const year of selectedYears) {
                        const newYear = {
                          name: year,
                        };
                        await addSocialCharge(selectedProject, newYear);
                      }

                      if (name) {
                        handleModalSave();
                      }
                      handleModalClose();
                      await listSocialCharge();
                    }}
                    /*      disabled={selectedYears.length === 0 && !name} */
                  >
                    Valider
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Mdifier une année</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>année</div>
              <input
                className="form-group w-full rounded-xl p-2"
                type="number"
                min="2020"
                value={editAnnee}
                onChange={(e) => setEditAnnee(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-dark-purple hover:bg-black text-white font-bold"
              onClick={handleCloseEditModal}
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
            <Modal.Title>Modifier un collaborateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3 ">
              <label className="text-black font-w500">Salaire brut</label>
              <div className="contact-name">
                <input
                  id="editSalireBrut"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  type="text"
                  value={editSalireBrut}
                  onChange={(e) => setEditSalaireBrut(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mb-3 ">
              <label className="text-black font-w500">Charge sociale</label>
              <div className="contact-name">
                <input
                  id="editChargeSocial"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  type="text"
                  value={editChargeSocial}
                  onChange={(e) => setEditChargeSocial(e.target.value)}
                />
              </div>{" "}
            </div>
            <div className="form-group mb-3 ">
              <label className="text-black font-w500">Type de contrat</label>
              <div className="contact-name">
                <select
                  id="editTypeContrat"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  value={editTypeContrat}
                  onChange={(e) => setEditTypeContrat(e.target.value)}
                >
                  <option value="contrat-pro">contrat pro</option>
                  <option value="contrat-apprentissage">
                    contrat apprentissage
                  </option>
                  <option value="CDD">CDD</option>
                  <option value="CDI">CDI</option>
                </select>
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

export default CollaboratorCharges;

import React, { useEffect, useState } from "react";
import Box from "../components/Box/Box";
import IconMoon from "../components/Icon/IconMoon";
import {
  getProjectByIdAction,
  getUsersAction,
} from "../../store/actions/ProjectAction";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../images/temp-user.jpeg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { createPermission } from "../../services/ProjetService";
const Acces = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [userID, setUserId] = useState("");
  const [nameUser, setNameUser] = useState("");
  const selectedProject = localStorage.getItem("selectedProjectId");
  const [user, setUser] = useState("");
  const [checkedPermissions, setCheckedPermissions] = useState({});

  const [checkedPermissionsOutsideModal, setCheckedPermissionsOutsideModal] =
    useState({});
  const listPermission = [
    {
      histpoire_equipe: "Histoire et équipe",
      marche_concurrence: "Marché et concurrence",
      positionnement_concurrentiel: "Positionnement concurrentiel",
      notre_solution: "Notre solution",
      vision_strategie: "Vision et stratégie",
      financement_charge: "Financement et charge",
      busines_canva: "Business canvas",
    },
  ];

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = (user_id, user_name, user) => {
    setUserId(user_id);
    setShowEditModal(true);
    setNameUser(user_name);
    setUser(user);
    // Initialize checkedPermissions to match the user's pagePermission
    const initialCheckedPermissions = {};
    Object.keys(listPermission[0]).forEach((key) => {
      initialCheckedPermissions[key] =
        user.pagePermission && user.pagePermission.includes(key);
    });
    setCheckedPermissions(initialCheckedPermissions);
  };

  const handleCheckboxChange = (element) => {
    setCheckedPermissions((prevCheckedPermissions) => {
      return {
        ...prevCheckedPermissions,
        [element]: !prevCheckedPermissions[element],
      };
    });
  };
  const listeOfcollaborateur = useSelector(
    (state) => state.project.selectedProject.listeOfcollaborateur
  );
  const handleModalUpdate = async () => {
    const permissionsArray = Object.keys(listPermission[0]).filter(
      (element) => checkedPermissions[element]
    );
    const permissionsObject = permissionsArray.reduce((acc, element, index) => {
      acc[index] = element;
      return acc;
    }, {});
    const postData = {
      [userID]: permissionsObject,
    };
    let response = await createPermission(postData, selectedProject);
    setShowEditModal(false);
    await dispatch(getUsersAction());
    setCheckedPermissionsOutsideModal({});
    await dispatch(getProjectByIdAction(selectedProject));
  };
  return (
    <>
      <div className="justify-items-end">
        <div>
          <Box title={"Les permissions"} />
        </div>

        <div className="bmc-container flex flex-col px-8 py-2">
          <span className=" permission-title flex justify-center items-center text-center py-2">
            Permissions des collaborateurs associés à mon projet
          </span>
          {listeOfcollaborateur?.length > 0 ? (
            <div
              className="overflow-y-scroll"
              style={{ maxHeight: "450px", height: "30%" }}
            >
              {listeOfcollaborateur.map((user) => (
                <div
                  className="flex justify-center items-center"
                  key={user.idCollaborateur}
                >
                  <div
                    className="h-700 mt-10 mx-auto border-2 rounded p-10 "
                    style={{ width: "60%", borderColor: "#EF9118" }}
                  >
                    <div className="flex justify-between">
                      {user && user.photoProfil ? (
                        <img
                          src={user.photoProfil}
                          alt="User Avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      ) : (
                        <img
                          src={profile}
                          alt="User Avatar"
                          className="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}{" "}
                      <h2 className="text-black-700 text-lg font-bold">
                        {user.username}
                      </h2>
                      <button
                        className="mr-2"
                        onClick={() =>
                          handleOpenEditModal(
                            user.idCollaborateur,
                            user.username,
                            user
                          )
                        }
                      >
                        <IconMoon
                          color="#707070"
                          name="edit-input1"
                          size={22}
                        />
                      </button>
                    </div>
                    <div className="py-3">
                      <div style={{ flex: 1, marginRight: "20px" }}>
                        {listPermission[0] &&
                          Object.keys(listPermission[0]).map((key) => (
                            <div key={key}>
                              <div className="flex justify-between">
                                <label className="text-lg">
                                  {listPermission[0][key]}
                                </label>
                                {user.pagePermission &&
                                user.pagePermission.includes(key) ? (
                                  <IconMoon
                                    color="#707070"
                                    name="yes-icon"
                                    size={22}
                                  />
                                ) : null}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center text-center py-5">
              <span>
                Aucun collaborateur n'est actuellement associé à ton projet, ce
                qui empêche l'affichage.<br></br>
                Ajoute des membres collaborateurs pour accéder à cette section
                en cliquant sur l'icône d'ajout de collaborateur située en haut.
              </span>
            </div>
          )}
        </div>
      </div>
      <Modal userID={userID} show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mdifier l'accée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-black-700 text-lg font-bold">{nameUser}</div>
          <div className="py-3">
            <div style={{ flex: 1, marginRight: "20px" }}>
              {listPermission[0] &&
                Object.keys(listPermission[0]).map((key) => (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={key}
                  >
                    <label className="text-lg">
                      <input
                        style={{ marginRight: "15px" }}
                        type="checkbox"
                        checked={checkedPermissions[key]}
                        onChange={() => handleCheckboxChange(key)}
                      />
                      {listPermission[0][key]}
                    </label>
                  </div>
                ))}
            </div>
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
    </>
  );
};
export default Acces;

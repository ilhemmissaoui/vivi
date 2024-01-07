import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Modal, ProgressBar } from "react-bootstrap";
import member from "../../../../../images/user.jpg";
import IconMoon from "../../../Icon/IconMoon";
import { editHistoireEquipeAction } from "../../../../../store/actions/BusinessPlanActions";
import userImg from "../../../../../images/temp-user.jpeg";

import { useUploadImage } from "../../../../../hooks/useUploadImage";
import {
  getBPTeamLoaderSelector,
  getTeamMembers,
} from "../../../../../store/selectors/BusinessPlanSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTeamMember,
  fetchAllMembers,
} from "../../../../../services/BusinessPlanService";
const ItemCard = (props) => {
  const {
    setMemberList,
    firstName,
    lastName,
    role,
    degree,
    description,
    date,
    image,
    memberId,
    dirigeant,
    email,
    loader,
    setLoader,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [editFirstName, seteditFirstName] = useState("");
  const [editLastName, seteditLastName] = useState("");
  const [editEmail, seteditEmail] = useState("");
  const [editrole, seteditRole] = useState("");
  const [editdegree, seteditDegree] = useState("");
  const [editdescription, seteditDescription] = useState("");
  const [photo, setPhoto] = useState("base");
  const [isDirigeant, setIsDirigeant] = useState(dirigeant);
  const [isInvited, setIsInvited] = useState(dirigeant);
  const { setImg, handleUpload } = useUploadImage();
  const allMembers = useSelector(getTeamMembers);
  const [members, setMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleEditClick = () => {
    document.getElementById("fileInput").click();
  };

  const selectedProject = localStorage.getItem("selectedProjectId");
  const [idMember, setIdMember] = useState();
  const handleupdateMemberClick = (id_Membre) => {
    setIdMember(id_Membre);
    seteditEmail(email);
    seteditFirstName(firstName);
    seteditLastName(lastName);
    seteditRole(role);
    seteditDegree(degree);
    setIsDirigeant(dirigeant);
    seteditDescription(description);
    setPhoto(image || "base");
    setShowModal(true);
  };

  const listEquipe = () => {
    if (allMembers) {
      setMembers(allMembers);
    }
  };

  useEffect(() => {
    listEquipe();
  }, [allMembers]);
  const handleModalUpdate = async () => {
    setLoader(true);
    const payload = {
      firstename: editLastName,
      lastename: editLastName,
      email: editEmail,
      diplome: editdegree,
      role: editrole,
      caracteristique: editdescription,
      inviter: isInvited ? 1 : 0,
      isDirigeant: isDirigeant ? 1 : 0,
    };

    await dispatch(
      editHistoireEquipeAction(selectedProject, idMember, payload)
    );
    setLoader(false);
    setShowModal(false);
  };

  useEffect(() => {
    fetchAllMembers(selectedProject).then((res) => {
      if (res) {
        setMemberList(res?.data?.equipeMumber);
      }
    });
  }, []);
  const handleDelete = async (member_id) => {
    await DeleteTeamMember(selectedProject, member_id);

    const response = await fetchAllMembers(selectedProject);
    setMemberList(response?.data?.equipeMumber);
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={`col-md-4 mb-6 `}>
        <div
          className={`item-card rounded-[10px] bg-white border-0.3  border-light-orange `}
        >
          <div className="flex w-full justify-between">
            <div
              className="flex flex-row w-full mx-2 bg-light-orange bg-opacity-25 mb-2 rounded-[10px] mt-1 relative"
              style={{ width: "330px", height: "50px" }}
            >
              <div className="flex flex-row">
                <div className="rounded-full w-[35px] h-[35px] mx-2.5 m-2">
                  <img
                    className="w-full rounded-full"
                    src={image ? image : member}
                    alt="member-img"
                  />
                </div>
                <div className="self-center">
                  <span className={`text-light-orange self-start`}>
                    {`${firstName} ${lastName}`}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center absolute right-2">
                <div className="flex items-center justify-center">
                  <div className=" cursor-pointer  w-small ">
                    <button onClick={() => handleupdateMemberClick(memberId)}>
                      <IconMoon color="#2C2C2C" name="edit-input" />
                    </button>
                  </div>
                  <button
                    className="p-2 bg-color: #2C2C2C text-white font-bold opacity-50"
                    onClick={() => handleOpenModal()}
                  >
                    <IconMoon
                      color="rgba(112, 112, 112, 0.1)"
                      name="trash"
                      size={20}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" cursor-pointer  w-small "></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-left px-4 mt-1 w-full">
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <div className="text-light-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope-at"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-2 mx-2">
                {email ? (
                  <span className={`text-black-1 self-start `}>{email}</span>
                ) : (
                  <span className={`text-gray-400 self-start `}>Email</span>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="text-light-orange" name="setting-person" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                {role ? (
                  <span className={`text-black-1 self-start `}>{role}</span>
                ) : (
                  <span className={`text-gray-400 self-start `}>Role</span>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="text-light-orange" name="graduation" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                {degree ? (
                  <span className={`text-black-1 self-start `}>{degree}</span>
                ) : (
                  <span className={`text-gray-400 self-start `}>Diplome</span>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="text-light-orange" name="calendar" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                {date ? (
                  <span className={`text-black-1 self-start `}>{date}</span>
                ) : (
                  <span className={`text-gray-400 self-start `}>date</span>
                )}
              </div>
            </div>

            <hr className="border-t-1 bg-light-orange !border-light-orange my-2 " />
            {description ? (
              <span className={`text-black-1 self-start `}>{description}</span>
            ) : (
              <span className={`text-gray-400 self-start `}>description</span>
            )}
          </div>
        </div>
      </div>

      <Modal className="modal fade " show={showModal} onHide={handleModalClose}>
        <div className="" role="document">
          <div className="">
            <form className="w-full">
              <div className="flex items-center justify-center mt-4">
                <h4 className="uppercase fs-18 text-light-orange">
                  Ajouter un nouveau membre
                </h4>
              </div>
              <div className=" flex items-center justify-center position-relative mt-2">
                <Form.Control
                  name="photo"
                  type="file"
                  id="fileInput"
                  className="d-none"
                  onChange={handleUpload}
                />
                {!image ? (
                  <div className=" rounded-full w-medium1 h-medium1 bg-dark-purple">
                    <img
                      className="rounded-full h-full w-full object-cover "
                      alt="memberImage"
                      src={userImg}
                    />
                  </div>
                ) : (
                  <div className=" rounded-full w-medium1 h-medium1  bg-dark-purple">
                    <img
                      className="rounded-full h-full w-full object-cover"
                      alt="memberImage"
                      src={photo}
                    />
                  </div>
                )}
                <div className="ml-5 cursor-pointer" onClick={handleEditClick}>
                  <IconMoon
                    className=""
                    color="#504C87"
                    name="plus1"
                    size={24}
                  />
                </div>
              </div>
              <div className="modal-body">
                <i
                  className="flaticon-cancel-12 close"
                  data-dismiss="modal"
                ></i>
                <div className="add-contact-box w-[80%]">
                  <div className="add-contact-content">
                    <div className="mb-3">
                      <label className="text-black font-w500">Prénom</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          name="firstName"
                          value={editFirstName}
                          onChange={(e) => seteditFirstName(e.target.value)}
                          placeholder="prénom"
                        />

                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-black font-w500">Nom</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          name="lastName"
                          value={editLastName}
                          onChange={(e) => seteditLastName(e.target.value)}
                          placeholder="Nom"
                        />

                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-black font-w500">Email</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          name="email"
                          value={editEmail}
                          onChange={(e) => seteditEmail(e.target.value)}
                          placeholder="Email"
                        />

                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-black font-w500">Son rôle</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          name="role"
                          value={editrole}
                          onChange={(e) => seteditRole(e.target.value)}
                          placeholder="rôle"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="text-black font-w500">Diplome</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control border-1"
                          name="degree"
                          value={editdegree}
                          onChange={(e) => seteditDegree(e.target.value)}
                          placeholder="Diplome"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <div className="mb-3">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            checked={isDirigeant}
                            onChange={(e) => setIsDirigeant(e.target.checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                          >
                            dirigeant
                          </label>
                        </div>
                      </div>
                      {/* <div className="mb-3">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            checked={isInvited}
                            onChange={(e) => setIsInvited(e.target.checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                          >
                            invité
                          </label>
                        </div>
                      </div> */}
                    </div>
                    <div className="mb-3">
                      <label className="text-black font-w500">
                        Caractéristiques
                      </label>
                      <div className="contact-name">
                        <textarea
                          type="text"
                          className="rounded-2xl p-2 border-1 h-[100px] w-full"
                          name="description"
                          value={editdescription}
                          onChange={(e) => seteditDescription(e.target.value)}
                          placeholder="Caractéristiques"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button
                  type="button"
                  onClick={handleModalUpdate}
                  className="bg-light-orange hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24	 self-center "
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

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
                Es-tu sûr(e) de vouloir supprimer ce membre ?
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={() => setIsModalOpen(false)}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                className="delete-button-style-member"
                onClick={() => handleDelete(memberId)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import userImg from "../../../../../images/temp-user.jpeg";
import IconMoon from "../../../Icon/IconMoon";
import { useUploadImage } from "../../../../../hooks/useUploadImage";
import { useDispatch } from "react-redux";
import { ajouterNewMember } from "../../../../../store/actions/BusinessPlanActions";
import {
  addNewMember,
  fetchAllMembers,
} from "../../../../../services/BusinessPlanService";

const AddNewMember = ({ setShowModal, setMemberList }) => {
  const selectedProject = localStorage.getItem("selectedProjectId");
  const { image, setImg, handleUpload } = useUploadImage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [degree, setDegree] = useState("");
  const [isDirigeant, setIsDirigeant] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorss, setErrorss] = useState();

  const dispatch = useDispatch();

  const handleEditClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleAdd = async () => {
    let errors = {
      firstName: "",
      lastName: "",
    };

    let isValid = true;
    if (!firstName) {
      errors.firstName = "Le prénom est obligatoire";
      isValid = false;
    }
    if (!lastName) {
      errors.lastName = "Le nom est obligatoire";
      isValid = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Le format email est invalide.";
      isValid = false;
    }
    const payload = {
      firstename: firstName,
      lastename: lastName,
      email: email,
      diplome: degree,
      role: role,
      caracteristique: description,
      inviter: isInvited ? 1 : 0,
      isDirigeant: isDirigeant ? 1 : 0,
    };
    setFormErrors(errors);

    if (isValid) {
      try {
        const response = await addNewMember(selectedProject, payload);

        if (response.data === "email existe ") {
          setErrorss(response.data);
        } else {
          const membersResponse = await fetchAllMembers(selectedProject);
          setMemberList(membersResponse?.data?.equipeMumber);
          setErrorss("");
          setShowModal(false);
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  return (
    <form className="w-full">
      <div className="flex items-center justify-center mt-10">
        <h4 className="uppercase fs-26 text-light-orange">
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
              src={image}
            />
          </div>
        )}
        <div className="ml-5 cursor-pointer" onClick={handleEditClick}>
          <IconMoon className="" color="#EF9118" name="plus1" size={24} />
        </div>
      </div>
      <div className="modal-body">
        <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
        <div className="add-contact-box w-[80%]">
          <div className="add-contact-content">
            <div className="mb-3">
              <div className="contact-name">
                <input
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                />
                {formErrors.firstName && (
                  <small className="text-red-500">{formErrors.firstName}</small>
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className="contact-name">
                <input
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                />
                {formErrors.lastName && (
                  <small className="text-red-500">{formErrors.lastName}</small>
                )}{" "}
              </div>
            </div>
            <div className="mb-3">
              <div className="contact-name">
                <input
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {formErrors.email && (
                  <small className="text-red-500">{formErrors.email}</small>
                )}
                {errorss && <small className="text-red-500">{errorss}</small>}{" "}
              </div>
            </div>
            <div className="mb-3">
              <div className="contact-name">
                <input
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="Son rôle"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Son rôle"
                />
                <span className="validation-text"></span>
              </div>
            </div>

            <div className="mb-3">
              <div className="contact-name">
                <input
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="Son rôle"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Diplome"
                />
                <span className="validation-text"></span>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-group my-3">
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  id="inlineCheckbox1"
                  name="dirigeant"
                  checked={isDirigeant}
                  onChange={(e) => setIsDirigeant(e.target.checked)}
                />
                <label
                  className="text-[#AEAEAE] text-base pl-2"
                  htmlFor="invitationMail"
                >
                  dirigeant{" "}
                </label>
              </div>
            </div>

            <div className="mb-3">
              <div className="contact-name">
                <textarea
                  type="text"
                  className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                  autoComplete="off"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Caractéristiques"
                />
                <span className="validation-text"></span>
              </div>
            </div>

            <div className="flex justify-start items-center">
              <div className="mb-3">
                <div className="flex justify-center">
                  <input
                    className="form-check-input mx-2"
                    type="checkbox"
                    id="invitationMail"
                    name="invitationMail"
                    checked={isInvited}
                    onChange={(e) => setIsInvited(e.target.checked)}
                  />
                  <label
                    className="text-[#AEAEAE] text-xs pl-2"
                    htmlFor="invitationMail"
                  >
                    Invitation par e-mail à s'inscrire sur la plateforme pour
                    ajouter cet utilisateur en tant que collaborateur au projet.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-light-orange hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24	 self-center "
        >
          Valider
        </button>
      </div>
    </form>
  );
};

export default AddNewMember;

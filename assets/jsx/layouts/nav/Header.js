import React, { useState, useEffect } from "react";
import IconMoon from "../../components/Icon/IconMoon";
import { Link } from "react-router-dom";
/// Scroll
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
/// Image
import profile from "../../../images/temp-user.jpeg";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import LogoutPage from "./Logout";
import { getAccountInfo } from "../../../store/selectors/AccountSelectors";
import {
  SendMailAction,
  addCollabByMailAction,
  addCollaboratorAction,
  addEmployeeAction,
  getBusinessPlanTeamMembersAction,
} from "../../../store/actions/BusinessPlanActions";
import { getTeamMembers } from "../../../store/selectors/BusinessPlanSelectors";
import {
  getUsersAction,
  getProjectByIdAction,
  getUsersNotCollabAction,
  selectProjectAction,
} from "../../../store/actions/ProjectAction";
import { addCollabProjet } from "../../../services/BusinessPlanService";
import { selectAllProjects } from "../../../store/selectors/ProjectSelectors";
import { Tooltip } from "react-tooltip";
import { async } from "regenerator-runtime";
import { getCollaborateurProject } from "../../../services/ProjetService";

const Header = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMailSent, setShowPopUpMailSent] = useState(false);
  const [showPopUpNosetShowPopUpNon, setShowPopUpNon] = useState(false);
  const [showPopUpOk, setShowPopUpOk] = useState(false);
  const [showPopUpNo, setShowPopUpNo] = useState(false);
  const [showPopUpExist, setShowPopUpExist] = useState(false);
  const dispatch = useDispatch();
  const DropdownItem = React.memo(
    ({ element, selectedMembers, handleCheckboxChange }) => {
      return (
        <Dropdown.Item key={element.id}>
          <label>
            <input
              style={{ marginRight: "15px" }}
              type="checkbox"
              checked={selectedMembers.has(element.id)}
              onChange={() => handleCheckboxChange(element)}
            />
            {element.firstname} {element.lastname}
          </label>
        </Dropdown.Item>
      );
    }
  );
  const [firstName, setFirstName] = useState("");
  const [hoveredUser, setHoveredUser] = useState(null);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [members, setMembers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const selectedProjects = useSelector((state) => state.project);

  const listCollab = useSelector(
    (state) => state.project.selectedProject.listeOfcollaborateur
  );

  const listUsers = useSelector(
    (state) => state.project.selectedProject.listUserForCollaborateur
  );
  const allProjects = useSelector(selectAllProjects);
  const [projects, setProjects] = useState([]);

  const [personalInfo, setPersonalInfo] = useState(
    JSON.parse(localStorage.getItem("personalInfo"))
  );
  const [selectedMembers, setSelectedMembers] = useState(new Set());

  const accountInfo = useSelector(getAccountInfo);
  const selectedProject = localStorage.getItem("selectedProjectId");
  const allMembers = useSelector(getTeamMembers);
  const hanleClosePopUpModal = async () => {
    setShowPopUp(false);
  };
  const hanleClosePopUpModal1 = async () => {
    setShowPopUpMailSent(false);
  };
  const hanleClosePopUpModal2 = async () => {
    setShowPopUpNon(false);
  };
  const hanleClosePopUpModal3 = async () => {
    setShowPopUpOk(false);
  };
  const hanleClosePopUpModal4 = async () => {
    setShowPopUpNo(false);
  };
  const hanleClosePopUpModal5 = async () => {
    setShowPopUpExist(false);
  };
  useEffect(() => {
    setPersonalInfo(JSON.parse(localStorage.getItem("personalInfo")));
    setFirstName(personalInfo?.firstname);
    setLastName(personalInfo?.lastename);
    setProfileImg(personalInfo?.photoProfil);
  }, [accountInfo]);
  const [collab, setCollab] = useState({});
  const fetchCollab = async () => {
    try {
      const collabs = await getCollaborateurProject(selectedProject);
      setCollab(collabs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getBusinessPlanTeamMembersAction(selectedProject));
    fetchCollab();
    dispatch(getProjectByIdAction(selectedProject));
  }, [dispatch, selectedProject]);

  useEffect(() => {
    if (allMembers) {
      setMembers(allMembers);
    }
  }, [allMembers]);
  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);

  /* useEffect(() => {
    dispatch(getProjectByIdAction(selectedProject));
  });
   */
  // useEffect(() => {
  //   dispatch(getUsersNotCollabAction(selectedProject)).catch((error) => {
  //     console.error(error);
  //   });
  // }, []);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(selectedProject);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setUserLoading(true);
      dispatch(getUsersAction())
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setUserLoading(false);
        });
    }
  };
  const handleCheckboxChange = (user) => {
    const updatedSelectedMembers = new Set(selectedMembers);

    if (updatedSelectedMembers.has(user.id)) {
      updatedSelectedMembers.delete(user.id);
    } else {
      updatedSelectedMembers.add(user.id);
    }
    setSelectedMembers(updatedSelectedMembers);
  };

  /* const handleSubmit = async () => {
    const project = localStorage.getItem("selectedProjectId");
    const collaborateurObj = Array.from(selectedMembers); // Convert Set to array

    const collab = {
      collaborateur: collaborateurObj,
    };
    try {
      await dispatch(addCollaboratorAction(selectedProject, collab));
      //dispatch(getProjectByIdAction(project));
      setSelectedMembers(new Set()); // Clear the selected members
      setIsOpen(false);
      setMembers(allMembers);
    } catch (error) {
      console.error(error);
      setErrorMessage("Échec de l'ajout d'un collaborateur.");
    }
    dispatch(getProjectByIdAction(project));
  }; */
  const handleInviteCollab = async () => {
    const employee = {
      collaborateur: email,
    };
    const response = await dispatch(addCollabByMail(selectedProject, employee));
    if (response.data == "inviter") {
      setShowPopUp(false);
      setShowPopUpMailSent(true);
    } else {
      if (response.data == "ok") {
        getCollaborateurProject(selectedProject);
        setShowPopUp(false);
        setShowPopUpOk(true);
      }
    }
  };
  const handleInviteCollabNon = async () => {
    setShowPopUp(false);
    setShowPopUpNon(true);
  };
  const handleInviteCollabOui = async () => {
    setShowPopUp(false);
    const employee = {
      collaborateur: email,
    };
    const response = await dispatch(SendMailAction(selectedProject, employee));
    if (response.data == "ok") {
      setShowPopUpMailSent(true);
    }
  };

  const handleSubmit = async (e) => {
    setIsOpen(false);
    let errors = {
      email: "",
    };
    e.preventDefault();
    let isValid = true;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Le format email est invalide.";
      isValid = false;
    }
    const employee = {
      collaborateur: email,
    };
    setFormErrors(errors);
    if (isValid) {
      try {
        const response = await dispatch(
          addCollabByMailAction(selectedProject, employee)
        );
        setLoading(true);
        if (response.data == "inviter") {
          setShowPopUp(true);
        }
        if (response.data == "ok") {
          setShowPopUp(false);
          setShowPopUpOk(true);
          fetchCollab();
        }
        if (response.data == "Collaborateur déjà invité") {
          setShowPopUp(false);
          setShowPopUpNo(true);
        }
        if (response.data == "collaborateur existe déjà") {
          setShowPopUp(false);
          setShowPopUpExist(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
      dispatch(getProjectByIdAction(selectedProject));
    }
    setEmail("");

    /*  setShowSecondModal(true);
    onHide(); */
  };

  const fermer = async () => {
    setIsOpen(false);
  };
  const handleHover = (element) => {
    setHoveredUser(element ? element.username : null);
  };

  return (
    <div className="header border-bottom">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          {projects.length > 0 ? (
            <Dropdown className="sidebar-dropdown-container" show={isOpen}>
              <Dropdown.Toggle
                className="sidebar-dropdown-icon"
                id="dropdown-basic"
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* <img
                  src={profile}
                  alt="User Avatar"
                  className="rounded-circle my-anchor-element"
                  style={{ width: "35px", height: "30px" }}
                  title="Selectionner des collaborateurs"
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 41.63 41.63"
                >
                  <g
                    id="Groupe_4560"
                    data-name="Groupe 4560"
                    transform="translate(-426.066 -79.255)"
                  >
                    <ellipse
                      id="Ellipse_83"
                      data-name="Ellipse 83"
                      cx="20.815"
                      cy="20.815"
                      rx="20.815"
                      ry="20.815"
                      transform="translate(426.066 79.255)"
                      fill="#dbd8d8"
                    />
                    <path
                      id="Tracé_2178"
                      data-name="Tracé 2178"
                      d="M956.359,1325.675a21.845,21.845,0,0,1-6.947-.938,9.969,9.969,0,0,1-.961-.386c-2-.907-2.588-1.85-2.319-4.008a9.808,9.808,0,0,1,4.317-7.064.822.822,0,0,1,1.115-.008,7.658,7.658,0,0,0,8.9,0,.826.826,0,0,1,1.118.006,9.818,9.818,0,0,1,4.387,8.257,2.739,2.739,0,0,1-1.608,2.4,14.086,14.086,0,0,1-6.029,1.647C957.57,1325.659,956.795,1325.656,956.359,1325.675Z"
                      transform="translate(-508.725 -1214.086)"
                      fill="#fff"
                    />
                    <path
                      id="Tracé_2179"
                      data-name="Tracé 2179"
                      d="M980.316,1239.564a6.577,6.577,0,1,1-6.643-6.542A6.57,6.57,0,0,1,980.316,1239.564Z"
                      transform="translate(-526.445 -1146.85)"
                      fill="#fff"
                    />
                    <g id="Groupe_4559" data-name="Groupe 4559">
                      <path
                        id="Tracé_7185"
                        data-name="Tracé 7185"
                        d="M283.84,79.718a4.494,4.494,0,1,0,4.495,4.495A4.495,4.495,0,0,0,283.84,79.718Zm2.084,4.6h-1.868V86.3a.216.216,0,1,1-.433,0V84.32h-1.868a.216.216,0,0,1,0-.433h1.868V82.128a.216.216,0,1,1,.433,0v1.759h1.868a.216.216,0,1,1,0,.433Z"
                        transform="translate(171.821 23.282)"
                        fill="#e73248"
                      />
                    </g>
                  </g>
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "250px" }}>
                <div className="px-2">
                  {/*  {userLoading ? (
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
                      {listUsers &&
                        Array.isArray(listUsers) &&
                        listUsers.map((element) => (
                          <DropdownItem
                            key={element.id}
                            element={element}
                            selectedMembers={selectedMembers}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                        ))}
                    </>
                  )} */}
                  <input
                    type="text"
                    className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                    autoComplete="off"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email du collaborateur"
                  />
                  {formErrors.email && (
                    <small className="text-red-500">{formErrors.email}</small>
                  )}{" "}
                </div>
                <Dropdown.Divider />
                <div className=" py-2 flex justify-between">
                  <button className="ms-3" onClick={handleSubmit}>
                    Ajouter
                  </button>
                  <button className="me-3 " onClick={fermer}>
                    X
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div>
              <Dropdown
                className={`sidebar-dropdown-container disabled`}
                show={false}
                onToggle={toggleDropdown}
              >
                <Dropdown.Toggle
                  className={`sidebar-dropdown-icon disabled`}
                  id="dropdown-basic"
                  disabled
                >
                  <IconMoon
                    className="plus-icon"
                    color="#DBD8D8"
                    name="plus1"
                    size={32}
                  />
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          )}

          <>
            {collab?.data &&
            Array.isArray(collab?.data) &&
            collab?.data.length > 0 ? (
              collab?.data.map((element) => (
                <div
                  key={element.id}
                  onMouseEnter={() => handleHover(element)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <Tooltip anchorSelect=".my-anchor-element" place="top">
                    {hoveredUser === element.username ? element.username : ""}
                  </Tooltip>
                  <img
                    src={element.photoProfil ? element.photoProfil : profile}
                    alt="User Avatar"
                    className="rounded-circle my-anchor-element"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </>
          <div className="navbar-collapse navbar-collapse justify-content-end ">
            <ul className="navbar-nav header-right ">
              <li className="nav-item d-flex align-items-center">
                <Link
                  to={"/project"}
                  type="button"
                  className="bg-red-500 rounded-full p-2"
                  title="Ajouter un nouveau projet"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#FFF"
                    className="bi bi-folder-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
                    <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </Link>
              </li>

              <>
                <div
                  as="li"
                  className="nav-item dropdown header-profile "
                  style={{ borderLeft: "solid 1px #c0c0c0" }}
                >
                  <div className="nav-link i-false c-pointer">
                    <Link to="/app-profile">
                      <img
                        src={profileImg ? profileImg : profile}
                        width={20}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>

                <li className="nav-item d-flex align-items-center">
                  <span
                    style={{
                      textAlign: "left",
                      letterSpacing: "0px",
                      color: "#2C2C2C",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      fontSize: "15px",
                      lineHeight: "15px",
                    }}
                  >
                    {firstName} {lastName}
                  </span>
                </li>
              </>
              <li className="nav-item d-flex align-items-center ">
                <div className="relative cursor-pointer">
                  <IconMoon name="danger" size={16} />
                  <div
                    className="absolute top-0 text-white text-center	justify-center"
                    style={{
                      backgroundColor: "#DC3545",
                      height: "12px",
                      width: "12px",
                      borderRadius: "50%",
                      fontSize: "10px",
                      right: "-5px",
                      paddingBottom: "1px",
                    }}
                  >
                    0
                  </div>
                </div>
              </li>
              <li className="nav-item d-flex align-items-center ">
                <div className="relative cursor-pointer">
                  <IconMoon name="person" size={16} />
                  <div
                    className="absolute top-0 text-white text-center	justify-center"
                    style={{
                      backgroundColor: "#E1C699",
                      height: "12px",
                      width: "12px",
                      borderRadius: "50%",
                      fontSize: "10px",
                      right: "-5px",
                      paddingBottom: "1px",
                    }}
                  >
                    {" "}
                    0{" "}
                  </div>
                </div>
              </li>
              <li className="nav-item d-flex align-items-center ">
                <div className="relative cursor-pointer">
                  <IconMoon name="faq" size={16} />
                  <div
                    className="absolute top-0 text-white text-center	justify-center"
                    style={{
                      backgroundColor: "#FF7F00",
                      height: "12px",
                      width: "12px",
                      borderRadius: "50%",
                      fontSize: "10px",
                      right: "-5px",
                      paddingBottom: "1px",
                    }}
                  >
                    {" "}
                    0{" "}
                  </div>
                </div>
              </li>
              <li className="nav-item d-flex align-items-center">
                <LogoutPage />
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Modal
        show={showPopUp}
        onHide={hanleClosePopUpModal}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>
              Cet utilisateur n'est pas inscrit sur la plateforme.
              Souhaitez-vous l'inviter par e-mail ?
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={handleInviteCollabOui}
              style={{ marginRight: "6px" }}
            >
              Oui
            </button>
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded"
              onClick={handleInviteCollabNon}
              style={{ marginRight: "6px" }}
            >
              Non
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={showPopUpMailSent}
        onHide={hanleClosePopUpModal1}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>
              Cet utilisateur a bien reçu votre invitation de s'inscrire sur la
              plateforme. Il sera ajouté à votre projet dès son inscription.
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={hanleClosePopUpModal1}
              style={{ marginRight: "6px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={showPopUpNosetShowPopUpNon}
        onHide={hanleClosePopUpModal2}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>
              Cet utilisateur ne sera pas ajouté à votre projet en tant que
              collaborateur.
            </div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={hanleClosePopUpModal2}
              style={{ marginRight: "6px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={showPopUpOk}
        onHide={hanleClosePopUpModal3}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>Le collaborateur a été ajouté avec succès à votre projet</div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={hanleClosePopUpModal3}
              style={{ marginRight: "6px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={showPopUpNo}
        onHide={hanleClosePopUpModal4}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>Cet utilisateur a déjà été invité sur la plateforme.</div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={hanleClosePopUpModal4}
              style={{ marginRight: "6px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        show={showPopUpExist}
        onHide={hanleClosePopUpModal5}
        dialogClassName="modal-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="justify-around">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="form-group">
            <div>Cet collaborateur existe déjà.</div>
          </div>
        </Modal.Body>
        <div className="modal-footer">
          <div className="text-center w-100">
            <button
              className="bg-light-orange text-white font-bold py-2 px-4 rounded"
              onClick={hanleClosePopUpModal5}
              style={{ marginRight: "6px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;

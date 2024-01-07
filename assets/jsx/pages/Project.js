import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAction,
  getAllProjectsAction,
} from "../../store/actions/ProjectAction";
import { getUsersAction } from "../../store/actions/ProjectAction";
import { Form } from "react-bootstrap";

import IconMoon from "../components/Icon/IconMoon";
import { useUploadImage } from "../../hooks/useUploadImage";
import Box from "../components/Box/Box";
import { Link, useHistory } from "react-router-dom";
import profile from "../../images/temp-user.jpeg";
import { sendInvitation } from "../../services/ProjetService";

const Project = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { image, setImg, handleUpload } = useUploadImage();
  const selectedProject = localStorage.getItem("selectedProjectId");
  const [isLoading, setIsLoading] = useState(false);
  var err = useSelector((state) => state.project.err);
  var prjectData = useSelector((state) => state.project.idProjet);
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [siret, setSiret] = useState("");
  const [codePostal, setcodePostal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [adressSiegeSocial, setadressSiegeSocial] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [collaborateur, setCollaborateur] = useState([]);
  const [siretError, setSiretError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [couleurPrincipal, setCouleurPrincipal] = useState("#B0E0E6");
  const [couleurSecondaire, setCouleurSecondaire] = useState("#B0C4DE");
  const [couleurMenu, setCouleurMenu] = useState("#0000FF");
  const [formErrors, setFormErrors] = useState({});
  const handleChange1 = (event) => {
    setCouleurPrincipal(event.target.value);
  };
  const handleChange2 = (event) => {
    setCouleurSecondaire(event.target.value);
  };
  const handleChange3 = (event) => {
    setCouleurMenu(event.target.value);
  };
  const [isEmailFound, setIsEmailFound] = useState(false);

  const user = useSelector((state) => state.users);
  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    const filteredCollaborateurs = collaborateur.filter((user) => {
      const isUserSelected = selectedUser?.some(
        (selected) => selected.id === user.id
      );
      return (
        user.email.toLowerCase().includes(searchValue.toLowerCase()) &&
        !isUserSelected
      );
    });
    setCollaborateur(filteredCollaborateurs);

    // Check if the searched email exists in the filteredCollaborateurs array
    // const emailExists = filteredCollaborateurs.some(
    //   (user) => user.email.toLowerCase() === searchValue.toLowerCase()
    // );
    setIsEmailFound(filteredCollaborateurs);
  };
  useEffect(() => {
    dispatch(getUsersAction(selectedProject))
      .then((response) => {
        let filteredCollaborateurs = response;
        if (searchInput) {
          // Filter the collaborateurs based on the search input
          filteredCollaborateurs = response.filter((user) =>
            user.email.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
        setCollaborateur(filteredCollaborateurs);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [searchInput, selectedProject]);
  const handleUserSelect = (user) => {
    if (!selectedUser) {
      setSelectedUser([]);
    }

    if (selectedUser !== null) {
      const userIndex = selectedUser.findIndex(
        (selectedUser) => selectedUser.id === user.id
      );

      if (userIndex !== -1) {
        const updatedSelectedUser = [...selectedUser];
        updatedSelectedUser.splice(userIndex, 1);
        setSelectedUser(updatedSelectedUser);
      } else {
        setSelectedUser([...selectedUser, user]);
      }
    }

    //setShowUserList(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setSelectedImage(imageUrl);
  };

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const inviteMail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (searchInput === "") {
      setErrorMessage("Le champ email est requis");
      return;
    } else if (!emailRegex.test(searchInput)) {
      setErrorMessage("Format email est invalide");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Clear the error message after 3 seconds
      return;
    }

    const emailExists = collaborateur.some(
      (user) => user.email === searchInput
    );

    if (!emailExists) {
      // Send the invitation email
      try {
        await sendInvitation(searchInput);
        setSuccessMessage("invitation envoyée avec succès");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000); // Clear the success message after 3 seconds
      } catch (error) {
        setErrorMessage("Error sending invitation email.");
      }
    } else {
      setErrorMessage("Emailexiste déja");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000); // Clear the error message after 3 seconds
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let collaborateurObj = {};

    if (selectedUser) {
      const userIds = selectedUser.map((user) => user.id);

      collaborateurObj = userIds.reduce((acc, userId, index) => {
        acc[index] = userId;
        return acc;
      }, {});
    }

    let errors = {
      name: "",
      slogan: "",
      siret: "",
      adressSiegeSocial: "",
      codePostal: "",
    };

    let isValid = true;

    if (!name) {
      errors.name = "Nom du projet est obligatoire";
      isValid = false;
    }

    if (siret && !/^\d{14}$/.test(siret)) {
      errors.siret = "Le numéro siret doit contenir 14 chiffres.";
      isValid = false;
    }

    if (codePostal && !/^\d{5}$/.test(codePostal)) {
      errors.codePostal = "Le code postal doit contenir 5 chiffres.";
      isValid = false;
    }

    setFormErrors(errors);

    /* if (isValid) {
      try {
        let response = await dispatch(
          createProjectAction({
            name: name,
            logo: image,
            couleurPrincipal: couleurPrincipal,
            couleurSecondaire: couleurSecondaire,
            couleurMenu: couleurMenu,
            slogan,
            collaborateur: collaborateurObj,
            PagePermissin: {
              1: {
                0: "111",
                1: "11",
                2: "111",
                3: "azert",
                4: "tgv",
                5: "koi",
              },
              2: { 0: "33", 1: "33", 2: "33" },
              3: { 0: "44", 1: "78" },
            },
            adressSiegeSocial: adressSiegeSocial,
            siret: siret,
            codePostal,
          })
        );

        if (response) {
          history.push("/dashboard");
        }
        setIsLoading(true);
        await dispatch(getAllProjectsAction());
        setIsLoading(false);
      } catch (error) {
        console.error("error", error);
      }
    } */
    if (isValid) {
      try {
        dispatch(
          createProjectAction({
            name: name,
            logo: image,
            couleurPrincipal: couleurPrincipal,
            couleurSecondaire: couleurSecondaire,
            couleurMenu: couleurMenu,
            slogan,
            collaborateur: collaborateurObj,
            PagePermissin: {
              1: {
                0: "111",
                1: "11",
                2: "111",
                3: "azert",
                4: "tgv",
                5: "koi",
              },
              2: { 0: "33", 1: "33", 2: "33" },
              3: { 0: "44", 1: "78" },
            },
            adressSiegeSocial: adressSiegeSocial,
            siret: siret,
            codePostal,
          })
        );

        dispatch(getAllProjectsAction());
        // After successfully dispatching the action, reload the page
        history.push("/dashboard");
        //
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  return (
    <div>
      <Box title={"Ajouter un nouveau projet"} />

      <div className="bmc-container">
        <div className="project-form-container">
          <Form className="p-form-container " onSubmit={handleSubmit}>
            <div className="row  mb-2">
              <div className="col-md-3 py-2">
                <label htmlFor="profileImage">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile Image"
                      width="189"
                      height="115"
                      className="img-thumbnail"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <div className="div-thumbnail">
                      <IconMoon
                        className="bm-plus-icon"
                        color="#959494"
                        name="plus_2"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control-file"
                    id="profileImage"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </label>
              </div>

              <div className="col-md-2 py-5">
                <div className="form-group">
                  <label>
                    <span className="form-controls-label1">
                      Couleur principale :
                    </span>{" "}
                  </label>{" "}
                  <br />
                  <input
                    className="form-control"
                    type="color"
                    id="colorInput"
                    value={couleurPrincipal}
                    onChange={handleChange1}
                  />
                </div>
              </div>
              <div className="col-md-2 py-5">
                <div className="form-group">
                  <label>
                    <span className="form-controls-label1">
                      Couleur secondaire :
                    </span>{" "}
                  </label>
                  <br />
                  <input
                    className="form-control"
                    type="color"
                    id="colorInput"
                    value={couleurSecondaire}
                    onChange={handleChange2}
                  />
                </div>
              </div>
              <div className="col-md-2 py-5">
                <div className="form-group">
                  <label>
                    <span className="form-controls-label1">
                      Couleur de menu :
                    </span>{" "}
                  </label>{" "}
                  <br />
                  <input
                    className="form-control"
                    type="color"
                    id="colorInput"
                    value={couleurMenu}
                    onChange={handleChange3}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 text-start">
                <div className="form-controls-project">
                  <label className="mb-1 ">
                    <span className="form-controls-label1">
                      Nom du projet<span className="required">*</span>
                    </span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className={`form-controls-input`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <small className="text-red-500">{formErrors.name}</small>
                )}{" "}
              </div>
              <div className="col-md-6 text-start">
                <div className="form-controls-project">
                  <label htmlFor="inputField2" className="mb-1">
                    <span className="form-controls-label1">Slogan</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input12"
                  className={`form-controls-input`}
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className=" col-md-6 text-start ">
                <div className="form-controls-project">
                  <label htmlFor="inputField3" className="mb-1">
                    <span className="form-controls-label1">Siége social</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input13"
                  className={`form-controls-input`}
                  value={adressSiegeSocial}
                  onChange={(e) => setadressSiegeSocial(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 text-start">
                <div className="form-controls-project">
                  <label htmlFor="inputField4" className="mb-1">
                    <span className="form-controls-label1">N° siret </span>
                  </label>
                </div>
                <Form.Control
                  type="number"
                  id="input14"
                  className={`form-controls-input`}
                  value={siret}
                  onChange={(e) => setSiret(e.target.value)}
                />
                {formErrors.siret && (
                  <small className="text-red-500">{formErrors.siret}</small>
                )}
                {err && <small className="text-red-500">{err}</small>}
                {/* {prjectData && history.push("/dashboard")} */}
              </div>
              <div className="col-md-6 text-start">
                <div className="form-controls-project">
                  <label htmlFor="inputField5" className="mb-1">
                    <span className="form-controls-label1">Code postal</span>
                  </label>
                </div>
                <Form.Control
                  type="number"
                  id="input15"
                  className={`form-controls-input`}
                  value={codePostal}
                  onChange={(e) => setcodePostal(e.target.value)}
                />
                {formErrors.codePostal && (
                  <small className="text-red-500">
                    {formErrors.codePostal}
                  </small>
                )}{" "}
              </div>
            </div>
            <div className="row justify-content-center">
              <div>
                {/*  <button
                  className="select-button"
                  onClick={() => setShowUserList((prevState) => !prevState)}
                  type="button"
                >
                  Ajouter un collaborateur
                </button> */}

                {showUserList && (
                  <>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="rechercher..."
                          value={searchInput}
                          onChange={(e) => handleSearch(e.target.value)}
                          className="search-input form-control"
                        />
                      </div>
                    </div>

                    {isEmailFound ? (
                      <div className="py-3">
                        <button
                          className="create-button"
                          type="button"
                          onClick={inviteMail}
                        >
                          Inviter
                        </button>
                      </div>
                    ) : null}

                    <div className="collab-list">
                      <table className="table">
                        <tbody>
                          {collaborateur &&
                            collaborateur.map((user) => (
                              <tr key={user.id}>
                                <td>
                                  {user && user.photoProfil ? (
                                    <img
                                      src={user.photoProfil}
                                      alt="User Avatar"
                                      className="rounded-circle "
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                  ) : (
                                    <img
                                      src={profile}
                                      alt="User Avatar"
                                      className="rounded-circle "
                                      style={{ width: "30px", height: "30px" }}
                                    />
                                  )}
                                </td>
                                <td>{user.email}</td>
                                {/* <td>
                                <DropdownWithCheckRadio />
                              </td> */}
                                <td>
                                  {/* <button
                                type="button"
                                onClick={() => handleUserSelect(user)}
                                value={collaborateur}
                                className="invite-button btn-sm "
                                style={{ padding: "10px" }}
                              >
                                Ajouter
                              </button> */}

                                  <input
                                    type="checkbox"
                                    onChange={() => handleUserSelect(user)}
                                    checked={selectedUser?.some(
                                      (selected) => selected.id === user.id
                                    )}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr style={{ width: "94%" }} />
            <div className="py-5 mt-3" style={{ width: "94%" }}>
              <button
                type="submit"
                className="mx-auto create-button justify-content-center"
              >
                Créer
              </button>
              {/* <Link to="/">Back to Home</Link> */}
            </div>
          </Form>
          <div>
            {successMessage && (
              <div className="profile-success-message">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="profile-error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Project;

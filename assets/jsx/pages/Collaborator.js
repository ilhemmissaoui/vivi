import React, { useState, useEffect, useCallback, memo } from "react";
import { Form, Button } from "react-bootstrap";
import profile from "../../images/temp-user.jpeg";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import IconMoon from "../components/Icon/IconMoon";
import { createCollaboratorAction } from "../../store/actions/CollaboratorAction";
import { useUploadImage } from "../../hooks/useUploadImage";
import Box from "../components/Box/Box";

const Collaborator = () => {
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const { image, setImg, handleUpload } = useUploadImage();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });

  const handleEditClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let isValid = true;

    if (!firstName) {
      errors.firstName = "firstName is required";
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = "lastName is required";
      isValid = false;
    }
    if (!userName) {
      errors.userName = "userName is required";
      isValid = false;
    }
    if (!email) {
      errors.email = "email is required";
      isValid = false;
    }
    setFormErrors(errors);
    if (isValid) {
      try {
        dispatch(
          createCollaboratorAction({
            nom: firstName,
            prenom: lastName,
            username: userName,
            email: email,
            logo: image,
          })
        );

        setSuccessMessage("Collaborateur créé avec succès !");
      } catch (error) {
        setErrorMessage("Échec de la création du Collaborateur.");
      }
    }
  };

  return (
    <div>
      <Box title={"Créer un collaborateur"} />

      <div className="bmcP-container">
        <Form className="project-form-container" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <div className="position-relative profile-image-container">
              <Form.Control
                type="file"
                id="fileInput"
                className="d-none"
                onChange={handleUpload}
              />
              <div onClick={handleEditClick}>
                <IconMoon
                  className="edit-icon"
                  color="#504C87"
                  name="edit-input"
                  size={24}
                />
              </div>

              <div>
                {!image ? (
                  <div>
                    <img
                      className="profile-image"
                      alt="profile"
                      src={profile}
                    />
                  </div>
                ) : (
                  <img className="profile-image" alt="profile" src={image} />
                )}
              </div>
            </div>
          </div>
          <div className="profile-form">
            <div className="form-inputs">
              <div className="form-controls">
                <label htmlFor="inputField" className="mb-1">
                  <span className="form-controls-label">
                    Prénom<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="text"
                  value={firstName}
                  placeholder="Prénom"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-controls">
                <label className="mb-1">
                  <span className="form-controls-label">
                    Nom<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="text"
                  value={lastName}
                  placeholder="Nom"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-inputs">
              <div className="form-controls">
                <label className="mb-1">
                  <span className="form-controls-label">
                    User Name<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="text"
                  value={userName}
                  placeholder="User Name"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="form-controls">
                <label className="mb-1">
                  <span className="form-controls-label">
                    Email<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input "
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-4 py-3">
            <button
              type="submit"
              className="mx-auto create-button justify-content-center"
            >
              Créer
            </button>
          </div>
        </Form>
      </div>
      {successMessage && (
        <div className="profile-success-message">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="profile-error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default Collaborator;

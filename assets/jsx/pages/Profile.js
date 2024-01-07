import React, { useState, useEffect, useCallback, memo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import profile from "../../images/temp-user.jpeg";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  UpdateAccountNotFailed,
  getAccountInformationAction,
  updateAccountInformationAction,
} from "../../store/actions/AccountActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import {
  getAccountInfo,
  getAccountInfoSuccess,
  getLoadingAccountInfo,
  getAccountInfoFailed,
} from "../../store/selectors/AccountSelectors";
import IconMoon from "../components/Icon/IconMoon";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useUploadImage1 } from "../../hooks/useUploadImage1";

const Profile = memo(() => {
  var err = useSelector((state) => state.account.err);

  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const accountInfo = useSelector(getAccountInfo);

  const showLoader = useSelector(getLoadingAccountInfo);

  const successMessage = useSelector(getAccountInfoSuccess);

  const errorMessage = useSelector(getAccountInfoFailed);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const { image1, setImg1, handleUpload1 } = useUploadImage1();

  const handleEditClick1 = () => {
    document.getElementById("fileInput1").click();
  };

  // get personal info
  useEffect(() => {
    dispatch(getAccountInformationAction());
    setFirstName(accountInfo.firstname);
    setLastName(accountInfo.lastename);

    setEmail(accountInfo.email);

    setImg1(accountInfo.photoProfil);
  }, [
    dispatch,
    accountInfo.firstname,
    accountInfo.lastename,
    accountInfo.email,
    accountInfo.photoProfil,
  ]);

  // update personal info in database & local storage
  const handleUploadCallback1 = (uploadedImage) => {
    // Set the image in the state and mark it as uploaded
    setImg1(uploadedImage);
  };
  const handleUpdate = useCallback(
    async (event) => {
      event.preventDefault();
      localStorage.setItem(
        "personalInfo",
        JSON.stringify({
          firstname: firstName,
          lastename: lastName,
          email,
          photoProfil: image1,
        })
      );
      dispatch(
        updateAccountInformationAction({
          firstname: firstName,
          lastename: lastName,
          email,
          lastpassword: oldPassword,
          newpassword: newPassword,
          photoProfil: image1,
        })
      );
      setShowModal(false);
      redirect("/");
      handleShowMessage();
    }
    // [dispatch, email, firstName, lastName, oldPassword, newPassword, image]
  );

  useEffect(() => {
    let timeout;

    if (showMessage) {
      timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showMessage]);

  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    redirect("/");
  };
  useEffect(() => {
    dispatch(UpdateAccountNotFailed());
  }, []);
  return (
    <div>
      <div className="account-box">
        <span className="account-box-title">Mon Compte</span>
      </div>
      <div className="form-container">
        <Form className="profile-form-container">
          <div className="d-flex justify-content-center">
            <div className="position-relative profile-image-container">
              <Form.Control
                type="file"
                id="fileInput1"
                className="d-none"
                onChange={(e) => handleUpload1(e, handleUploadCallback1)}
              />
              <div onClick={handleEditClick1}>
                <IconMoon
                  className="edit-icon"
                  color="#504C87"
                  name="edit-input"
                  size={24}
                />
              </div>

              <div>
                {!image1 ? (
                  <div>
                    <img
                      className="profile-image"
                      alt="profile"
                      src={profile}
                    />
                  </div>
                ) : (
                  <img className="profile-image" alt="profile" src={image1} />
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
            <div className="form-inputs mt-3 ">
              <div className="form-controls">
                <label className="mb-1">
                  <span className="form-controls-label">
                    Email<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-inputs mt-3 ">
              <div className="form-controls">
                <label htmlFor="inputField" className="mb-1">
                  <span className="form-controls-label">
                    Ancien Mot de passe<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="password"
                  placeholder="Ancien Mot de passe"
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form-controls">
                <label htmlFor="inputField" className="mb-1">
                  <span className="form-controls-label">
                    Nouveau Mot de passe<span className="required">*</span>
                  </span>
                </label>
                <Form.Control
                  className="form-controls-input"
                  type="password"
                  placeholder="Nouveau Mot de passe"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {err && <small className="text-red-500">{err}</small>}
              </div>
            </div>
          </div>
          <div className="text-center m-20">
            <Button
              type="submit"
              className="bg-light-purple text-white font-bold py-2 px-4 rounded-lg focus:outline-none w-32 self-center"
              onClick={(e) => handleShow(e)}
              disabled={showLoader}
              style={{ fontSize: "medium" }}
            >
              Valider
            </Button>
            <Button
              className="rounded-lg py-2 px-4 ml-2 text-white font-bold w-32 self-center bg-gray-200"
              style={{ fontSize: "medium" }}
            >
              <Link to="/">Fermer</Link>
            </Button>
          </div>
          {showLoader ? (
            <div className="loader">
              <Spinner
                animation="border"
                role="status"
                size="md"
                currentcolor="#E73248"
              />
            </div>
          ) : null}
          <div>
            <Modal show={showModal} onHide={(e) => handleClose(e)}>
              <Modal.Header closeButton />
              <Modal.Body>
                Est-ce-que vous êtes sûr de vouloir modifier vos données ?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="rounded-lg py-2 px-4 ml-2 text-white font-bold w-32 self-center bg-gray-300"
                  onClick={(e) => handleClose(e)}
                >
                  Annuler
                </Button>

                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded-lg focus:outline-none w-32 self-center"
                >
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      </div>
    </div>
  );
});

export default Profile;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPartnerAction } from "../../store/actions/PartnerAction";
import { Form } from "react-bootstrap";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useHistory } from "react-router-dom";
import IconMoon from "../components/Icon/IconMoon";
import Box from "../components/Box/Box";
import { ArrowReturnLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Partner = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { image, handleUpload } = useUploadImage();
  const { image: cover, handleUpload: handleUploadCover } = useUploadImage();

  const [name, setName] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [service, setService] = useState("");

  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    return /^(06|07)\d{8}$/.test(phoneNumber);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!name) {
      errors.name = "Nom est obligatoire";
    }

    if (!description) {
      // Check if description is empty
      errors.description = "La description est obligatoire";
    }

    if (!activity) {
      // Check if activity is empty
      errors.activity = "L'activité est obligatoire";
    }
    if (email && !validateEmail(email)) {
      errors.email = "L'adresse e-mail n'est pas valide";
    }

    // Validate phone number
    if (telephone && !validatePhoneNumber(telephone)) {
      errors.telephone = "Le numéro de téléphone n'est pas valide";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(
          createPartnerAction({
            NomSociete: name,
            siteWeb: siteWeb,
            telephone: telephone,
            email: email,
            adresse: adresse,
            service: service,
            description: description,
            secteurActivite: activity,
            logo: image,
            photoCouvert: cover,
          })
        );
        setSuccessMessage("Partner created successfully!");
        history.push("partners");
      } catch (error) {
        setErrorMessage("Failed to create partner.");
      }
    }
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    activity: "",
    description: "",
  });

  const errorStyle = {
    color: "red",
    fontSize: "14px",
  };
  const handleGoBack = () => {
    history.push("/partners");
  };

  return (
    <div>
      <Box title={"Partenaires"} />

      <div
        className="bmc-container"
        style={{
          overflowY: "auto", // Add vertical scrolling when content exceeds height
          /* Add other styles here if needed */
        }}
      >
        {" "}
        <div className="project-form-container">
          <Form
            className="p-form-container"
            onSubmit={handleSubmit}
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              border: "1px solid ##e73248",
            }}
          >
            <div className="row mb-2  ">
              <div className="col-md-4 py-4">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Logo</span>
                  </label>
                </div>
                <label htmlFor="logoImage">
                  {image ? (
                    <img
                      src={image}
                      alt="logo Image"
                      width="189"
                      height="115"
                      className="img-thumbnail justify-content-start"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <div className="div-thumbnail justify-content-start">
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
                    id="logoImage"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </label>
              </div>

              <div className="col-md-4 py-4">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">
                      Photo de couverture
                    </span>
                  </label>
                </div>
                <label htmlFor="coverImage">
                  {cover ? (
                    <img
                      src={cover}
                      alt="cover Image"
                      width="189"
                      height="115"
                      className="img-thumbnail1"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <div className="img-thumbnail1">
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
                    id="coverImage"
                    style={{ display: "none" }}
                    onChange={handleUploadCover}
                  />
                </label>
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">
                      Nom de société<span className="required">*</span>
                    </span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className={`form-controls-input ${
                    formErrors.name ? (
                      <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                        is-invalid{" "}
                      </div>
                    ) : (
                      ""
                    )
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <div className="text-red-500 text-left">
                    {formErrors.name}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label"> Site web</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className={`form-controls-input ${
                    formErrors.siteWeb ? (
                      <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                        is-invalid{" "}
                      </div>
                    ) : (
                      ""
                    )
                  }`}
                  value={siteWeb}
                  onChange={(e) => setSiteWeb(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className=" col-md-6 ">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Email</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className={`form-controls-input ${
                    formErrors.email ? (
                      <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                        is-invalid{" "}
                      </div>
                    ) : (
                      ""
                    )
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <div className="text-red-500 text-left">
                    {formErrors.email}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">
                      {" "}
                      Numéro de téléphone
                    </span>
                  </label>
                </div>
                <Form.Control
                  type="number"
                  id="input1"
                  className={`form-controls-input ${
                    formErrors.telephone ? "is-invalid" : ""
                  }`}
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
                {formErrors.telephone && (
                  <div className="text-red-500 text-left">
                    {formErrors.telephone}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-controls-project">
                    <label className="mb-1">
                      <span className="form-controls-label"> Adresse</span>
                    </label>
                  </div>
                  <Form.Control
                    type="text"
                    id="input1"
                    className={`form-controls-input ${
                      formErrors.adresse ? (
                        <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                          is-invalid{" "}
                        </div>
                      ) : (
                        ""
                      )
                    }`}
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                  />
                </div>
              </div>
              <div className=" col-md-6 ">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label"> Service</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className={`form-controls-input ${
                    formErrors.service ? (
                      <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                        is-invalid{" "}
                      </div>
                    ) : (
                      ""
                    )
                  }`}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-3 ">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-controls-project">
                    <label className="mb-1">
                      <span className="form-controls-label">
                        Secteur d'activité<span className="required">*</span>
                      </span>
                    </label>
                  </div>

                  <textarea
                    style={{
                      width: "790px",
                      height: "150px",
                      borderRadius: "12px",
                      border: "2px solid rgba(0, 0, 0, 0.6)",
                      marginLeft: "-2px",
                    }}
                    id="input1"
                    className={`textarea-input ${
                      formErrors.activity ? (
                        <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                          is-invalid{" "}
                        </div>
                      ) : (
                        ""
                      )
                    }`}
                    maxLength={254}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />

                  {formErrors.activity && (
                    <div className="text-red-500 text-left">
                      {formErrors.activity}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-controls-project">
              <label className="mb-1" style={{ fontSize: "18px" }}>
                <label className="mb-1">
                  <span className="form-controls-label">
                    Description <span className="required">*</span>
                  </span>
                </label>
              </label>
            </div>
            <textarea
              style={{
                width: "790px",
                height: "150px",
                borderRadius: "12px",
                border: "2px solid rgba(0, 0, 0, 0.6)",
                marginLeft: "-3px",
              }}
              id="input1"
              className={`textarea-input ${
                formErrors.description ? (
                  <div style={{ border: "2px solid rgba(0, 0, 0, 0.6)" }}>
                    is-invalid{" "}
                  </div>
                ) : (
                  ""
                )
              }`}
              maxLength={254}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {formErrors.description && (
              <div className="text-red-500 text-left">
                {formErrors.description}
              </div>
            )}
            <div className="text-center mb-2 py-5">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="back"
                  className="mx-auto create-button"
                  style={{ marginRight: "auto" }}
                  onClick={handleGoBack}
                >
                  <ArrowReturnLeft size={23} /> &nbsp; Retour
                </button>
                <button
                  type="submit"
                  className="mx-auto create-button"
                  style={{ marginLeft: "auto" }}
                >
                  Valider
                </button>
              </div>
            </div>
          </Form>
        </div>
        {successMessage && (
          <div className="profile-success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div
            className="profile-error-message "
            style={{ marginLeft: "100px" }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
export default Partner;

import React, { useState } from "react";
import Box from "../../Box/Box";

import IconMoon from "../../Icon/IconMoon";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocietyAction,
  getBusinessPlanAllSocietiesAction,
} from "../../../../store/actions/BusinessPlanActions";
import {
  addSocietyLoaderSelector,
  getBPSocietyLoaderSelector,
} from "../../../../store/selectors/BusinessPlanSelectors";
import { useUploadImage } from "../../../../hooks/useUploadImage";
import userImg from "../../../../images/temp-user.jpeg";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { async } from "regenerator-runtime";

const Society = () => {
  const [name, setName] = useState("");

  const [pointFort, setPointFort] = useState("");

  const [pointFaible, setPointFaible] = useState("");

  const [directIndirect, setDirectIndirect] = useState("");

  const [photo, setPhoto] = useState("base");
  const [taille, setTaille] = useState("grande");

  const [effectif, setEffectif] = useState("0 à 5");

  const [ca, setCA] = useState("");

  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({
    name: "",
    taille: "",
    ca: "",
  });
  const [societies, setSocieties] = useState([]);
  const allProjects = localStorage.getItem("allProjects");
  const selectedProject = localStorage.getItem("selectedProjectId");
  const isLoading = useSelector(getBPSocietyLoaderSelector);
  const { image, setImg, handleUpload } = useUploadImage();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isAddingLoading = useSelector(addSocietyLoaderSelector);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let isValid = true;

    if (!name) {
      errors.name = "Le nom de la société est obligatoire";
      isValid = false;
    }
    // if (!taille) {
    //   errors.taille = "La taille de la société est obligatoire";
    //   isValid = false;
    // }

    if (isNaN(ca)) {
      errors.ca = "Le chiffre d'affaires doit être un nombre";
      isValid = false;
    }
    setFormErrors(errors);
    if (isValid) {
      try {
        const society = {
          name: name,
          pointFort: pointFort,
          pointFaible: pointFaible,
          directIndirect: directIndirect,
          logo: image,
          taille: taille,
          effectif: effectif,
          CA: ca,
        };
        setSocieties([...societies, society]);

        await dispatch(addSocietyAction(selectedProject, society));
        await dispatch(getBusinessPlanAllSocietiesAction(selectedProject));

        history.push("/market-competition/societies");
      } catch (errors) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <div className="mx-5 mb-36 flex items-center ">
          <div className="flex-grow">
            <Box
              title={"MARCHÉ & CONCURRENCE"}
              color={"bg-dark-purple"}
              iconNameOne={"grid"}
              iconNameTwo={"go-up"}
              iconColor={"#fff"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-dark-purple  rounded-full">
              <IconMoon color={"#fff"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <div className="project-form-container">
          <Form className="p-form-container " onSubmit={handleSubmit}>
            <div className="row mb-2  ">
              <div className="col-md-6 py-2">
                {/* <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Logo</span>
                  </label>
                </div> */}

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

              <div className="col-md-6 py-4">
                {" "}
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">
                      Nom de société <span className="required">*</span>
                    </span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input1"
                  className="form-controls-input-title "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <small className="text-red-500">{formErrors.name}</small>
                )}
              </div>
            </div>

            <div className="row mt-3 ">
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Points forts</span>
                  </label>
                </div>
                <Form.Control
                  as="textarea"
                  id="pointFort"
                  className="form-controls-input-ff"
                  value={pointFort}
                  onChange={(e) => setPointFort(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Points faibles</span>
                  </label>
                </div>
                <Form.Control
                  as="textarea"
                  id="input3"
                  className="form-controls-input-ff"
                  value={pointFaible}
                  onChange={(e) => setPointFaible(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-3 ">
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">
                      Direct ou indirect
                    </span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input4"
                  className="form-controls-input"
                  value={directIndirect}
                  onChange={(e) => setDirectIndirect(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Taille</span>
                  </label>
                  <div className="contact-name">
                    <select
                      id="editTypeContrat"
                      className="form-select-input-society"
                      value={taille}
                      onChange={(e) => setTaille(e.target.value)}
                    >
                      <option value="grande">grande </option>
                      <option value="moyenne">moyenne</option>
                      <option value="petite">petite </option>
                    </select>
                  </div>{" "}
                </div>

                {formErrors.taille && (
                  <small className="text-red-500">{formErrors.taille}</small>
                )}
              </div>
            </div>

            <div className="row mt-3 ">
              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">Effectif</span>
                  </label>
                  <div className="contact-name">
                    <select
                      id="editTypeContrat"
                      className="form-select-input-society"
                      value={effectif}
                      onChange={(e) => setEffectif(e.target.value)}
                    >
                      <option value="0 à 5">0 à 5 </option>
                      <option value="10 à 20"> 10 à 20</option>
                      <option value="20 à 50">20 à 50 </option>
                      <option value="50 à 100"> 50 à 100 </option>
                      <option value="100 à 200"> 100 à 200 </option>
                      <option value="plus que de 200 ">
                        {" "}
                        plus que de 200{" "}
                      </option>
                    </select>
                  </div>
                </div>
                {formErrors.effectif && (
                  <small className="text-red-500">{formErrors.effectif}</small>
                )}
              </div>

              <div className="col-md-6">
                <div className="form-controls-project">
                  <label className="mb-1">
                    <span className="form-controls-label">CA</span>
                  </label>
                </div>
                <Form.Control
                  type="text"
                  id="input7"
                  className="form-controls-input"
                  value={ca}
                  onChange={(e) => setCA(e.target.value)}
                />
                {formErrors.ca && (
                  <small className="text-red-500">{formErrors.ca}</small>
                )}
              </div>
            </div>

            <div className="text-center mb-4 py-5">
              <button
                type="submit"
                className=" shadow-grey-600 shadow-md bg-dark-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none 	 self-center "
              >
                Valider
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
    </div>
  );
};
export default Society;

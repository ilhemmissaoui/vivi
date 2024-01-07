import React, { useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image
import Spinner from "react-bootstrap/Spinner";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let errorsObj = { email: "", password: "", firstName: "", lastName: "" };
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();

  const showLoading = useSelector((state) => state.auth.showLoading);
  const errorMessage = useSelector((state) => state.auth.registerErrorMessage);
  const successMessage = useSelector(
    (state) => state.auth.registerSuccessMessage
  );

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+}{:?><~`\-=\[\]\\;',.|]{8,}$/;
    const errorObj = { ...errorsObj };

    if (email === "") {
      errorObj.email = "Le champ email est requis";
      error = true;
    } else {
      if (!emailRegex.test(email)) {
        errorObj.email = "Format email est invalide";
        error = true;
      }
    }

    if (firstName === "") {
      errorObj.firstName = "Prénom est requis";
      error = true;
    }
    if (lastName === "") {
      errorObj.lastName = "Nom est requis";
      error = true;
    }

    if (password === "") {
      errorObj.password = "Le mot de pass est obligatoire";
      error = true;
    } else {
      if (!passwordRegex.test(password)) {
        errorObj.password = "Le mot de passe est invalide";
        error = true;
      }
    }

    //swal("Oops", errorObj.password, "error");
    setErrors(errorObj);

    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password, firstName, lastName, props.history));
  }
  return (
    <div className="auth-bg">
      <div className=" authentication flex-column flex-lg-row flex-column-fluid">
        <div className=" authentication-container d-flex flex-column justify-content-center ">
          <div className=" auth-container-2 d-flex justify-content-center  align-items-center">
            <div className="authentication-content style-2">
              <div className="row no-gutters">
                <div className="col-xl-12 tab-content">
                  <div className="auth-form form-validation">
                    <h4 className="text-center auth-title ">Créer un compte</h4>
                    <div className="auth-title-line-container">
                      <hr className="auth-title-line" />
                    </div>

                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 auth-input-title ">
                          <strong>Prénom</strong>{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                        {errors.firstName && (
                          <small className="text-red-700">
                            {errors.firstName}
                          </small>
                        )}
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 auth-input-title ">
                          <strong>Nom</strong>
                          <span className="required">*</span>
                        </label>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                        {errors.lastName && (
                          <small className="text-red-700">
                            {errors.lastName}
                          </small>
                        )}
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 auth-input-title ">
                          <strong>Email</strong>
                          <span className="required">*</span>
                        </label>
                        <input
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                        />
                        {errors.email && (
                          <small className="text-red-700">{errors.email}</small>
                        )}
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 auth-input-title ">
                          <strong>Mot de passe</strong>
                          <span className="required">*</span>
                        </label>
                        <input
                          defaultValue={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          type="password"
                        />
                        {errors.password ? (
                          <small className="text-red-700">
                            {errors.password}
                          </small>
                        ) : (
                          <small className="text-[#ff9c6b]">
                            8 caractères minimum
                          </small>
                        )}
                      </div>
                      <div className="form-row justify-content-between mt-4 mb-2">
                        <div className="form-group mb-3 ">
                          <div className="custom-control custom-checkbox ml-1 checkbox-policy">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="basic_checkbox_1"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="basic_checkbox_1"
                            >
                              J'ai lu et j'accepte les{" "}
                              <span className="form-check-label-1">CGU</span>{" "}
                              ainsi que{" "}
                              <span className="form-check-label-1">
                                la Politique de confidentialité
                              </span>
                              .
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {showLoading ? (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : null}
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary  auth-button"
                          disabled={!isChecked}
                          style={{ fontSize: "medium" }}
                        >
                          Créer un compte
                        </button>
                      </div>
                      {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                      )}
                      {successMessage && (
                        <div className="success-message">{successMessage}</div>
                      )}
                    </form>
                  </div>
                  <div className="new-account mt-3">
                    <p>
                      <Link
                        className="text-primary link-create-account-container"
                        to={"./login"}
                      >
                        <span className="link-create-account">
                          {" "}
                          Vous avez déja un compte ? login.
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

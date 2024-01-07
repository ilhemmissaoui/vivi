import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  RESET_SUCCESS_MESSAGE,
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const showLoading = useSelector((state) => state.auth.showLoading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if (password === "") {
      errorObj.password = "Le mot de pass est obligatoire";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  useEffect(() => {
    // Reset success message when component is mounted
    dispatch({ type: RESET_SUCCESS_MESSAGE });
  }, [dispatch]);

  return (
    <div className="auth-bg">
      <div className="authentication flex-column flex-lg-row flex-column-fluid">
        <div
          className=" login-container d-flex flex-column justify-content-center "
          style={{ width: "40rem" }}
        >
          <div className="auth-container-2 d-flex justify-content-center  align-items-center">
            <div className="authentication-content style-2">
              <div>
                <div>
                  <div className="auth-form form-validation">
                    <form onSubmit={onLogin} className="form-validate">
                      <h3 className="text-center auth-title">Connexion</h3>

                      <div className="auth-title-line-container">
                        <hr className="auth-title-line" />
                      </div>

                      <div className="form-group mb-3 ">
                        <label
                          className="mb-1 auth-input-title"
                          htmlFor="val-email"
                        >
                          <strong>Email</strong>
                          <span className="required">*</span>
                        </label>
                        <div>
                          <input
                            className="form-control login"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {errors.email && (
                          <div className="text-red-700 ">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group mb-3 ">
                        <label className="mb-1 auth-input-title">
                          <strong>Mot de passe</strong>{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control login"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className="text-red-700 fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <Link
                          className="text-primary password-forgotten-container"
                          to="./page-forgot-password"
                        >
                          <strong className="password-forgotten">
                            Mot de passe oublié?
                          </strong>
                        </Link>
                      </div>
                      <div className="text-center form-group mb-4">
                        <Button
                          type="submit"
                          style={{ fontSize: "medium" }}
                          className="auth-button"
                        >
                          Se connecter
                        </Button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center align-items-center">
                      {showLoading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : null}
                    </div>
                    {errorMessage && (
                      <div className="error-message text-center">
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="success-message text-center">
                        {successMessage}
                      </div>
                    )}
                    <hr />
                    <div className="new-account mt-3">
                      <p>
                        <Link
                          className="text-primary link-create-account-container"
                          to={"./registration"}
                        >
                          <span className="link-create-account">
                            {" "}
                            Nouveau sur Vivitool? Créer un compte.
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
    </div>
  );
}
export default Login;

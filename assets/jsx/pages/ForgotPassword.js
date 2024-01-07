import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordAction } from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  let errorsObj = { email: "" };
  const [errors, setErrors] = useState(errorsObj);

  const dispatch = useDispatch();

  function onResetPassword(e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    let error = false;
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

    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(resetPasswordAction(email, props.history));
    toast.success( "Veuillez consulter votre courrier électronique afin de réinitialiser votre mot de passe.")
    history.push("/login");
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="auth-bg">
      <div className=" authentication flex-column flex-lg-row flex-column-fluid">
        <div
          className=" reset-password-container d-flex flex-column justify-content-center "
          style={{ width: "40rem" }}
        >
          <div className=" auth-container-2 d-flex justify-content-center  align-items-center">
            <div className="authentication-content style-2">
              <div>
                <div>
                  <div className="auth-form form-validation">
                    {props.errorMessage && (
                      <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                        {props.successMessage}
                      </div>
                    )}
                    <form onSubmit={onResetPassword} className="form-validate">
                      <h3 className="text-center auth-title">
                        Mot de passe oublié?
                      </h3>
                      <div className="auth-title-line-container">
                        <hr className="auth-title-line" />
                      </div>
                      <div className="form-group mb-3 text-center reset-pass-title-container ">
                        <strong className="reset-pass-title">
                          Réinitialiser mon mot de passe.
                        </strong>
                      </div>

                      <div className="form-group mb-3 mt-4 ">
                        <label
                          className="mb-1 auth-input-title"
                          htmlFor="val-email"
                        >
                          <strong>Adresse email</strong>
                          <span className="required">*</span>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="form-control login"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {errors.email && (
                          <div className="text-red-700 fs-12">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="text-center form-group mb-3">
                        <Button
                          type="submit"
                          className="auth-button"
                          style={{ fontSize: "medium" }}
                        >
                          Envoyer
                        </Button>
                      </div>
                    </form>
                  </div>
                  <hr />
                  <div className="new-account mt-3">
                    <p>
                      <Link
                        className="text-primary link-create-account-container"
                        to={"./login"}
                      >
                        <span className="link-create-account"> Login !</span>
                      </Link>
                    </p>
                    {/*<p>
                      <Link
                        className="text-primary link-create-account-container"
                        to={"./page-reset-password"}
                      >
                        <span className="link-create-account">
                          {" "}
                          Reset password!
                        </span>
                      </Link>
                    </p>
                        */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

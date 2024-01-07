import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordAction } from "../../store/actions/AuthActions";
import { Button } from "react-bootstrap";
import { sendNewPassword } from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  // const [email, setEmail] = useState("");
  let errorsObj = { password: "", confirmPassword: "" };
  const [errors, setErrors] = useState(errorsObj);
  /* const urlSearchParams = new URLSearchParams(currentURL);
  const token = urlSearchParams.get("token");
  console.log("token", token); */

  const currentURL = window.location.href;
  useEffect(() => {
    const tokenStartIndex = currentURL.indexOf("token=");
    if (tokenStartIndex !== -1) {
      const token = currentURL.substring(tokenStartIndex + 6);
      setToken(token);
    }
  }, []);

  const dispatch = useDispatch();

  function onResetPassword(e) {
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    /* if (email === "") {
      errorObj.email = "Le champ email est requis";
      error = true;
    } else {
      if (!emailRegex.test(email)) {
        errorObj.email = "Format email est invalide";
        error = true;
      }
    } */
    if (password === "") {
      errorObj.password = "Le champ mot de passe est requis";
      error = true;
    }

    if (password !== confirmPassword) {
      errorObj.confirmPassword = "Les mots de passe ne correspondent pas";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    const postData = {
      newpassword: password,
      token: token,
    };
    sendNewPassword(postData).then((Response)=>{
      if (Response.data == 'ok'){
        toast.success("votre mot de passe est réinitialisé avec succée ")
        history.push("/login");
      }
      else{
        toast.error("Un problème est survenu, veuillez réessayer ultérieurement.")
      }
      
    });
    //dispatch(resetPasswordAction(email, props.history));
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

                      <div className="form-group mb-3 ">
                        <label className="mb-1 auth-input-title">
                          <strong>Nouveau mot de passe</strong>{" "}
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
                      <div className="form-group mb-3 ">
                        <label className="mb-1 auth-input-title">
                          <strong>Confirmer votre nouveau mot de passe</strong>{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control login"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                          <div className="text-red-700 fs-12">
                            {errors.confirmPassword}
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

export default ResetPassword;

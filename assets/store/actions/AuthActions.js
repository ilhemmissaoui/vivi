import {
  login,
  saveTokenInLocalStorage,
  signUp,
  resetPassword,
} from "../../services/AuthService";
import { getAllProjects } from "../../services/ProjetService";
import { getAllProjectsAction } from "./ProjectAction";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const RESET_SUCCESS_MESSAGE =
  "[login action success message] login action success message";

export const RESET_PASSWORD_CONFIRMED_ACTION =
  "[reset password action] confirmed reset";
const errorMessages = {
  400: "Bad request. Please check your input values and try again.",
  401: "Unauthorized. Please sign in with valid credentials.",
  403: "Forbidden. You do not have permission to perform this action.",
  404: "Resource not found. The requested resource could not be found.",
  409: "Conflict. The email is already taken.",
  500: "Internal server error. Please try again later.",
};

export function signupAction(email, password, firstname, lastename, history) {
  return (dispatch) => {
    signUp(email, password, firstname, lastename)
      .then((response) => {
        saveTokenInLocalStorage(response.data.jwt);
        dispatch(confirmedSignupAction(response.data));
        history.push("/login");
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.status
            ? errorMessages[error.response.status] ||
              "An unknown error occurred. Please try again later."
            : "succès d'inscription .";
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.clear();
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(username, password, history) {
  return (dispatch) => {
    login(username, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("personalInfo", JSON.stringify(response.data));
        dispatch(loginConfirmedAction(response.data));
        history.push("/dashboard");
        dispatch(getAllProjectsAction());
      })
      .catch((error) => {
        let errorMessage;
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            errorMessage =
              "Invalid input. Please check your details and try again.";
          } else if (status === 409) {
            errorMessage =
              "A user with that email address already exists. Please try logging in or use a different email address.";
          } else {
            errorMessage = "An error occurred. Please try again later.";
          }
        } else if (error.request) {
          errorMessage = "No response from server. Please try again later.";
        } else {
          errorMessage = "Something went wrong. Please try again later.";
        }
        dispatch(loginFailedAction(errorMessage));
      });
  };
}
export function resetPasswordAction(email, history) {
  return (dispatch) => {
    resetPassword(email)
      .then((response) => {
        dispatch(resetPasswordConfirmationAction(response.data));
        history.push("/login");
      })
      .catch((error) => {
        const errorMessage =
          errorMessages[error.response.status] ||
          "An unknown error occurred. Please try again later.";
      });
  };
}

export function resetPasswordConfirmationAction(payload) {
  return {
    type: RESET_PASSWORD_CONFIRMED_ACTION,
    payload,
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

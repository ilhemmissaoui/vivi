import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";
import BASE_URL from "../../src/apiConfig";
import { getAllProjectsAction } from "../store/actions/ProjectAction";

export function signUp(email, password, firstname, lastename) {
  //axios call
  const postData = {
    email,
    password,
    firstname,
    lastename,
    returnSecureToken: true,
  };
  return axios.post(`${BASE_URL}/api/registration`, postData);
}

export async function login(username, password) {
  const postData = {
    username,
    password,
    returnSecureToken: true,
  };

  return await axios.post(`${BASE_URL}/api/login`, postData, {
    headers: {
      "X-AUTH-TOKEN": localStorage.getItem("userDetails"),
      "Content-Type": "application/json",
    },
  });
}

export function resetPassword(email) {
  const postData = {
    email,
  };
  return axios.post(
    `${BASE_URL}/api/user/forgot-password/send-email`,
    postData
  );
}

///api/user/forgot-password/change/{token}
export function sendNewPassword(postData) {
  return axios.post(`${BASE_URL}/api/user/forgot-password/change`, postData);
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "An internal error occured";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  } else {
    dispatch(getAllProjectsAction());
  }

  dispatch(loginConfirmedAction(tokenDetailsString));
}

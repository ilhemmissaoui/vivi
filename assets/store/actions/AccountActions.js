import {
  getAccountInformation,
  updateAccountInformation,
} from "../../services/AccountService";
export const GET_ACCOUNT_INFORMATION =
  "[get account info action] get account information";

export const UPDATE_ACCOUNT_INFORMATION =
  "[updat account info action] update account information";

export const ACCOUNT_INFORMATION_CONFIRMED =
  "[get account info action] get account information confirmed";

export const UPDATE_ACCOUNT_INFORMATION_CONFIRMED =
  "[get account info action] get account information confirmed";

export const UPDATE_ACCOUNT_INFORMATION_FAILED =
  "[upate account info action failed] update account information failed";
export const UPDATE_ACCOUNT_NOT_FAILED = "[]";
export const UPDATE_ACCOUNT_INFORMATION_SUCCESS =
  "[upate account info action success] update account information success";

export const ACCOUNT_LOADING_TOGGLE_ACTION = "load spinner ";
export function getAccountInformationAction() {
  return (dispatch, getState) => {
    getAccountInformation()
      .then((response) => {
        dispatch(confirmedGetAccount(response.data));
      })
      .catch((error) => {
        const errorMessage =
          "An unknown error occurred. Please try again later.";

        return errorMessage;
      });
  };
}

export function confirmedGetAccount(profile) {
  return {
    type: ACCOUNT_INFORMATION_CONFIRMED,
    payload: profile,
  };
}

export function updateAccountInformationAction(data) {
  return (dispatch, getState) => {
    dispatch(accountloadingToggleAction(true));
    updateAccountInformation(data)
      .then((response) => {
        dispatch(confirmedUpdateAccountInfo(response));
        dispatch(
          UpdateAccountInfoSuccess("Informations mises à jour avec succès.")
        );
        dispatch(accountloadingToggleAction(false));
      })
      .catch((error) => {
        const errorMessage = "invalide mot de passe.";
        dispatch(UpdateAccountInfoFailed(errorMessage));
        dispatch(accountloadingToggleAction(false));
        return errorMessage;
      });
  };
}

export function confirmedUpdateAccountInfo(profile) {
  return {
    type: UPDATE_ACCOUNT_INFORMATION_CONFIRMED,
    payload: profile,
  };
}

export function UpdateAccountInfoSuccess(data) {
  return {
    type: UPDATE_ACCOUNT_INFORMATION_SUCCESS,
    payload: data,
  };
}

export function UpdateAccountInfoFailed(data) {
  return {
    type: UPDATE_ACCOUNT_INFORMATION_FAILED,
    payload: data,
  };
}

export function UpdateAccountNotFailed(data) {
  return {
    type: UPDATE_ACCOUNT_NOT_FAILED,
    payload: data,
  };
}

export function accountloadingToggleAction(status) {
  return {
    type: ACCOUNT_LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

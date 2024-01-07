import {
  GET_ACCOUNT_INFORMATION,
  ACCOUNT_INFORMATION_CONFIRMED,
  UPDATE_ACCOUNT_INFORMATION,
  UPDATE_ACCOUNT_INFORMATION_CONFIRMED,
  ACCOUNT_LOADING_TOGGLE_ACTION,
  UPDATE_ACCOUNT_INFORMATION_FAILED,
  UPDATE_ACCOUNT_INFORMATION_SUCCESS,
  UPDATE_ACCOUNT_NOT_FAILED,
} from "../actions/AccountActions";

const initialState = {
  profileInfo: {
    email: "",
    firstname: "",
    lastename: "",
    photoProfil: "",
    err: "",
  },
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  err: "",
};
export default function AccountReducer(state = initialState, actions) {
  if (actions.type === GET_ACCOUNT_INFORMATION) {
    return {
      ...state,
      profileInfo: actions.payload,
      err: "",
    };
  }
  if (actions.type === ACCOUNT_INFORMATION_CONFIRMED) {
    return {
      ...state,
      profileInfo: actions.payload,
      err: "",
    };
  }

  if (actions.type === UPDATE_ACCOUNT_INFORMATION) {
    const profile = actions.payload;

    return {
      ...state,

      profileInfo: profile,
      successMessage: null,
      errorMessage: null,
      err: "",
    };
  }
  if (actions.type === UPDATE_ACCOUNT_INFORMATION_CONFIRMED) {
    const profile = actions.payload;

    return {
      ...state,
      profileInfo: profile,
      successMessage: null,
      errorMessage: null,
      err: "",
    };
  }
  if (actions.type === UPDATE_ACCOUNT_INFORMATION_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
      successMessage: "Informations mises à jour avec succès.",
      err: "",
    };
  }

  if (actions.type === UPDATE_ACCOUNT_INFORMATION_FAILED) {
    return {
      ...state,
      errorMessage: "Une erreur s'est produite, veuillez réessayer plus tard.",
      successMessage: null,
      err: actions.payload,
    };
  }
  if (actions.type === UPDATE_ACCOUNT_NOT_FAILED) {
    return {
      ...state,
      err: "",
    };
  }
  if (actions.type === ACCOUNT_LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      isLoading: actions.payload,
    };
  }

  return state;
}

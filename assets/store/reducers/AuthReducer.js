import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  RESET_SUCCESS_MESSAGE,
} from "../actions/AuthActions";

const initialState = {
  auth: {
    email: "",
    idToken: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
    firstname: "",
    lastename: "",
    photoProfil: "",
  },
  errorMessage: "",
  registerErrorMessage: "",
  registerSuccessMessage: "",
  successMessage: "",
  showLoading: false,
};

export function AuthReducer(state = initialState, action) {
  if (action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      registerErrorMessage: "",
      registerSuccessMessage: "",
      showLoading: false,
      errorMessage: "",
    };
  }
  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "",
      successMessage: "Connexion effectuée avec succès",
      registerErrorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    return {
      ...state,
      errorMessage: "",
      errorMessage: "",
      registerErrorMessage: "",
      successMessage: "",
      auth: {
        email: "",
        idToken: "",
        localId: "",
        expiresIn: "",
        refreshToken: "",
      },
    };
  }

  if (action.type === SIGNUP_FAILED_ACTION) {
    return {
      ...state,
      registerErrorMessage: "Email déjà existant",
      registerSuccessMessage: "",
      showLoading: false,
      errorMessage: "",
    };
  }

  if (action.type === LOGIN_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: "Email ou mot de passe incorrect",
      successMessage: "",
      registerErrorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
      registerErrorMessage: "",
      errorMessage: "",
    };
  }
  if (action.type === RESET_SUCCESS_MESSAGE) {
    return {
      ...state,
      successMessage: "",
      registerErrorMessage: "",
      errorMessage: "",
    };
  }
  return state;
}

import { CONFIRMED_ADD_COLLAB_ACTION } from "../actions/BusinessPlanActions";
import {
  CREATE_PROJECT_ACTION,
  GET_ALL_USERS,
  CONFIRMED_CREATE_PROJECT_ACTION,
  GET_ALL_PROJECTS_BY_USER_CONFIRMED,
  GET_PROJECTS_LOADING_TOGGLE_ACTION,
  SELECT_PROJECT,
  GET_PROJECT_BY_ID,
} from "../actions/ProjectAction";

const initialState = {
  project: {
    name: "",
    couleurPrincipal: "",
    couleurSecondaire: "",
    couleurMenu: "",
    slogan: "",
    adressSiegeSocial: "",
    siret: "",
    err: "",
    idProjet: "",
    codePostal: "",
    collaborateur: {},
    PagePermissin: {},
    logo: "",
    BusinessModelAvancement: 0,
    avancementBusinessPlan: 0,
    dateCreation: "",
  },
  allProjects: [],
  showLoading: false,
  selectedProject: {
    name: "",
    couleurPrincipal: "",
    couleurSecondaire: "",
    couleurMenu: "",
    slogan: "",
    adressSiegeSocial: "",
    siret: "",
    codePostal: "",
    collaborateur: {},
    PagePermissin: {},
    logo: "",
    BusinessModelAvancement: 0,
    avancementBusinessPlan: 0,
    dateCreation: "",
  },
  projectById: null,
  isloading: false,
  ended: "",
};

export default function ProjectReducer(state = initialState, actions) {
  switch (actions.type) {
    case CREATE_PROJECT_ACTION:
      return {
        ...state,
        project: actions.payload,
        err: "",
      };
    case "CREATE_PROJECT_ERROR":
      return {
        ...state,
        err: actions.payload,
      };
    case "CREATE_PROJECT_SUCCESS":
      return {
        ...state,
        idProjet: actions.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        project: actions.payload,
      };
    case GET_ALL_PROJECTS_BY_USER_CONFIRMED:
      return {
        ...state,
        allProjects: actions.payload,
        showLoading: false,
      };
    case CONFIRMED_CREATE_PROJECT_ACTION:
      return {
        ...state,
        project: actions.payload,
        err: "",
      };

    case CONFIRMED_ADD_COLLAB_ACTION:
      return {
        ...state,
        allProjects: actions.payload,
      };

    case GET_PROJECTS_LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: actions.payload,
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: actions.payload,
      };
    case GET_PROJECT_BY_ID:
      return {
        ...state,
        projectById: actions.payload,
        err: "",
      };
    case "IS_LOADING":
      return {
        ...state,
        isloading: actions.payload,
      };
    case "IS_ENDED":
      return {
        ...state,
        ended: actions.payload,
      };
    case "CLEAR":
      return {
        ...state,
        project: {
          name: "",
          couleurPrincipal: "",
          couleurSecondaire: "",
          couleurMenu: "",
          slogan: "",
          adressSiegeSocial: "",
          siret: "",
          err: "",
          idProjet: "",
          codePostal: "",
          collaborateur: {},
          PagePermissin: {},
          logo: "",
          BusinessModelAvancement: 0,
          avancementBusinessPlan: 0,
          dateCreation: "",
        },
        allProjects: [],
        showLoading: false,
        selectedProject: {
          name: "",
          couleurPrincipal: "",
          couleurSecondaire: "",
          couleurMenu: "",
          slogan: "",
          adressSiegeSocial: "",
          siret: "",
          codePostal: "",
          collaborateur: {},
          PagePermissin: {},
          logo: "",
          BusinessModelAvancement: 0,
          avancementBusinessPlan: 0,
          dateCreation: "",
        },
        projectById: null,
        isloading: false,
        ended: "",
      };
    default:
      return state;
  }
}

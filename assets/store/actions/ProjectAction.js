import {
  createProjet,
  getAllProjects,
  getAllUsers,
  getAllUsersNotCollab,
  getProjectById,
  saveInLocalStorage,
  updateLogo,
} from "../../services/ProjetService";

import { useHistory } from "react-router-dom";

export const GET_ALL_USERS = "[get users action] get users";
export const CREATE_PROJECT_ACTION =
  "[create project action] create new project";

export const CONFIRMED_CREATE_PROJECT_ACTION =
  "[create project action] create new project";

export const GET_ALL_PROJECTS_BY_USERS =
  "[get all projects action] get all projects";

export const GET_ALL_PROJECTS_BY_USER_CONFIRMED =
  "[get all projects action confirmed] get all projects";

export const GET_PROJECTS_LOADING_TOGGLE_ACTION =
  "[get all projects loading action] get all projects loading";

export const GET_SELECTED_PROJECT =
  "[get selected project] get selected project";

export const SELECT_PROJECT = "[select  project] select project";

export const GET_PROJECT_BY_ID =
  "[get get project by id  action] get project by id information";

export const GET_PROJECT_BY_ID_CONFIRMED =
  "[ get project by id confirmed action] get project by id confirmed";

export function createProjectAction(postData) {
  return (dispatch, getState) => {
    createProjet(postData)
      .then((response) => {
        //console.log("projet id", response.data.projet.id);
        dispatch(confirmedCreateProjectAction(response));

        dispatch({
          type: "CREATE_PROJECT_SUCCESS",
          payload: response,
        });
        dispatch(getProjectByIdAction(response.data.projet.id));
        dispatch(getAllProjectsAction());
      })
      .catch((error) => {
        if (error.response.data === "siret déjà utilise") {
          dispatch({
            type: "CREATE_PROJECT_ERROR",
            payload: "siret déjà utilise",
          });
        } else {
          dispatch({
            type: "CREATE_PROJECT_ERROR",
            payload: error.response.data,
          });
        }
      });
  };
}

export function getUsersNotCollabAction(projectId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getAllUsersNotCollab(projectId)
        .then((response) => {
          dispatch(confirmedCreateProjectAction(response.data));

          resolve(response.data); // Resolve with the response data
        })
        .catch((error) => {
          const errorMessage =
            "An unknown error occurred. Please try again later.";
          reject(errorMessage); // Reject with the error message
        });
    });
  };
}
export function getUsersAction() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getAllUsers()
        .then((response) => {
          dispatch(confirmedCreateProjectAction(response.data));

          resolve(response.data); // Resolve with the response data
        })
        .catch((error) => {
          const errorMessage =
            "An unknown error occurred. Please try again later.";
          reject(errorMessage); // Reject with the error message
        });
    });
  };
}
export function confirmedCreateProjectAction(project) {
  return {
    type: CONFIRMED_CREATE_PROJECT_ACTION,
    payload: project,
  };
}

export function getAllProjectsAction() {
  const id = localStorage.getItem("selectedProjectId");
  return (dispatch, getState) => {
    dispatch(getAllProjectsloadingAction(true));
    getAllProjects()
      .then((response) => {
        dispatch(confirmedGetProjectsAction(response.data));
        if (id) dispatch(getProjectByIdAction(id));
        if (response.data.length === 1)
          dispatch(selectProjectAction(response.data[0]));
        saveInLocalStorage("allProjects", response.data);
      })
      .catch((error) => {
        const errorMessage =
          "An unknown error occurred. Please try again later.";
      });
  };
}

export function confirmedGetProjectsAction(projects) {
  return {
    type: GET_ALL_PROJECTS_BY_USER_CONFIRMED,
    payload: projects,
  };
}
export function getAllProjectsloadingAction(status) {
  return {
    type: GET_PROJECTS_LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function selectProjectAction(data) {
  if (data.id) {
    data.id && localStorage.setItem("selectedProjectId", data.id);
    return {
      type: SELECT_PROJECT,
      payload: data,
    };
  }
  return;
}

export function getProjectByIdAction(id) {
  return (dispatch, getState) => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    getProjectById(id)
      .then((response) => {
        dispatch(selectProjectAction(response.data));
        dispatch({
          type: "IS_ENDED",
          payload: response.data.id,
        });
        dispatch({
          type: "IS_LOADING",
          payload: false,
        });
      })
      .catch((error) => {
        const errorMessage =
          "An unknown error occurred. Please try again later.";
      });
  };
}
export function confirmedGetProjectByIdAction(project) {
  return {
    type: GET_ALL_PROJECTS_BY_USER_CONFIRMED,
    payload: project,
  };
}

export function updateLogoAction(selectedProject, logo) {
  return (dispatch, getState) => {
    updateLogo(selectedProject, logo)
      .then((response) => {
        dispatch(getAllProjectsAction());
      })
      .catch((error) => {
        const errorMessage = "you could not upload the logo";

        return errorMessage;
      });
  };
}

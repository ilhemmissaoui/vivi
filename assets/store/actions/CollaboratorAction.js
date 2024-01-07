import { createCollaborator } from "../../services/CollaboratorService";

export const CREATE_COLLABORATOR_ACTION =
  "[create collaborator action] create new collaborator";

export const CONFIRMED_CREATE_COLLABORATOR_ACTION =
  "[create collaborator action] create new collaborator";

export function createCollaboratorAction(postData) {
  return (dispatch, getState) => {
    createCollaborator(postData)
      .then((response) => {
        dispatch(confirmedcollaboratorAction(response));
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "CREATE_collaborator_ERROR", payload: error.message });
      });
  };
}

export function confirmedCreatecollaboratorAction(collaborator) {
  return {
    type: CONFIRMED_CREATE_COLLABORATOR_ACTION,
    payload: collaborator,
  };
}

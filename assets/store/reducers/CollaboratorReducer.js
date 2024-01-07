import {
  CONFIRMED_CREATE_COLLABORATOR_ACTION,
  CREATE_COLLABORATOR_ACTION,
} from "../actions/CollaboratorAction";

const initialState = {
  collaborator: {
    nom: "",
    prenom: "",
    username: "",
    email: "",
    logo: "",
  },
};

export default function CollaboratorReducer(state = initialState, actions) {
  switch (actions.type) {
    case CREATE_COLLABORATOR_ACTION:
      return {
        ...state,
        collaborator: actions.payload,
      };

    case CONFIRMED_CREATE_COLLABORATOR_ACTION:
      return {
        ...state,
        collaborator: actions.payload,
      };
    default:
      return state;
  }
}

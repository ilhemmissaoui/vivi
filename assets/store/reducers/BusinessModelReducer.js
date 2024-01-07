import {
  UPDATE_BMC_INFORMATION,
  GET_BMC_INFORMATION,
  BMC_INFORMATION_LOADING,
} from "../actions/BusinessModelActions";

const initialState = {
  param: "",
  bmcInfo: {
    busnessModelinfo: {},
    avancement: 0,
  },
  isLoading: false,
  updateMessage: "",
};

export default function BusinessModelReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BMC_INFORMATION:
      return {
        ...state,
        param: action.payload,
        updateMessage: "Champ mis à jour!",
      };
    case GET_BMC_INFORMATION:
      return {
        ...state,
        bmcInfo: action.payload,
        isLoading: false,
        updateMessage: "",
      };
    case BMC_INFORMATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

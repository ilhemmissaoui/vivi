import {
  CREATE_PARTNER_ACTION,
  CONFIRMED_CREATE_PARTNER_ACTION,
  // GET_ALL_PARTNERS,
  CONFIRMED_GET_PARTNER,
  CONFIRMED_GET_ALL_PARTNERS,
} from "../actions/PartnerAction";

const initialState = {
  partner: {
    NomSociete: "",
    siteWeb: "",
    telephone: "",
    email: "",
    adresse: "",
    service: "",
    description: "",
    secteurActivite: "",
    logo: "",
    photoCouvert: "",
  },
};

export default function PartnerReducer(state = initialState, actions) {
  switch (actions.type) {
    case CREATE_PARTNER_ACTION:
      return {
        ...state,
        partner: actions.payload,
      };

    case CONFIRMED_CREATE_PARTNER_ACTION:
      return {
        ...state,
        partner: actions.payload,
      };
    case CONFIRMED_GET_ALL_PARTNERS:
      return {
        ...state,
        allPartners: actions.payload,
      };

    case CONFIRMED_GET_PARTNER:
      return {
        ...state,
        partner: actions.payload,
      };

    default:
      return state;
  }
}

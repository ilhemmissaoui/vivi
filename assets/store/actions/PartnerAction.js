import {
  createPartner,
  getAllPartners,
  getPartner,
} from "../../services/PartnerService";
// export const GET_ALL_PARTNERS = "[get partners action] get partners";
export const CONFIRMED_GET_ALL_PARTNERS = "[get partners action] get partners";

export const CONFIRMED_GET_PARTNER = "[get partners action] get partner";

export const CREATE_PARTNER_ACTION =
  "[create partner action] create new partner";

export const CONFIRMED_CREATE_PARTNER_ACTION =
  "[create partner action] create new partner";

export function createPartnerAction(postData) {
  return (dispatch, getState) => {
    createPartner(postData)
      .then((response) => {
        dispatch(confirmedCreatepartnerAction(response));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_partner_ERROR", payload: error.message });
      });
  };
}

export function confirmedCreatepartnerAction(partner) {
  return {
    type: CONFIRMED_CREATE_PARTNER_ACTION,
    payload: partner,
  };
}
export function confirmedGetpartnersAction(partners) {
  return {
    type: CONFIRMED_GET_ALL_PARTNERS,
    payload: partners,
  };
}
export function confirmedGetpartnerAction(partner) {
  return {
    type: CONFIRMED_GET_PARTNER,
    payload: partner,
  };
}
export function getPartnersAction() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getAllPartners()
        .then((response) => {
          dispatch(confirmedGetpartnersAction(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage =
            "An unknown error occurred. Please try again later.";
          reject(errorMessage);
        });
    });
  };
}
export function getPartnerAction(id) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getPartner(id)
        .then((response) => {
          dispatch(confirmedGetpartnerAction(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage =
            "An unknown error occurred. Please try again later.";
          reject(errorMessage);
        });
    });
  };
}

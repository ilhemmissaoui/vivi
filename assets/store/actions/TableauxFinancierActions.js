import {
  editBilanPerYear,
  editDataPerYear,
  editPLanFinancier,
  getBilanPerYear,
  getCompteResultat,
  getDataPerYear,
  getPLanFinancier,
  getPdfBusinessCanvas,
  getTresAnnees,
} from "../../services/TableauxFinancierService";

export function fetchTresAnnees(id_proj) {
  const FETCH_TRES_ANNEES_SUCCESS = "FETCH_TRES_ANNEES_SUCCESS";
  const FETCH_TRES_ANNEES_FAILURE = "FETCH_TRES_ANNEES_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getTresAnnees(id_proj);
      dispatch({ type: FETCH_TRES_ANNEES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TRES_ANNEES_FAILURE, payload: error });
    }
  };
}

export function fetchDataPerYear(id_proj, id_Annee) {
  const FETCH_DATA_PER_YEAR_SUCCESS = "FETCH_DATA_PER_YEAR_SUCCESS";
  const FETCH_DATA_PER_YEAR_FAILURE = "FETCH_DATA_PER_YEAR_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getDataPerYear(id_proj, id_Annee);
      dispatch({ type: FETCH_DATA_PER_YEAR_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_PER_YEAR_FAILURE, payload: error });
    }
  };
}
export function editedDataPerYear(id_proj, id_Annee, data) {
  const EDIT_TRES_DATA_PER_YEAR_SUCCESS = "EDIT_TRES_DATA_PER_YEAR_SUCCESS";
  const EDIT_TRES_DATA_PER_YEAR_FAILURE = "EDIT_TRES_DATA_PER_YEAR_FAILURE";
  return async (dispatch) => {
    try {
      const response = await editDataPerYear(id_proj, id_Annee, data);
      dispatch({
        type: EDIT_TRES_DATA_PER_YEAR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: EDIT_TRES_DATA_PER_YEAR_FAILURE, payload: error });
    }
  };
}

export function fetchBilanPerYear(id_proj, id_Annee) {
  const FETCH_BILAN_PER_YEAR_SUCCESS = "FETCH_BILAN_PER_YEAR_SUCCESS";
  const FETCH_BILAN_PER_YEAR_FAILURE = "FETCH_BILAN_PER_YEAR_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getBilanPerYear(id_proj, id_Annee);
      dispatch({ type: FETCH_BILAN_PER_YEAR_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_BILAN_PER_YEAR_FAILURE, payload: error });
    }
  };
}
export function editedBilanPerYear(id_proj, id_Annee, data) {
  const EDIT_BILAN_PER_YEAR_SUCCESS = "EDIT_BILAN_PER_YEAR_SUCCESS";
  const EDIT_BILAN_PER_YEAR_FAILURE = "EDIT_BILAN_PER_YEAR_FAILURE";
  return async (dispatch) => {
    try {
      const response = await editBilanPerYear(id_proj, id_Annee, data);
      dispatch({
        type: EDIT_BILAN_PER_YEAR_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (error) {
      dispatch({ type: EDIT_BILAN_PER_YEAR_FAILURE, payload: error });
    }
  };
}
export function fetchCompteResultat(id_proj) {
  const FETCH_RESULTAT_SUCCESS = "FETCH_RESULTAT_SUCCESS";
  const FETCH_RESULTAT_FAILURE = "FETCH_RESULTAT_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getCompteResultat(id_proj);
      dispatch({ type: FETCH_RESULTAT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_RESULTAT_FAILURE, payload: error });
    }
  };
}
export function fetchPlanFinancier(id_proj) {
  const FETCH_PLAN_SUCCESS = "FETCH_PLAN_SUCCESS";
  const FETCH_PLAN_FAILURE = "FETCH_PLAN_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getPLanFinancier(id_proj);
      dispatch({ type: FETCH_PLAN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PLAN_FAILURE, payload: error });
    }
  };
}
export function editedPlanFinancier(id_proj, data) {
  const EDIT_PLAN_SUCCESS = "EDIT_PLAN_SUCCESS";
  const EDIT_PLAN_FAILURE = "EDIT_PLAN_FAILURE";
  return async (dispatch) => {
    try {
      const response = await editPLanFinancier(id_proj, data);
      dispatch({
        type: EDIT_PLAN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: EDIT_PLAN_FAILURE, payload: error });
    }
  };
}
export function fetchPdfBusinessCanvas(id_proj) {
  const FETCH_PDF_SUCCESS = "FETCH_PDF_SUCCESS";
  const FETCH_PDF_FAILURE = "FETCH_PDF_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getPdfBusinessCanvas(id_proj);
      dispatch({ type: FETCH_PDF_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PDF_FAILURE, payload: error });
    }
  };
}

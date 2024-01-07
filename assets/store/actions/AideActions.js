import { getAides, getAidesByEffectif } from "../../services/AideService";

export function fetchAides(offset) {
  const FETCH_AIDE_SUCCESS = "FETCH_AIDE_SUCCESS";
  const FETCH_AIDE_FAILURE = "FETCH_AIDE_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getAides(offset);

      dispatch({ type: FETCH_AIDE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_AIDE_FAILURE, payload: error });
    }
  };
}

export function fetchAidesByEffectif(effectif) {
  const FETCH_AIDE_BY_FILTER_SUCCESS = "FETCH_AIDE_BY_FILTER_SUCCESS";
  const FETCH_AIDE_BY_FILTER_FAILURE = "FETCH_AIDE_BY_FILTER_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getAidesByEffectif(effectif);
      dispatch({ type: FETCH_AIDE_BY_FILTER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_AIDE_BY_FILTER_FAILURE, payload: error });
    }
  };
}

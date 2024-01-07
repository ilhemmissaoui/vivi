import { getFaq } from "../../services/FaqService";

export function fetchFAQ() {
  const FETCH_FAQ_SUCCESS = "FETCH_FAQ_SUCCESS";
  const FETCH_FAQ_FAILURE = "FETCH_FAQ_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getFaq();
      dispatch({ type: FETCH_FAQ_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_FAQ_FAILURE, payload: error });
    }
  };
}

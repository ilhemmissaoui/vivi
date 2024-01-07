import { getCgu } from '../../services/CguService';

export function fetchCGU() {
  const FETCH_CGU_SUCCESS = 'FETCH_CGU_SUCCESS';
  const FETCH_CGU_FAILURE = 'FETCH_CGU_FAILURE';
  return async (dispatch) => {
    try {
      const response = await getCgu();

      dispatch({ type: FETCH_CGU_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CGU_FAILURE, payload: error });
    }
  };
}

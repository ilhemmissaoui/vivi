import { getPc } from '../../services/PcService';

export function fetchPc() {
  const FETCH_PC_SUCCESS = 'FETCH_PC_SUCCESS';
  const FETCH_PC_FAILURE = 'FETCH_PC_FAILURE';
  return async (dispatch) => {
    try {
      const response = await getPc();

      dispatch({ type: FETCH_PC_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PC_FAILURE, payload: error });
    }
  };
}

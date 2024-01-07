import { getResource } from "../../services/ResourceService";

export function fetchResource() {
  const FETCH_RESOURCE_SUCCESS = "FETCH_RESOURCE_SUCCESS";
  const FETCH_RESOURCE_FAILURE = "FETCH_RESOURCE_FAILURE";
  return async (dispatch) => {
    try {
      const response = await getResource();
      dispatch({ type: FETCH_RESOURCE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_RESOURCE_FAILURE, payload: error });
    }
  };
}

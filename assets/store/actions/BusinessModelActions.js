import {
  updateBusinessModelParam,
  getBusinessModelInfo,
} from "../../services/BusinessModelService";

export const GET_BMC_INFORMATION = "[get bmc info action] get bmc information";
export const UPDATE_BMC_INFORMATION =
  "[update bmc info action] update bmc information";
export const BMC_INFORMATION_CONFIRMED =
  "[get bmc info action] get bmc information confirmed";
export const BMC_INFORMATION_LOADING = "[get bmc info action] loading";

export function updateBusinessModelParamAction(projectId, data) {
  return async (dispatch) => {
    try {
      const response = await updateBusinessModelParam(projectId, data);
      dispatch(confirmedUpdateBmcInfo(response));
      // dispatch(getBusinessModelInfoAction(projectId))
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedUpdateBmcInfo(info) {
  return {
    type: UPDATE_BMC_INFORMATION,
    payload: info,
  };
}

export function getBusinessModelInfoAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BMC_INFORMATION_LOADING });

    try {
      const response = await getBusinessModelInfo(projectId);
      dispatch(confirmedGetBmcInfoAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetBmcInfoAction(info) {
  return {
    type: GET_BMC_INFORMATION,
    payload: info,
  };
}

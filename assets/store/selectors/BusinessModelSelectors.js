export const getBusinessModelInfoSelector = (state) => {
    return state.bmc.bmcInfo;
};

export const getBusinessModelInfoLoader = (state) => {
  return state.bmc.isLoading;
};

export const getUpdateMessage = (state) => {
  return state.bmc.updateMessage;
};

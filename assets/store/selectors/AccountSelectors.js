export const getAccountInfo = (state) => {
  return state.account.profileInfo;
};
export const getLoadingAccountInfo = (state) => {
  return state.account.isLoading;
};

export const getAccountInfoSuccess = (state) => {
  return state.account.successMessage;
};

export const getAccountInfoFailed = (state) => {
  return state.account.errorMessage;
};

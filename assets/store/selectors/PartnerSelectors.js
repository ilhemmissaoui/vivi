export const selectAllPartners = (state) => {
  return state.partner.allPartners;
};
export const getLoadingInfo = (state) => {
  return state.account.isLoading;
};

export const getSelectedPartner = (state) => {
  return state.partner.selectedPartner;
};
export const getPartner = (state) => {
  return state.partner.partner;
};

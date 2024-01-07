export const getBusinessPlanHistorySelector = (state) => {
  // if (state.bp.isLoading) {
  //   return null;
  // } else {
  return state.bp.historyInfo;
  // }
};

export const getBusinessPlanConcurrenceSelector = (state) => {
  if (state.bp.isLoading) {
    return null;
  } else {
    return state.bp.concurrenceInfo;
  }
};

export const getBusinessPlanHistoryInfoLoaderSelector = (state) => {
  return state.bp.isLoading;
};
export const getBusinessPlanConcurrenceInfoLoaderSelector = (state) => {
  return state.bp.isLoading;
};

export const getUpdateMessageHistory = (state) => {
  return state.bp.updateMessage;
};

export const getUpdateMessageConcurrence = (state) => {
  return state.bp.updateMessage;
};

export const getTeamMembers = (state) => {
  return state.bp.members;
};
export const getTeamMembersCollaborateur = (state) => {
  return state.bp.members_collab;
};

export const getAllSocieties = (state) => {
  return state.bp.societies;
};

export const getBPTeamLoaderSelector = (state) => {
  return state.bp.isGetMemberLoading;
};
export const addTeamLoaderSelector = (state) => {
  return state.bp.addMemberLoading;
};
export const getBPSocietyLoaderSelector = (state) => {
  return state.bp.isGetSocietyLoading;
};
export const getAllSocietiesLoaderSelector = (state) => {
  return state.bp.getSocietiesLoading;
};
export const addSocietyLoaderSelector = (state) => {
  return state.bp.addSocietyLoading;
};

export const getAllYearsSelector = (state) => {
  return state.bp.yearsSolution;
};

export const getAllYearsLoaderSelector = (state) => {
  return state.bp.getAllYearsLoading;
};

export const getYearByIdSelector = (state) => {
  return state.bp.year;
};

export const getOneSolutionSelector = (state) => {
  return state.bp.oneSolution;
};

export const getAllYearsByIdLoadoneSolutionerSelector = (state) => {
  return state.bp.getYearLoading;
};

export const getAllSolutionsSelector = (state) => {
  return state.bp.solutions;
};

export const getAllSolutionsLoaderSelector = (state) => {
  return state.bp.getSolutionsLoading;
};

export const getPositioning = (state) => {
  return state.bp.positioning;
};
export const getColomns = (state) => {
  return state.bp.colomns;
};
export const getBPPositioningLoaderSelector = (state) => {
  return state.bp.isGetPositioningLoading;
};
export const addPositioningLoaderSelector = (state) => {
  return state.bp.addPositioningLoading;
};

export const addActivityLoaderSelector = (state) => {
  return state.bp.addActivityLoading;
};

export const addMontantAnneeLoaderSelector = (state) => {
  return state.bp.valuetomonths;
};

export const valuetomonthsSelector = (state) => {
  return state.bp.valuetomonths;
};
////
export const getAllActivitySelector = (state) => {
  return state.bp.getAllActivity;
};

export const getAllActivityLoadingSelector = (state) => {
  return state.bp.getAllActivityLoading;
};

export const getAllExternalChargesloading = (state) => {
  return state.bp.getAllExternalChargesloading;
};

export const GetValueToMonthActionSelector = (state) => {
  return state.bp.valuetomonths; // Update the property to getAllActivityLoadingAction
};
export const getAllExternalChargesSelector = (state) => {
  return state.bp.getAllExternalCharges; // Update this line to match the correct key
};

export const getOneChareActionActionSelector = (state) => {
  return state.bp.oneextranlchargyear;
};

export const deleteActivitySelector = (state) => {
  return state.deleteActivityConfirmed;
};
export const selectedVisionSelector = (state) => {
  return state.bp.selectedVision;
};
export const allVisionsSelector = (state) => {
  return state.bp.visions;
};

// Financement External charges

export const allExternalChargesSelector = (state) => {
  return state.bp.externalCharges;
};
export const allSocialChargesSelector = (state) => {
  return state.bp.socialCharges;
};
export const allSocialChargesLoaderSelector = (state) => {
  return state.bp.socialChargeLoader;
};
export const allExternalChargesLoaderSelector = (state) => {
  return state.bp.externalChargesLoader;
};
export const addSocialChargeLoaderSelector = (state) => {
  return state.addYearLoading;
};

export const addEmployeeLoaderSelector = (state) => {
  return state.addEmployeeLoading;
};
export const addEmployeeProjectLoaderSelector = (state) => {
  return state.addEmployeeProjectLoading;
};
export const employeeSelector = (state) => {
  return state.bp.getEmployee;
};

export const addSalarieLoaderSelector = (state) => {
  return state.addSalarieLoading;
};

import {
  addTeamMember,
  getBusinessPlanConcurrenceInfo,
  getBusinessPlanHistoryInfo,
  getBusinessPlanTeamMembers,
  updateBusinessPlanHistoryParam,
  getAllSocieties,
  addSociety,
  getBusinessPlanAllSolutions,
  getBusinessPlanSolutionById,
  addBusinessPlanSolution,
  addBusinessPlanSolutionRevenu,
  deleteBusinessPlanSolutionById,
  getAllPositioning,
  addPositioning,
  getAllVisionStrategyInfo,
  getVisionStrategyById,
  updateVisionStrategyById,
  addVisionStrategyInfo,
  addVisionStrategyTypeById,
  deleteVisionStrategyById,
  deletePositioningById,
  addConcurrencePositioning,
  addAactivity,
  addMontant,
  AddMontantAnnee,
  getAllActivity,
  deleteActivity,
  getAllColomns,
  addYearSolution,
  getAllYears,
  GetYearById,
  addExternalCharge,
  getAllExternalCharge,
  getOneExternalCharge,
  deleteOneExternalCharge,
  addMontantExternalCharge,
  updateMontantExternalCharge,
  updateExternalCharge,
  addSocialCharge,
  addValueToMonth,
  deleteMontantAnne,
  getAllSocialCharge,
  GetValueToMonth,
  updateActivityName,
  addEmployeeMember,
  getEmployee,
  addSalarieMember,
  addEmployeeProjectMember,
  editMonthsValue,
  deleteOneYearExtrnalCharge,
  addMonthExternalChargeValue,
  getOneYearCharge,
  addCollabProjet,
  editHistoireEquipe,
  getOneSolution,
  updateSociety,
  addVisionStrategyComplete,
  editPositioning,
  addMemberCollab,
  addNewMember,
  fetchAllMembers,
  getAllSocialChargeCollaborateurs,
  deleteConcurrencePositioning,
  getBusinessPlanSynthese,
  addConcurrencePositioningProjet,
  addCollabByMail,
  SendMail,
  addDirigeantMember,
} from "../../services/BusinessPlanService";
import { getUsersAction } from "./ProjectAction";

export const GET_BP_COLLABORATEURS =
  "[get bp collab info action] get bp collab information";
export const GET_BP_HISTORY_INFORMATION =
  "[get bp history info action] get bp history information";
export const CREATE_CONCURRENT_COLOMN_ACTION =
  "[create colomn action] create new colomn";
export const GET_BP_CONCURRENCE_INFORMATION =
  "[get bp CONCURRENCE info action] get bp CONCURRENCE information";
export const UPDATE_BP_HISTORY_INFORMATION =
  "[update bp history info action] update b history information";

export const GET_BP_ALL_SOCIETIES =
  "[get bp societies  action] get bp societies information";
export const GET_BP_ALL_POSITIONING =
  "[get bp positioning  action] get bp positioning information";
export const GET_BP_ALL_POSITIONING_LOADING =
  "[get bp positioning loading  action] get bp positioning loading information";
export const GET_BP_ALL_COLOMNS =
  "[get bp colomns  action] get bp colomns information";
export const GET_BP_TEAM_MEMBERS =
  "[get bp team members  action] get bp team members information";

export const ADD_BP_TEAM_MEMBERS =
  "[add bp team members  action] add bp team members information";
export const ADD_BP_POSITIONING =
  "[add bp positioning  action] add bp positioning information";
export const BP_HISTORY_INFORMATION_LOADING =
  "[get bp history info loading action] get bp history info loading action";
export const ADD_BP_SOCIETY =
  "[add bp society   action] add bp society information";

export const UPDATE_BP_TEAM_MEMBERS =
  "[update bp team member action] update bp team member";

export const ADD_BP_POSITIONING_CONFIRMED =
  "[add bp positioning  action] add bp positioning information";

export const ADD_BP_SALARIE_CONFIRMED =
  "[add bp salarie confimed  action] add bp salarie confimed information";
export const ADD_BP_SOCIETY_CONFIRMED =
  "[add bp society confimed  action] add bp society confimed information";
export const DELETE_BP_TEAM_MEMBERS =
  "[delete bp team member action] delete bp team member";
export const DELETE_BP_POSITIONING =
  "[delete bp positionement action] delete bp positionement";
export const ADD_BP_TEAM_MEMBERS_CONFIRMED =
  "[add bp team members  action confirmed] add bp team members information confirmed";

//// addactivity

export const ADD_BP_ACTIVITY =
  "[add bp society   action] add bp society information";
export const BP_ADD_ACTIVITY_LOADING = "[get bp activity info action] loading";
export const BP_ADD_SALARIE_LOADING = "[get bp employee info action] loading";

export const ADD_BP_ACTIVITY_CONFIRMED =
  "[add bp activity  action confirmed] add bp activity information confirmed";

//////////////AddMontantAnnee

export const ADD_BP_MONTANT_ANNEE =
  "[add bp AddMontantAnnee  action] add bp AddMontantAnnee information";

export const ADD_BP_MONTANT_ANNEE_LOADING =
  "[add bp activity info action] loading";

export const ADD_BP_MONTANT_ANNEE_CONFIRMED =
  "[add bp Annee info action confirmed] add bp Annee info action confirmed  ]  ";

////addValueToMonth

export const ADD_BP_MONTANT_TO_MONTH =
  "[ add bp montant] add montant to month ";

export const ADD_BP_MONTANT_TO_MONTH_LOADING =
  "[ add montant to month loading ] add montant to month loading ";

export const ADD_BP_MONTANT_TO_MONTH_CONFIRMED =
  "[ add montant to month confirmed ] add montant to month confirmed ";

//getAllactivity

export const GET_ALL_BP_ACTIVITY =
  "[get All bp activity action]  get all bp activity action  ";

export const GET_ALL_ACTIVITY_LOADING =
  "[get All bp activity action loading]  get all bp activity action Loading ";

export const GET_ALL_ACTIVITY_CONFIRMED =
  "[ get all activity confirmed action ] get all activity confirmed action ";

export const GET_ONE_BP_ACTIVITY =
  "[get one bp activity action]  get one bp activity action  ";

export const GET_ONE_ACTIVITY_LOADING =
  "[get one bp activity loading action]  get one bp activity loading action ";

export const GET_ONE_ACTIVITY_CONFIRMED =
  "[ get one activity confirmed ] get one activity confirmed ";

//// DELETE ACTIVITY
export const DELETE_ACTIVITY =
  "[delete activity action  ] delete activity action ";

export const DELETE_ACTIVITY_LOADING =
  "[delete activity  LOADING action  ] delete activity LOADING action ";

export const DELETE_ACTIVITY_CONFIRMED =
  "[delete activity  CONFIRMED action  ] delete activity CONFIRMED action ";

// GetValueToMonth

export const GET_BP_VALUE_TO_MONTH =
  "[get bp  Value To Month]  get bp  Value To Month  ";

export const GET_BP_VALUE_TO_MONTH_LOADING =
  "[get bp  Value To Month loading action] get bp  Value To Month loading action ";

export const GET_BP_VALUE_TO_MONTH_CONFIRMED =
  "[get bp  Value To Month confirmed ] get bp  Value To Month confirmed ";

///////

export const BP_HISTORY_INFORMATION_CONFIRMED =
  "[get bp history action] get bp history information confirmed";

export const BP_ADD_SOCIETY_LOADING = "[get bp society info action] loading";

export const BP_HISTORY_TEAM_LOADING =
  "[get bp team members info action] loading";

export const ADD_BP_CONCURRENCE_POSITIONING_CONFIRMED =
  "[add bp positioning confirmed action] add bp positioning confirmed information confirmed";

export const BP_COLOMNS_LOADING =
  "[get bp colomns positioning info action] get bp colomns positioning info action";
export const BP_ADD_CONCURRENCE_POSITIONING_LOADING =
  "[get bp concurrence positioning info action] loading";
export const BP_ADD_POSITIONING_LOADING =
  "[add bp positioning loading action] add bp positioning loading action";

export const BP_SOCIETIES_LOADING =
  "[add societies loading  action] add societies loading  action ";
export const BP_POSITIONING_LOADING = "[bp positioning info action] loading";
export const GET_SOCIETIES_LOADING =
  "[get societies loading  action] get societies loading  action ";

export const BP_ADD_TEAM_LOADING =
  "[add bp team members loading info action] add bp team members";
export const BP_CONCURRENCE_INFORMATION_LOADING =
  "[get bp concurrence info action] get bp concurrence loading info action";
export const UPDATE_BP_CONCURRENCE_INFORMATION =
  "[update bp concurrence info action] update b concurrence information";

export const ADD_NEW_YEAR_SOLUTION = "[add new year action] add new year";
export const ADD_NEW_YEAR_SOLUTION_LOADING =
  "[add new year loading action] add new year loading";

export const GET_YEAR_BY_ID_SOLUTION =
  "[get solution year by id action] get solution year by id action";
export const GET_ALL_YEARS_SOLUTION =
  "[get all solution years  action] get all solution years";
export const GET_ALL_YEARS_SOLUTION_LOADING =
  "[get all years loading action] get all years loading";

export const GET_YEAR_BY_ID_SOLUTION_LOADING =
  "[get solution year by id loading action] get solution year by id loading";

export const GET_ALL_SOLUTIONS_INFORMATION =
  "[get all solutions action] get all solutions information";

export const GET_ALL_SOLUTIONS_INFORMATION_CONFIRMED =
  "[get all solutions confirmed action] get all solutions confirmed information";

export const GET_SOLUTION_BY_ID_INFORMATION =
  "[get solution by id action] get solution by id information";

export const GET_SOLUTION_BY_ID_INFORMATION_CONFIRMED =
  "[get solution by id confirmed action] get solution by id information confirmed";

export const ADD_NEW_SOLUTION = "[add new solution action] add new solution";
export const ADD_NEW_SOLUTION_CONFIRMED =
  "[add new solution confirmed action] add new solution confirmed";

export const ADD_SOLUTION_REVENU =
  "[add solution revenu action] add solution revenu";

export const ADD_SOLUTION_REVENU_CONFIRMED =
  "[add solution revenu confirmed action] add solution revenu confirmed";

export const DELETE_SOLUTION_BY_ID =
  "[delete solution by id action] delete solution by id";

export const DELETE_SOLUTION_BY_ID_CONFIRMED =
  "[delete solution by id confirmed action] delete solution by id confirmed";

export const ADD_NEW_SOLUTION_LOADING =
  "[add new solution loading action] add new solution loading";

export const ADD_NEW_SOLUTION_REVENU_LOADING =
  "[add new solution revenu loading action] add new solution revenu loading";

export const GET_ALL_SOLUTIONS_LOADING =
  "[get all solutions loading action] get all solutions loading";

export const GET_SOLUTION_BY_ID_LOADING =
  "[get solution by id loading action] get solution by id loading";

export const DELETE_SOLUTION_BY_ID_LOADING =
  "[delete solution by id loading action] delete solution by id loading";

export const GET_ALL_VISION_INFORMATION =
  "[get all visions & strategies action] get all visions & strategies action information";

export const GET_ALL_VISIONS_INFORMATION_CONFIRMED =
  "[get all visions confirmed action] get all visions confirmed information";

export const GET_VISION_BY_ID_INFORMATION =
  "[get vision by id action] get vision by id information";

export const GET_VISION_BY_ID_INFORMATION_CONFIRMED =
  "[get vision by id confirmed action] get vision by id information confirmed";

export const ADD_NEW_VISION = "[add new vision action] add new vision";

export const ADD_NEW_VISION_CONFIRMED =
  "[add new vision confirmed action] add new vision confirmed";

export const ADD_BP_DIRIGEANT_CONFIRMED =
  "[add new dirigeant confirmed action] add new dirigeant confirmed";
export const ADD_NEW_VISION_TYPE =
  "[add new vision type action] add vision type solution";
export const SELECT_VISION = "[select vision  action] select vision";

export const ADD_NEW_VISION_TYPE_CONFIRMED =
  "[add new vision type confirmed action] add new vision type confirmed";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const ADD_NEW_VISION_COMPLETE_CONFIRMED =
  "[add new vision complete confirmed action] add new vision complete confirmed";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const UPDATE_VISION_BY_ID_INFORMATION =
  "[update vision by id action] update vision by id information";

export const UPDATE_VISION_BY_ID_INFORMATION_CONFIRMED =
  "[update vision by id confirmed action] update vision by id information confirmed";

export const DELETE_VISION_BY_ID =
  "[delete vision by id action] delete vision by id";
//////

export const DELETE_VISION =
  "[delete vision by id  action] delete vision by id ";

export const DELETE_VISION_BY_ID_CONFIRMED =
  "[delete vision by id confirmed action] delete vision by id confirmed";
export const DELETE_VISION_BY_ID_LOADING =
  "[delete vision by id loading action] delete vision by id loading";

///

export const DELETE_POSITIONING_BY_ID_CONFIRMED =
  "[delete positioning by id confirmed action] delete positioning by id confirmed";
export const ADD_NEW_VISION_LOADING =
  "[add new vision loading action] add new vision loading";

export const ADD_NEW_VISION_TYPE_LOADING =
  "[add new vision type loading action] add new vision type loading action";

export const GET_ALL_VISIONS_LOADING =
  "[get all visions loading action] get all visions loading";

export const GET_VISION_BY_ID_LOADING =
  "[get vision by id loading action] get vision by id loading";

//////////////// add external charge

export const ADD_EXTERNAL_CHARGE =
  "[add external charge action] add external charge solution";

export const ADD_EXTERNAL_CHARGE_CONFIRMED =
  "[add new external charge confirmed action] add new external charge confirmed";

export const ADD_NEW_EXTERNAL_CHARGE_LOADING =
  "[add new external charge confirmed action] add new external charge confirmed";

//////////////// add external charge annee

export const ADD_MONTANT_EXTERNAL_CHARGE =
  "[add montant external charge action] add montant external charge";

export const ADD_MONTANT_EXTERNAL_CHARGE_CONFIRMED =
  "[add montant external charge action] add montant external charge";

export const ADD_MONTANT_EXTERNAL_CHARGE_LOADING =
  "[add montant external charge action loading  ] add montant external charge loading";

/////UPADATE EXTERNAL
export const UPDATE_SOCIETY = "[update society action] update  society ";
export const UPDATE_EXTERNAL_CHARGE =
  "[update external charge action] update external charge solution";

export const DELETE_EXTERNAL_CHARGE_BY_ID =
  "[delete external charge by id action] delete external charge by id";

export const DELETE_EXTERNAL_CHARGE_BY_ID_CONFIRMED =
  "[delete external charge by id confirmed action] delete external charge by id confirmed";

export const DELETE_EXTERNAL_CHARGE_BY_ID_LOADING =
  "[delete external charge by id loading action] get external charge by id loading";

//// get All external charges

export const GET_ALL_EXTERNAL_CHARGES =
  "[get all external charges action] get all external charges information";

export const GET_ALL_EXTERNAL_CHARGES_CONFIRMED =
  "[get all external charges confirmed action] get all external charges confirmed information";
export const GET_SOCIAL_CHARGE_CONFIRMED =
  "[get all social charges confirmed action] get all social charges confirmed information";
export const GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING =
  "[get external charge by id loading action] get external charge by id information loading";

//////////DELETE MONATANT ANNE

export const DELETE_MONTANT_ANNEE =
  "[delete external charge by id action] delete external charge by id";

export const DELETE_MONTANT_ANNEE_CONFIRMED =
  "[delete external charge by id confirmed action] delete external charge by id confirmed";

export const DELETE_MONTANT_ANNEE_LOADING =
  "[delete external charge by id loading action] get external charge by id loading";

/////////////////////

export const ADD_SOCIAL_CHARGE =
  "[add social charge action] add social charge solution";
export const ADD_NEW_SOCIAL_CHARGE_LOADING =
  "[add social charge loading action] add social charge loading";
export const ADD_SOCIAL_CHARGE_CONFIRMED =
  "[add new social charge confirmed action] add new social charge confirmed";

// update months value

export const UPDATE_MONTH_VALUE =
  "[ update months value ]  update months value ";
export const UPDATE_MONTH_VALUE_LOADING =
  "[ update months value loading ]  update months value loading ";
export const UPDATE_MONTH_VALUE_CONFIRMED =
  "[ update months value confirmed ]  update months value confirmed ";

// upadte activity name

export const UPDATE_ACTIVITY_NAME =
  "[pdate activity name ]  pdate activity name ";
export const UPDATE_ACTIVITY_NAME_LOADING =
  "[ update activity name  loading ] update activity name  ";
export const UPDATE_ACTIVITY_NAME_CONFIRMED =
  "[ update activity name confirmed   ]  update activity name  confirmed ";

////////////

export const GET_ALL_SOCIAL_CHARGE_LOADING =
  "[get all social charge loading action] get all social charge loading";
export const GET_BUSINESS_PLAN_MEMBERS_LOADING =
  "[get all social charge loading action] get all social charge loading";
export const GET_ALL_SOCIAL_CHARGE_CONFIRMED_INFORMATION =
  "[get all social charge confirmed action] get all social charge confirmed information";
export const ADD_BP_EMPLOYEE =
  "[add bp  employee  action] add bp employee information";
export const ADD_SALARIE =
  "[add bp salarie  action] add bp salarie information";
export const ADD_BP_EMPLOYEE_CONFIRMED =
  "[ add employee confirmed ] add employee confirmed ";

export const BP_ADD_EMPLOYEE_LOADING =
  "[ add montant loading ] add montant loading ";
export const ADD_BP_EMPLOYEE_PROJECT_CONFIRMED =
  "[ add employee bp confirmed ] add bp employee confirmed ";

export const BP_ADD_EMPLOYEE_PROJECT_LOADING =
  "[ add bp employee loading ] add bp employee loading ";

export const GET_ALL_BP_EMPLOYEE =
  "[get employee action] get employee information";
export const GET_BP_EMPLOYEE_LOADING =
  "[get all employee loading action] get all employee loading";

export const GET_BP_EMPLOYEE_CONFIRMED =
  "[get employee by id confirmed action] get employee by id information confirmed";

///////////////////////
export const DELETE_ONE_YEAR_EXTERNAL_CHARGE =
  "[delete one year  external charge action] delete external charge by id";

export const DELETE_ONE_YEAR_EXTERNAL_CHARGE_CONFIRMED =
  "[delete one year external charge confirmed action ] delete year external  charge by id confirmed";

export const DELETE_ONE_YEAR_EXTERNAL_CHARGE_LOADING =
  "[delete one year external charge loading action] get external charge by id loading";

/////////////// ADD VALUE TO MONTHS CHARGE EXTERNE
export const ADD_MONTH_VALUE =
  "[add value to months action] add value to months action";

export const ADD_MONTH_VALUE_CONFIRMED =
  "[add value to months actione confirmed action ] add value to months action confirmed";

export const ADD_MONTH_VALUE_LOADING =
  "[add value to months actionloading action] add value to months action loading";

///////////// edit / update one external charge year

export const UPADATE_EXTERNAL_CHARGE_YEAR =
  "[update external charges year ] update external charges year  ";

export const UPADATE_EXTERNAL_CHARGE_YEAR_CONFIRMED =
  "[update external charges year confirmed action ] update external charges yearaction confirmed";

export const UPADATE_EXTERNAL_CHARGE_YEAR__LOADING =
  "[update external charges year loading action] update external charges year action loading";

export const GET_ONE_CHARGE =
  "[get one year external charges action  ] get one year external charges action ";

export const GET_ONE_CHARGE_CONFIRMED =
  "[get one year external charges confirmed  ] get one year external charges confirmed ";

export const GET_ONE_CHARGE_LOADING =
  "get one year external charges  loading] get one year external charges  loading";

export const CONFIRMED_ADD_COLLAB_ACTION = "[add collab action] add new collab";

export const ADD_COLLAB_LOADING =
  "[add collab actionloading action] add collab action loading";

export const EDIT_HISTOIRE_EQUIPE =
  "[ EDIT_HISTOIRE_EQUIPE  ] EDIT_HISTOIRE_EQUIPE ";

export const EDIT_HISTOIRE_EQUIPE_CONFIRMED =
  "[EDIT_HISTOIRE_EQUIPE_CONFIRMED ] EDIT_HISTOIRE_EQUIPE_CONFIRMED";

export const HISTOIRE_EQUIPE_MEMBER_CONFIRMED =
  "[HISTOIRE_EQUIPE_CONFIRMED ] HISTOIRE_EQUIPE_CONFIRMED";

export const EDIT_HISTOIRE_EQUIPE_LOADING =
  "EDIT_HISTOIRE_EQUIPE_LOADING] EDIT_HISTOIRE_EQUIPE_LOADING";
export const HISTOIRE_EQUIPE_NEW_MEMBER_LOADING =
  "HISTOIRE_EQUIPE_LOADING] HISTOIRE_EQUIPE_LOADING";

export const GET_ONE_SOLUTION =
  "[get  ONE SOLUTION  action  ] get  ONE SOLUTION   action ";

export const GET_ONE_SOLUTION_CONFIRMED =
  "[get  ONE SOLUTION  action confirmed  ] get  ONE SOLUTION  action confirmed ";

export const GET_ONE_SOLUTION_LOADING =
  "get  ONE SOLUTION  action loading] get  ONE SOLUTION  action loading";
export const CLEAR_ERR = "CLEAR_ERR";

export const clearErrAction = () => ({
  type: CLEAR_ERR,
});
export function updateBusinessPlanParamAction(projectId, data) {
  return (dispatch) => {
    updateBusinessPlanHistoryParam(projectId, data)
      .then((response) => {
        dispatch(getBusinessPlanHistoryAction(projectId));
      })
      .catch((error) => {
        const errorMessage =
          "An unknown error occurred. Please try again later.";
        return errorMessage;
      });
  };
}

export function confirmedUpdateBPInfo(info) {
  return {
    type: UPDATE_BP_HISTORY_INFORMATION,
    payload: info,
  };
}

export function getBusinessPlanHistoryAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BP_HISTORY_INFORMATION_LOADING });

    try {
      const response = await getBusinessPlanHistoryInfo(projectId);
      dispatch(confirmedGetBpHistoryInfoAction(response.data["HistoireInfo"]));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}
export function getBusinessPlanSyntheseAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BP_HISTORY_INFORMATION_LOADING });

    try {
      const response = await getBusinessPlanSynthese(projectId);
      dispatch(confirmedGetBpHistoryInfoAction(response.data["HistoireInfo"]));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getBusinessPlanConcurrenceAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BP_CONCURRENCE_INFORMATION_LOADING });

    try {
      const response = await getBusinessPlanConcurrenceInfo(projectId);
      dispatch(confirmedGetBpConcurrenceInfoAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetBpHistoryInfoAction(info) {
  return {
    type: GET_BP_HISTORY_INFORMATION,
    payload: info,
  };
}

export function confirmedGetBpConcurrenceInfoAction(info) {
  return {
    type: GET_BP_CONCURRENCE_INFORMATION,
    payload: info,
  };
}
export function getBusinessPlanTeamMembersAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BP_HISTORY_TEAM_LOADING });

    try {
      const response = await getBusinessPlanTeamMembers(projectId);
      dispatch(confirmedGetBpTeamMembersAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getBusinessPlanCollaborateurAction(projectId, anneeId) {
  return async (dispatch) => {
    dispatch({ type: BP_HISTORY_TEAM_LOADING });

    try {
      const response = await getAllSocialChargeCollaborateurs(
        projectId,
        anneeId
      );
      dispatch(confirmedGetBpTeamMembersAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetBpCollaborateurAction(info) {
  return {
    type: GET_BP_COLLABORATEURS,
    payload: info,
  };
}

export function confirmedGetBpTeamMembersAction(info) {
  return {
    type: GET_BP_TEAM_MEMBERS,
    payload: info,
  };
}

export function addTeamMemberAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addTeamLoaderAction(true));
    addTeamMember(projectId, postData)
      .then((response) => {
        dispatch(addTeamLoaderAction(false));
        dispatch(confirmedAddMemberAction(response.data));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_MEMBER_ERROR", payload: error.message });
      });
  };
}

export function confirmedAddMemberAction(member) {
  return {
    type: ADD_BP_TEAM_MEMBERS_CONFIRMED,
    payload: member,
  };
}
export function addTeamLoaderAction(status) {
  return {
    type: BP_ADD_TEAM_LOADING,
    payload: status,
  };
}

export function addSocietyAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addSocietyLoaderAction(true));
    addSociety(projectId, postData)
      .then((response) => {
        dispatch(addSocietyLoaderAction(false));
        dispatch(confirmedAddSocietyAction(response.data));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_SOCIETY_ERROR", payload: error.message });
      });
  };
}

export function confirmedAddSocietyAction(society) {
  return {
    type: ADD_BP_SOCIETY_CONFIRMED,
    payload: society,
  };
}
export function addSocietyLoaderAction(status) {
  return {
    type: BP_ADD_SOCIETY_LOADING,
    payload: status,
  };
}

export function confirmedGetAllSocietiesAction(info) {
  return {
    type: GET_BP_ALL_SOCIETIES,
    payload: info,
  };
}
export function getBusinessPlanAllSocietiesAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: GET_SOCIETIES_LOADING });

    try {
      const response = await getAllSocieties(projectId);
      dispatch(confirmedGetAllSocietiesAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

/*** SOLUTION ***/

// ADD NEW YEAR

export function addSolutionYearAction(projectId) {
  return async (dispatch, getState) => {
    dispatch(addSolutionYearLoadingAction(true)); // set loading state to true
    return addYearSolution(projectId)
      .then((response) => {
        dispatch(addSolutionYearLoadingAction(false)); // set loading state to false
        // await dispatch(confirmedAddSolutionYearAction(response.data));
        return response;
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
        throw error;
      });
  };
}

export function confirmedAddSolutionYearAction(year) {
  return {
    type: ADD_NEW_YEAR_SOLUTION,
    payload: year,
  };
}
export function addSolutionYearLoadingAction(status) {
  return {
    type: ADD_NEW_YEAR_SOLUTION_LOADING,
    payload: status,
  };
}
// GET ALL SOLUTIONS YEARS ACTIONS

export function getSolutionAllYearsAction(projectId) {
  return async (dispatch) => {
    dispatch(getAllYearsLoadingAction(true));
    try {
      const response = await getAllYears(projectId);
      dispatch(getAllYearsLoadingAction(false));
      dispatch(confirmedGetSolutionAllYearsAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetSolutionAllYearsAction(years) {
  return {
    type: GET_ALL_YEARS_SOLUTION,
    payload: years,
  };
}
export function getAllYearsLoadingAction(status) {
  return {
    type: GET_ALL_YEARS_SOLUTION_LOADING,
    payload: status,
  };
}
// GET SOLUTION YEAR BY ID

export function getSolutionYearByIdAction(projectId, yearId) {
  return async (dispatch) => {
    dispatch(getYearByIdLoadingAction(true));
    try {
      const response = await GetYearById(projectId, yearId);
      dispatch(getYearByIdLoadingAction(false));

      dispatch(confirmedGetSolutionYearbyIdAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetSolutionYearbyIdAction(year) {
  return {
    type: GET_YEAR_BY_ID_SOLUTION,
    payload: year,
  };
}
export function getYearByIdLoadingAction(status) {
  return {
    type: GET_YEAR_BY_ID_SOLUTION_LOADING,
    payload: status,
  };
}
// GET ALL SOLUTIONS ACTIONS

export function getBusinessPlanSolutionsAction(projectId) {
  return async (dispatch) => {
    dispatch(getSolutionsLoadingAction(true));
    try {
      const response = await getBusinessPlanAllSolutions(projectId);
      dispatch(getSolutionsLoadingAction(false));

      dispatch(confirmedGetAllSolutionsAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetAllSolutionsAction(info) {
  return {
    type: GET_ALL_SOLUTIONS_INFORMATION_CONFIRMED,
    payload: info,
  };
}
export function getSolutionsLoadingAction(status) {
  return {
    type: GET_ALL_SOLUTIONS_LOADING,
    payload: status,
  };
}

// GET SOLUTION BY ID ACTIONS

export function getBusinessPlanSolutionByIdAction(projectId, solutionId) {
  return async (dispatch) => {
    dispatch({ type: GET_SOLUTION_BY_ID_LOADING });

    try {
      const response = await getBusinessPlanSolutionById(projectId, solutionId);
      dispatch(confirmedGetBpSolutionByIdAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedGetBpSolutionByIdAction(info) {
  return {
    type: GET_SOLUTION_BY_ID_INFORMATION_CONFIRMED,
    payload: info,
  };
}

export function getSolutionByIdLoadingAction(status) {
  return {
    type: GET_SOLUTION_BY_ID_LOADING,
    payload: status,
  };
}
// ADD NEW SOLUTION

export function addBusinessPlanSolutionAction(projectId, postData) {
  return async (dispatch, getState) => {
    await dispatch(addSolutionLoadingAction(true)); // set loading state to true
    return addBusinessPlanSolution(projectId, postData)
      .then((response) => {
        dispatch(addSolutionLoadingAction(false)); // set loading state to false
        dispatch(confirmedAddBusinessPlanSolutionAction(response.data));
        return response.data;
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}

export function confirmedAddBusinessPlanSolutionAction(solution) {
  return {
    type: ADD_NEW_SOLUTION_CONFIRMED,
    payload: solution,
  };
}
export function addSolutionLoadingAction(status) {
  return {
    type: ADD_NEW_SOLUTION_LOADING,
    payload: status,
  };
}
// ADD SOLUTION  REVNU
export function addBusinessPlanSolutionRevenuAction(
  projectId,
  solutionId,
  postData
) {
  return (dispatch, getState) => {
    dispatch(addSolutionRevenuLoadingAction(true)); // set loading state to true
    addBusinessPlanSolutionRevenu(projectId, solutionId, postData)
      .then((response) => {
        dispatch(addSolutionRevenuLoadingAction(false)); // set loading state to false
        dispatch(confirmedAddBusinessPlanSolutionRevenuAction(response.data));
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}

export function confirmedAddBusinessPlanSolutionRevenuAction(revenu) {
  return {
    type: ADD_SOLUTION_REVENU_CONFIRMED,
    payload: revenu,
  };
}
export function addSolutionRevenuLoadingAction(status) {
  return {
    type: ADD_NEW_SOLUTION_REVENU_LOADING,
    payload: status,
  };
}
// DELETE SOLUTION

export function deleteBusinessPlanSolutionAction(projectId, solutionId) {
  return (dispatch, getState) => {
    deleteBusinessPlanSolutionById(projectId, solutionId).then((response) => {
      dispatch(confirmedDeleteBusinessPlanSolutionAction(projectId));
    });
  };
}

export function confirmedDeleteBusinessPlanSolutionAction(
  projectId,
  solutionId
) {
  return {
    type: DELETE_SOLUTION_BY_ID_CONFIRMED,
    payload: projectId,
  };
}
export function deleteSolutionLoadingAction(status) {
  return {
    type: DELETE_SOLUTION_BY_ID_LOADING,
    payload: status,
  };
}

// positionnement
export function confirmedGetAllPositioningAction(info) {
  return {
    type: GET_BP_ALL_POSITIONING,
    payload: info,
  };
}
export function getBusinessPlanAllPositioningAction(projectId) {
  return async (dispatch) => {
    dispatch(getBusinessPlanAllPositioningLoadingAction(true));

    try {
      const response = await getAllPositioning(projectId);
      dispatch(confirmedGetAllPositioningAction(response.data));
      dispatch(getBusinessPlanAllPositioningLoadingAction(false));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}
export function getBusinessPlanAllPositioningLoadingAction(status) {
  return {
    type: GET_BP_ALL_POSITIONING_LOADING,
    payload: status,
  };
}
////// addActivityAction

export function addActivityAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addActivityLoaderAction(true));

    addAactivity(projectId, postData)
      .then((response) => {
        dispatch(addActivityLoaderAction(true));
        dispatch(confirmedAddActivityAction(response.data));
        dispatch(getAllActivityAction(projectId));
        dispatch(addActivityLoaderAction(false));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_ACTIVITY_ERROR", payload: error.message });
      });
  };
}

export function confirmedAddActivityAction(Activity) {
  return {
    type: ADD_BP_ACTIVITY_CONFIRMED,
    payload: Activity,
  };
}
export function addActivityLoaderAction(status) {
  return {
    type: BP_ADD_ACTIVITY_LOADING,
    payload: status,
  };
}

////AddMontantAnnee

export function AddMontantAnneeAction(projectId, postData) {
  return async (dispatch, getState) => {
    dispatch(addMontantAnneeLoaderAction(true));

    try {
      const response = await AddMontantAnnee(projectId, postData);
      dispatch(confirmedMontantAnneeAction(response.data));
      await dispatch(getAllActivityAction(projectId));
      dispatch(addMontantAnneeLoaderAction(false));
    } catch (error) {
      dispatch({ type: "CREATE_ACTIVITY_ERROR", payload: error.message });
    }
  };
}
export function confirmedMontantAnneeAction(Montant) {
  return {
    type: ADD_BP_MONTANT_ANNEE_CONFIRMED,
    payload: Montant,
  };
}
export function addMontantAnneeLoaderAction(status) {
  return {
    type: ADD_BP_MONTANT_ANNEE_LOADING,
    payload: status,
  };
}

//// montantaddMonth

export function addValueToMonthAction(
  projectId,
  idChiffreAffaire,
  idMontant,
  postData
) {
  return (dispatch, getState) => {
    dispatch(addValueToMonthLoaderAction(true));

    addValueToMonth(projectId, idChiffreAffaire, idMontant, postData)
      .then((response) => {
        dispatch(addValueToMonthLoaderAction(true));

        dispatch(addValueToMonthConfirmedAction(response.data));
        dispatch(getAllActivityAction(projectId));

        dispatch(addValueToMonthLoaderAction(false));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_MONTANTADD_ERROR", payload: error.message });
      });
  };
}

export function addValueToMonthConfirmedAction(valuetomonths) {
  return {
    type: ADD_BP_MONTANT_TO_MONTH_CONFIRMED,
    payload: valuetomonths,
  };
}

export function addValueToMonthLoaderAction(status) {
  return {
    type: ADD_BP_MONTANT_TO_MONTH_LOADING,
    payload: status,
  };
}

export function editPositioningAction(projectId, postData) {
  return (dispatch, getState) => {
    editPositioning(projectId, postData)
      .then((response) => {
        dispatch(getBusinessPlanAllPositioningAction(projectId));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_POSITIONING_ERROR", payload: error.message });
      });
  };
}

//add positionnement
export function addPositioningAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addPositioningLoaderAction(true));
    addPositioning(projectId, postData)
      .then((response) => {
        dispatch(getBusinessPlanAllPositioningAction(projectId));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_POSITIONING_ERROR", payload: error.message });
      });
  };
}

export function confirmedAddPositioningAction(Positioning) {
  return {
    type: ADD_BP_POSITIONING_CONFIRMED,
    payload: Positioning,
  };
}
export function addPositioningLoaderAction(status) {
  return {
    type: BP_ADD_POSITIONING_LOADING,
    payload: status,
  };
}
export function deletePositioningAction(projectId, idBesoin) {
  return (dispatch, getState) => {
    deletePositioningById(projectId, idBesoin).then((response) => {
      dispatch(getBusinessPlanAllPositioningAction(projectId));
    });
  };
}
export function confirmedDeletePositioningByIdAction(projectId) {
  return {
    type: DELETE_POSITIONING_BY_ID_CONFIRMED,
    payload: projectId,
  };
}

export function addConcurrencePositioningAction(
  projectId,
  idBesoin,
  idSociete,
  postData
) {
  return (dispatch, getState) => {
    dispatch(addConcurrencePositioningLoaderAction(true));
    addConcurrencePositioning(projectId, idBesoin, idSociete, postData)
      .then((response) => {
        dispatch(addConcurrencePositioningLoaderAction(false));
        dispatch(confirmedaddConcurrencePositioningAction(response.data));
        dispatch(getBusinessPlanAllPositioningAction(projectId));
      })
      .catch((error) => {
        dispatch({
          type: "CREATE_CONCURRENCE_POSITIONING_ERROR",
          payload: error.message,
        });
      });
  };
}
export function addConcurrencePositioningProjetAction(
  projectId,
  idBesoin,
  idSociete,
  postData
) {
  return (dispatch, getState) => {
    dispatch(addConcurrencePositioningLoaderAction(true));
    addConcurrencePositioningProjet(projectId, idBesoin, idSociete, postData)
      .then((response) => {
        dispatch(addConcurrencePositioningLoaderAction(false));
        dispatch(confirmedaddConcurrencePositioningAction(response.data));
        dispatch(getBusinessPlanAllPositioningAction(projectId));
      })
      .catch((error) => {
        dispatch({
          type: "CREATE_CONCURRENCE_POSITIONING_ERROR",
          payload: error.message,
        });
      });
  };
}

export function deleteConcurrencePositioningAction(
  projectId,
  idBesoin,
  idSociete,
  volumes
) {
  return (dispatch, getState) => {
    dispatch(addConcurrencePositioningLoaderAction(true));
    deleteConcurrencePositioning(projectId, idBesoin, idSociete, volumes)
      .then((response) => {
        dispatch(addConcurrencePositioningLoaderAction(false));
        dispatch(confirmedaddConcurrencePositioningAction(response.data));
        dispatch(getBusinessPlanAllPositioningAction(projectId));
      })
      .catch((error) => {
        dispatch({
          type: "CREATE_CONCURRENCE_POSITIONING_ERROR",
          payload: error.message,
        });
      });
  };
}

export function confirmedaddConcurrencePositioningAction(Positioning) {
  return {
    type: ADD_BP_CONCURRENCE_POSITIONING_CONFIRMED,
    payload: Positioning,
  };
}
export function addConcurrencePositioningLoaderAction(status) {
  return {
    type: BP_ADD_CONCURRENCE_POSITIONING_LOADING,
    payload: status,
  };
}

// export function addConcurrentColomnAction(projectId, postData) {
//   return (dispatch, getState) => {
//     dispatch(addConcurrenceColomn(projectId, postData));
//     return addColomnInfo(projectId, postData)
//       .then((response) => {
//         dispatch(addConcurrencePositioningLoaderAction(false));
//         dispatch(confirmedaddConcurrencePositioningAction(response.data));
//         return response.data;
//       })
//       .catch((error) => {
//         dispatch({ type: "ERROR", payload: error.message });
//         throw error;
//       });
//   };
// }

// get concurrence colomn
export function confirmedGetConcurrentColomnAction(info) {
  return {
    type: GET_BP_ALL_COLOMNS,
    payload: info,
  };
}
export function getConcurrentColomnAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: BP_COLOMNS_LOADING });

    try {
      const response = await getAllColomns(projectId);
      dispatch(confirmedGetConcurrentColomnAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}
// /**** Vision & Strategy  ****/

// Get all vision strategies

export function getVisionStrategyAction(projectId) {
  return (dispatch, getState) => {
    dispatch(getVisionsLoadingAction(true)); // set loading state to true
    getAllVisionStrategyInfo(projectId)
      .then((response) => {
        dispatch(confirmedGetVisionStrategyAction(response.data));
        dispatch(getVisionsLoadingAction(false)); // set loading state to false
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}

export function confirmedGetVisionStrategyAction(vision) {
  return {
    type: GET_ALL_VISIONS_INFORMATION_CONFIRMED,
    payload: vision,
  };
}

export function getVisionsLoadingAction(status) {
  return {
    type: GET_ALL_VISIONS_LOADING,
    payload: status,
  };
}
export function selectVisionAction(vision) {
  return {
    type: SELECT_VISION,
    payload: vision,
  };
}

// Get vision strategies by id

export function getVisionStrategyByIdAction(projectId, visionStrategyId) {
  return (dispatch, getState) => {
    dispatch(getVisionsByIdLoadingAction(true)); // set loading state to true
    getVisionStrategyById(projectId, visionStrategyId)
      .then((response) => {
        dispatch(getVisionsByIdLoadingAction(false)); // set loading state to false
        dispatch(confirmedGetVisionStrategyByIdAction(response.data));
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}

export function confirmedGetVisionStrategyByIdAction(vision) {
  return {
    type: GET_VISION_BY_ID_INFORMATION_CONFIRMED,
    payload: vision,
  };
}

export function getVisionsByIdLoadingAction(status) {
  return {
    type: GET_VISION_BY_ID_LOADING,
    payload: status,
  };
}

// Update vision strategies by id

export function updateVisionStrategyByIdAction(
  projectId,
  data,
  visionStrategyId
) {
  return async (dispatch) => {
    try {
      const response = await updateVisionStrategyById(
        projectId,
        data,
        visionStrategyId
      );
      dispatch(confirmedUpdateVisionStrategyByIdInfo(response));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedUpdateVisionStrategyByIdInfo(info) {
  return {
    type: UPDATE_VISION_BY_ID_INFORMATION,
    payload: info,
  };
}

// ADD NEW VISION STRATEGY

export function addVisionStrategyAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addVisionStrategyLoadingAction(true)); // set loading state to true
    return addVisionStrategyInfo(projectId, postData)
      .then((response) => {
        dispatch(addVisionStrategyLoadingAction(false)); // set loading state to false
        dispatch(confirmedAddVisionStrategyAction(response.data));
        return response.data;
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
        throw error; // re-throw the error to propagate it
      });
  };
}

export function confirmedAddVisionStrategyAction(vision) {
  return {
    type: ADD_NEW_VISION_CONFIRMED,
    payload: vision,
  };
}
export function addVisionStrategyLoadingAction(status) {
  return {
    type: ADD_NEW_VISION_LOADING,
    payload: status,
  };
}

// ADD VISION TYPE by ID STRATEGY

export function addVisionStrategyTypeByIdAction(
  projectId,
  visionStrategyId,
  postData,
  visionType
) {
  return (dispatch, getState) => {
    dispatch(addVisionStrategyTypeByIdLoadingAction(true)); // set loading state to true
    addVisionStrategyTypeById(projectId, postData, visionStrategyId, visionType)
      .then((response) => {
        dispatch(addVisionStrategyTypeByIdLoadingAction(false)); // set loading state to false
        dispatch(confirmedAddVisionStrategyTypeByIdAction(response.data));
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}

export function confirmedAddVisionStrategyTypeByIdAction(vision) {
  return {
    type: ADD_NEW_VISION_TYPE_CONFIRMED,
    payload: vision,
  };
}
//!!!!!!!!!!!!!!!!!!!!!!!!
export function confirmedAddVisionCompleteAction(vision) {
  return {
    type: ADD_NEW_VISION_COMPLETE_CONFIRMED,
    payload: vision,
  };
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!
export function addVisionStrategyTypeByIdLoadingAction(status) {
  return {
    type: ADD_NEW_VISION_TYPE_LOADING,
    payload: status,
  };
}

// Delete Vision strategy by id

export function deleteVisionStrategyByIdAction(projectId, visionStrategyId) {
  return async (dispatch, getState) => {
    dispatch(deleteVisionStrategyByIdLoadingAction(true));

    try {
      await deleteVisionStrategyById(projectId, visionStrategyId);
      dispatch(deleteVisionStrategyByIdLoadingAction(false));
      dispatch(confirmedDeleteVisionStrategyByIdAction(projectId));
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      dispatch(deleteVisionStrategyByIdLoadingAction(false));
    }
  };
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export function addVisionStrategyCompleteAction(projectId, postData) {
  return async (dispatch, getState) => {
    dispatch(addVisionStrategyTypeByIdLoadingAction(true)); // set loading state to true
    await addVisionStrategyComplete(projectId, postData)
      .then((response) => {
        dispatch(addVisionStrategyTypeByIdLoadingAction(false)); // set loading state to false
        dispatch(confirmedAddVisionCompleteAction(response.data));
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export function confirmedDeleteVisionStrategyByIdAction(projectId) {
  return {
    type: DELETE_VISION_BY_ID_CONFIRMED,
    payload: projectId,
  };
}
export function deleteVisionStrategyByIdLoadingAction(status) {
  return {
    type: DELETE_VISION_BY_ID_LOADING,
    payload: status,
  };
}
// GET All ACITIVITY

export function getAllActivityAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_ACTIVITY_LOADING });
    try {
      const response = await getAllActivity(projectId); // Call the service function to fetch activities
      dispatch(getAllActivityConfirmedAction(response.data));
      response.data;
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getAllActivityLoadingAction(info) {
  return {
    type: GET_ALL_ACTIVITY_LOADING,
    payload: info,
  };
}
export function getAllActivityConfirmedAction(
  chiffreAffaireListe,
  montantAnneeListe
) {
  return {
    type: GET_ALL_ACTIVITY_CONFIRMED,
    payload: montantAnneeListe,
    payload: chiffreAffaireListe,
  };
}

// GetValueToMonth;

export function GetValueToMonthAction(
  projectId,
  idChiffreAffaire,
  idMontant,
  idMonthValue
) {
  return async (dispatch) => {
    dispatch({ type: GET_BP_VALUE_TO_MONTH_LOADING });

    try {
      const response = await GetValueToMonth(
        projectId,
        idChiffreAffaire,
        idMontant,
        idMonthValue
      );
      dispatch(GetValueToMonthConfirmedAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}
export function GetValueToMontLoadingAction(info) {
  return {
    type: GET_BP_VALUE_TO_MONTH_LOADING,
    payload: info,
  };
}

export function GetValueToMonthConfirmedAction(
  projectId,
  idChiffreAffaire,
  idMontant,
  idMonthValue
) {
  return {
    type: GET_BP_VALUE_TO_MONTH_CONFIRMED,
    payload: projectId,
    payload: idChiffreAffaire,
    payload: idMontant,
    payload: idMonthValue,
  };
}

//delete activity

export function deleteActivityAction(projectId, idChiffreAffaire) {
  return (dispatch, getState) => {
    deleteActivity(projectId, idChiffreAffaire).then((response) => {
      dispatch(LoadingDeleteActivityAction(true));
      dispatch(confirmedDeleteActivityAction(response.data));
      dispatch(getAllActivityAction(projectId));
      dispatch(LoadingDeleteActivityAction(false));
    });
  };
}
export function confirmedDeleteActivityAction(projectId) {
  return {
    type: DELETE_ACTIVITY_CONFIRMED,
    payload: projectId,
  };
}
export function LoadingDeleteActivityAction(status) {
  return {
    type: DELETE_ACTIVITY_LOADING,
    payload: status,
  };
}

/*** EXTERNAL CHARGES ***/

// ADD NEW EXTERNAL CHARGE

export function addExternalChargeAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addExternalChargeLoadingAction(true));
    return addExternalCharge(projectId, postData)
      .then((response) => {
        dispatch(addExternalChargeLoadingAction(true)); // set loading state to false
        dispatch(confirmedAddExternalChargeAction(response.data));

        dispatch(getAllExternalChargesAction(projectId));
        dispatch(addExternalChargeLoadingAction(false)); // set loading state to false

        return response.data;
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
        throw error;
      });
  };
}
export function confirmedAddExternalChargeAction(charge) {
  return {
    type: ADD_EXTERNAL_CHARGE_CONFIRMED,
    payload: charge,
  };
}
export function addExternalChargeLoadingAction(status) {
  return {
    type: ADD_NEW_EXTERNAL_CHARGE_LOADING,
    payload: status,
  };
}

// UPDATE EXTERNAL CHARGE ACTION

export function updateExternalChargeByIdAction(projectId, idChargeExt, data) {
  return async (dispatch) => {
    try {
      const response = await updateExternalCharge(projectId, idChargeExt, data);
      dispatch(confirmedUpdateExternalChargeByIdInfo(response));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedUpdateExternalChargeByIdInfo(info) {
  return {
    type: UPDATE_EXTERNAL_CHARGE,
    payload: info,
  };
}
// upadate Months Value Action

export function editMonthsValueAction(
  projectId,
  idChiffreAffaire,
  id_Montant,
  MonthsValue_id,
  postData
) {
  return (dispatch, getState) => {
    editMonthsValue(
      projectId,
      idChiffreAffaire,
      id_Montant,
      MonthsValue_id,
      postData
    ).then((response) => {
      dispatch(loadingEditMonthsValueActionAction(true));
      dispatch(confimedEditMonthsValueActionAction(response.data));
      dispatch(getAllActivityAction(projectId));
      dispatch(loadingEditMonthsValueActionAction(false));
    });
  };
}

export function loadingEditMonthsValueActionAction(status) {
  return {
    type: UPDATE_MONTH_VALUE_LOADING,
    payload: status,
  };
}

export function confimedEditMonthsValueActionAction(data) {
  return {
    type: UPDATE_MONTH_VALUE_CONFIRMED,
    payload: data,
  };
}

// GET ALL EXTERNAL CHARGES ACTIONS

export function getAllExternalChargesAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING });

    try {
      const response = await getAllExternalCharge(projectId);
      dispatch(confirmedAllEXternalChargesAction(response.data));
      response.data;
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}
export function getAllEXternalChargesLoadingAction(info) {
  return {
    type: GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING,
    payload: info,
  };
}

export function confirmedAllEXternalChargesAction(ChargeExt, montantAnnee) {
  return {
    type: GET_ALL_EXTERNAL_CHARGES_CONFIRMED,
    payload: ChargeExt,
    montantAnnee,
  };
}

// GET EXTERNAL CHARGE BY ID

export function getOneChareActionAction(projectId, idMontant) {
  return async (dispatch) => {
    dispatch({ type: GET_ONE_CHARGE_LOADING });

    try {
      const response = await getOneYearCharge(projectId, idMontant);
      dispatch(getOneChrageYearConfirmedAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getExternalChargeLoadingAction(info) {
  return {
    type: GET_ONE_CHARGE_LOADING,
    payload: info,
  };
}
export function getOneChrageYearConfirmedAction(oneextranlchargyear) {
  return {
    type: GET_ONE_CHARGE_CONFIRMED,
    payload: oneextranlchargyear,
  };
}
//*/*/*/*/*/*/*/*/*/*/*/

export function getOneSolutionAction(projectId, idSolution, payload) {
  return async (dispatch) => {
    dispatch({ type: GET_ONE_SOLUTION_LOADING });

    try {
      const response = await getOneSolution(projectId, idSolution);
      dispatch(getOneSolutionConfirmedAction(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getOneSolutionLoadingAction(info) {
  return {
    type: GET_ONE_SOLUTION_LOADING,
    payload: info,
  };
}
export function getOneSolutionConfirmedAction(oneSolution) {
  return {
    type: GET_ONE_SOLUTION_CONFIRMED,
    payload: oneSolution,
  };
}

// DELETE EXTERNAL CHARGE ACTION

export function deleteExternalChargeAction(projectId, idChargeExt) {
  return (dispatch, getState) => {
    deleteOneExternalCharge(projectId, idChargeExt).then((response) => {
      dispatch(deleteExternalChargeLoadingAction(true));
      dispatch(confirmedDeleteExternalChargeAction(response.data));
      dispatch(getAllExternalChargesAction(projectId));
      dispatch(deleteExternalChargeLoadingAction(false));
    });
  };
}

export function confirmedDeleteExternalChargeAction(projectId) {
  return {
    type: DELETE_EXTERNAL_CHARGE_BY_ID_CONFIRMED,
    payload: projectId,
  };
}
export function deleteExternalChargeLoadingAction(status) {
  return {
    type: DELETE_EXTERNAL_CHARGE_BY_ID_LOADING,
    payload: status,
  };
}

// DELETE ONE YEAR CHARGE ACTION

export function deleteOneYearExternalChargeAction(projectId, idMontant) {
  return (dispatch, getState) => {
    deleteOneYearExtrnalCharge(projectId, idMontant).then((response) => {
      dispatch(loadingDeleteOneYearExternalChargeAction(true));
      dispatch(confirmedDeleteOneYearExternalChargeAction(response.data));
      dispatch(getAllExternalChargesAction(projectId));
      dispatch(loadingDeleteOneYearExternalChargeAction(false));
    });
  };
}

export function confirmedDeleteOneYearExternalChargeAction(projectId) {
  return {
    type: DELETE_ONE_YEAR_EXTERNAL_CHARGE_CONFIRMED,
    payload: projectId,
  };
}

export function loadingDeleteOneYearExternalChargeAction(status) {
  return {
    type: DELETE_ONE_YEAR_EXTERNAL_CHARGE_LOADING,
    payload: status,
  };
}

export function deleteMontantAnneeAction(projectId, idMontant) {
  return (dispatch, getState) => {
    deleteMontantAnne(projectId, idMontant).then((response) => {
      dispatch(loadingDeleteMontantAnneAction(true));
      dispatch(confirmedDeleteMonatantAnneAction(response.data));
      dispatch(getAllActivityAction(projectId));
      dispatch(loadingDeleteMontantAnneAction(false));
    });
  };
}

export function confirmedDeleteMonatantAnneAction(projectId) {
  return {
    type: DELETE_MONTANT_ANNEE_CONFIRMED,
    payload: projectId,
  };
}
export function loadingDeleteMontantAnneAction(status) {
  return {
    type: DELETE_MONTANT_ANNEE_LOADING,
    payload: status,
  };
}

// ADD MONTANT EXTERNAL CHARGE ACTION

export function addExternalChargeMontantAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addMontantExternalChargeLoadingAction(true)); // set loading state to true
    return addMontantExternalCharge(projectId, postData)
      .then((response) => {
        dispatch(addMontantExternalChargeLoadingAction(true)); // set loading state to false
        dispatch(confirmedAddMontantExternalChargeAction(response.data));
        dispatch(getAllExternalChargesAction(projectId));
        dispatch(addMontantExternalChargeLoadingAction(false)); // set loading state to false
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
}
export function confirmedAddMontantExternalChargeAction(column) {
  return {
    type: ADD_MONTANT_EXTERNAL_CHARGE_CONFIRMED,
    payload: column,
  };
}
export function addMontantExternalChargeLoadingAction(status) {
  return {
    type: ADD_MONTANT_EXTERNAL_CHARGE_LOADING,
    payload: status,
  };
}
// UPDATE MONTANT EXTERNAL CHARGE ACTION

export function updateMontantExternalChargeByIdAction(
  projectId,
  idChargeExt,
  idMontant,
  postData
) {
  return (dispatch, getState) => {
    addMonthExternalChargeValue(
      projectId,
      idChargeExt,
      idMontant,
      postData
    ).then((response) => {
      dispatch(loadingdUpdateMontantExternalCharge(true));
      dispatch(confirmedUpdateMontantExternalCharge(response.data));
      dispatch(getAllExternalChargesAction(projectId));
      dispatch(loadingdUpdateMontantExternalCharge(false));
    });
  };
}

export function confirmedUpdateMontantExternalCharge(valuetomonthes) {
  return {
    type: UPADATE_EXTERNAL_CHARGE_YEAR_CONFIRMED,
    payload: valuetomonthes,
  };
}
export function loadingdUpdateMontantExternalCharge(info) {
  return {
    type: UPADATE_EXTERNAL_CHARGE_YEAR__LOADING,
    payload: info,
  };
}

// updateActivityName action

export function updateActivityNameAction(projectId, idChiffreAffaire) {
  return async (dispatch) => {
    try {
      const response = await updateActivityName(projectId, idChiffreAffaire);
      dispatch(confimedUpdateActivityNameAction(response));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function loadingUpdateActivityNameAction(status) {
  return {
    type: UPDATE_ACTIVITY_NAME_LOADING,
    payload: status,
  };
}

export function confimedUpdateActivityNameAction(projectId) {
  return {
    type: UPDATE_ACTIVITY_NAME_CONFIRMED,
    payload: projectId,
  };
}

export function addMonthsValuesAction(
  projectId,
  idChargeExt,
  idMontant,
  postData
) {
  return (dispatch, getState) => {
    dispatch(loadingdAddMonthsValueAction(true));
    return addMonthExternalChargeValue(
      projectId,
      idChargeExt,
      idMontant,
      postData
    )
      .then((response) => {
        dispatch(loadingdAddMonthsValueAction(true)); // set loading state to false
        dispatch(confirmedAddMonthsValueAction(response.data));
        dispatch(getAllExternalChargesAction(projectId));
        dispatch(loadingdAddMonthsValueAction(false)); // set loading state to false

        return response.data;
      })
      .catch((error) => {
        // Handle error here, e.g. dispatch an error action
        dispatch({ type: "ERROR", payload: error.message });
        throw error;
      });
  };
}
export function confirmedAddMonthsValueAction(monthesValue) {
  return {
    type: ADD_MONTH_VALUE_CONFIRMED,
    payload: monthesValue,
  };
}
export function loadingdAddMonthsValueAction(status) {
  return {
    type: ADD_MONTH_VALUE_LOADING,
    payload: status,
  };
}

// charge social

export function addsocialChargeAction(projectId, postData) {
  return (dispatch, getState) => {
    dispatch(addsocialChargeLoadingAction(true));
    return addSocialCharge(projectId, postData)
      .then((response) => {
        dispatch(addsocialChargeLoadingAction(false));
        dispatch(confirmedAddsocialChargeAction(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
        throw error;
      });
  };
}
export function confirmedAddsocialChargeAction(year) {
  return {
    type: ADD_SOCIAL_CHARGE_CONFIRMED,
    payload: year,
  };
}
export function addsocialChargeLoadingAction(status) {
  return {
    type: ADD_NEW_SOCIAL_CHARGE_LOADING,
    payload: status,
  };
}

export function getAllSocialChargeAction(projectId) {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_SOCIAL_CHARGE_LOADING });
    try {
      const response = await getAllSocialCharge(projectId);

      dispatch(confirmedAllAllSocialChargeAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedAllAllSocialChargeAction(info) {
  return {
    type: GET_ALL_SOCIAL_CHARGE_CONFIRMED_INFORMATION,
    payload: info,
  };
}
export function getAllAllSocialChargeLoadingAction(status) {
  return {
    type: GET_ALL_SOCIAL_CHARGE_LOADING,
    payload: status,
  };
}

//ajout salarié

export function addEmployeeAction(projectId, anneeId, postData) {
  return async (dispatch) => {
    dispatch(addEmployeeLoaderAction(true));
    try {
      const response = await addEmployeeMember(projectId, anneeId, postData);
      dispatch(addEmployeeLoaderAction(false));
      dispatch(confirmedAddEmployeeAction(response.data));
      return response; // Return the response here
    } catch (error) {
      if (error.response.data === "email existe ") {
        dispatch({
          type: "CREATE_ERROR",
          payload: "Cet utilisateur déjà ajouté",
        });
      } else {
        dispatch({
          type: "CREATE_SUCCESS",
          payload: error.response.data,
        });
      }
    }
  };
}

export function addDirigeantAction(projectId, anneeId, postData) {
  return async (dispatch) => {
    try {
      const response = await addDirigeantMember(projectId, anneeId, postData);
      dispatch(confirmedAddDirigeantAction(response.data));
      return response; // Return the response here
    } catch (error) {
      if (error.response.data === "email existe ") {
        dispatch({
          type: "CREATE_ERROR",
          payload: "Cet utilisateur déjà ajouté",
        });
      } else {
        dispatch({
          type: "CREATE_SUCCESS",
          payload: error.response.data,
        });
      }
    }
  };
}

export function addCollabByMailAction(projectId, postData) {
  return async (dispatch) => {
    //dispatch(addEmployeeLoaderAction(true));
    try {
      const response = await addCollabByMail(projectId, postData);
      //dispatch(addEmployeeLoaderAction(false));
      //dispatch(confirmedAddEmployeeAction(response.data));
      return response; // Return the response here
    } catch (error) {
      //dispatch({ type: "CREATE_EMPLOYEE_ERROR", payload: error.message });
      throw error; // Throw the error to handle it in the component if needed
    }
  };
}
export function SendMailAction(projectId, postData) {
  return async (dispatch) => {
    //dispatch(addEmployeeLoaderAction(true));
    try {
      const response = await SendMail(projectId, postData);
      //dispatch(addEmployeeLoaderAction(false));
      //dispatch(confirmedAddEmployeeAction(response.data));
      //getBusinessPlanTeamMembers(projectId);
      //dispatch(getBusinessPlanTeamMembersAction(projectId));
      dispatch(getBusinessPlanTeamMembersAction(projectId));
      return response; // Return the response here
    } catch (error) {
      //dispatch({ type: "CREATE_EMPLOYEE_ERROR", payload: error.message });
      throw error; // Throw the error to handle it in the component if needed
    }
  };
}

export function confirmedAddEmployeeAction(Employee) {
  return {
    type: ADD_BP_EMPLOYEE_CONFIRMED,
    payload: Employee,
  };
}
export function confirmedAddDirigeantAction(Employee) {
  return {
    type: ADD_BP_DIRIGEANT_CONFIRMED,
    payload: Employee,
  };
}

export function addEmployeeLoaderAction(status) {
  return {
    type: BP_ADD_EMPLOYEE_LOADING,
    payload: status,
  };
}

// add salarié
export function addSalarieAction(projectId, idSalaireEtchargeSocial, postData) {
  return (dispatch) => {
    dispatch(addSalarieLoaderAction(true));
    addSalarieMember(projectId, idSalaireEtchargeSocial, postData)
      .then((response) => {
        dispatch(addSalarieLoaderAction(false));
        dispatch(confirmedAddSalarieAction(response.data));
        //dispatch(getAllSocialChargeAction(projectId));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_SALARIE_ERROR", payload: error.message });
      });
  };
}
export function confirmedAddSalarieAction(Salarie) {
  return {
    type: ADD_BP_SALARIE_CONFIRMED,
    payload: Salarie,
  };
}
export function addSalarieLoaderAction(status) {
  return {
    type: BP_ADD_SALARIE_LOADING,
    payload: status,
  };
}

///
export function getEmployeeAction(projectId, anneeId) {
  return async (dispatch) => {
    dispatch(getEmployeeLoadingAction(true));
    try {
      const response = await getEmployee(projectId, anneeId);
      dispatch(getEmployeeLoadingAction(false));
      dispatch(confirmedEmployeeAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function getSocialChargeAction(projectId) {
  return async (dispatch) => {
    try {
      const response = await getAllSocialCharge(projectId);
      dispatch(confirmedSocialChargeAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedSocialChargeAction(status) {
  return {
    type: GET_SOCIAL_CHARGE_CONFIRMED,
    payload: status,
  };
}

export function confirmedEmployeeAction(status) {
  return {
    type: GET_BP_EMPLOYEE_CONFIRMED,
    payload: status,
  };
}
export function getEmployeeLoadingAction(info) {
  return {
    type: GET_BP_EMPLOYEE_LOADING,
    payload: info,
  };
}

export function addEmployeeProjectAction(projectId, anneeId, idCollaborateur) {
  return (dispatch) => {
    dispatch(addEmployeeProjectLoaderAction(true));
    addEmployeeProjectMember(projectId, anneeId, idCollaborateur)
      .then((response) => {
        dispatch(addEmployeeProjectLoaderAction(false));

        dispatch(confirmedAddProjectEmployeeAction(response.data));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_EMPLOYEE _ERROR", payload: error.message });
      });
  };
}
export function confirmedAddProjectEmployeeAction(status) {
  return {
    type: ADD_BP_EMPLOYEE_PROJECT_CONFIRMED,
    payload: status,
  };
}
export function addEmployeeProjectLoaderAction(status) {
  return {
    type: BP_ADD_EMPLOYEE_PROJECT_LOADING,
    payload: status,
  };
}

export function addCollaboratorAction(projectId, payload) {
  return (dispatch) => {
    dispatch(addCollabLoading(true));
    addCollabProjet(projectId, payload)
      .then((response) => {
        dispatch(addCollabLoading(false));
        dispatch(getUsersAction(projectId));
        dispatch(fetchAllMembers(projectId));
      })
      .catch((error) => {
        dispatch({ type: "CREATE_COLLAB _ERROR", payload: error.message });
      });
  };
}
export function confirmedAddCollabAction(status) {
  return {
    type: CONFIRMED_ADD_COLLAB_ACTION,
    payload: status,
  };
}
export function addCollabLoading(status) {
  return {
    type: ADD_COLLAB_LOADING,
    payload: status,
  };
}

export function editHistoireEquipeAction(projectId, idMembre, payload) {
  return (dispatch) => {
    dispatch(loadingeditHistoireEquipeAction(true));

    editHistoireEquipe(projectId, idMembre, payload)
      .then((response) => {
        dispatch(editHistoireEquipeActionconfirmed(response.data));

        dispatch(getBusinessPlanTeamMembersAction(projectId));

        dispatch(loadingeditHistoireEquipeAction(false));
      })
      .catch((error) => {
        console.error("Error editing member:", error);
        dispatch(loadingeditHistoireEquipeAction(false));
      });
  };
}
export function addMemberFromCollaborator(projectId, id) {
  return (dispatch) => {
    dispatch(loadingeditHistoireEquipeAction(true));

    addMemberCollab(projectId, id)
      .then((response) => {
        dispatch(editHistoireEquipeActionconfirmed(response.data));

        dispatch(getBusinessPlanTeamMembersAction(projectId));

        dispatch(loadingeditHistoireEquipeAction(false));
      })
      .catch((error) => {
        console.error("Error editing member:", error);
        dispatch(loadingeditHistoireEquipeAction(false));
      });
  };
}

export function getAllMembers(projectId) {
  return async (dispatch) => {
    dispatch({ type: GET_BUSINESS_PLAN_MEMBERS_LOADING });
    try {
      const response = await fetchAllMembers(projectId);

      // dispatch(confirmedAllAllSocialChargeAction(response.data));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function ajouterNewMember(projectId, payload) {
  return (dispatch) => {
    dispatch(loadingitHistoireEquipeMmember(true));

    addNewMember(projectId, payload)
      .then((response) => {
        dispatch(histoireEquipeMemberActionconfirmed(response.data));

        dispatch(getBusinessPlanTeamMembersAction(projectId));

        dispatch(loadingitHistoireEquipeMmember(false));
      })
      .catch((error) => {
        console.error("Error editing member:", error);
        dispatch(loadingitHistoireEquipeMmember(false));
      });
  };
}

export function histoireEquipeMemberActionconfirmed(allMembers) {
  return {
    type: HISTOIRE_EQUIPE_MEMBER_CONFIRMED,
    payload: allMembers,
  };
}

export function editHistoireEquipeActionconfirmed(allMembers) {
  return {
    type: EDIT_HISTOIRE_EQUIPE_CONFIRMED,
    payload: allMembers,
  };
}

export function loadingitHistoireEquipeMmember(info) {
  return {
    type: HISTOIRE_EQUIPE_NEW_MEMBER_LOADING,
    payload: info,
  };
}

export function loadingeditHistoireEquipeAction(info) {
  return {
    type: EDIT_HISTOIRE_EQUIPE_LOADING,
    payload: info,
  };
}

export function updateSocietyInfo(projectId, idSociete, payload) {
  return async (dispatch) => {
    try {
      const response = await updateSociety(projectId, idSociete, payload);
      dispatch(confirmedUpdateSocietyInfo(response));
    } catch (error) {
      const errorMessage = "An unknown error occurred. Please try again later.";
      return errorMessage;
    }
  };
}

export function confirmedUpdateSocietyInfo(info) {
  return {
    type: UPDATE_SOCIETY,
    payload: info,
  };
}

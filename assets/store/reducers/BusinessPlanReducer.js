import {
  UPDATE_BP_HISTORY_INFORMATION,
  GET_BP_HISTORY_INFORMATION,
  BP_HISTORY_INFORMATION_LOADING,
  GET_BP_CONCURRENCE_INFORMATION,
  BP_CONCURRENCE_INFORMATION_LOADING,
  UPDATE_BP_TEAM_MEMBERS,
  DELETE_BP_TEAM_MEMBERS,
  ADD_BP_TEAM_MEMBERS,
  ADD_BP_SOCIETY,
  GET_BP_TEAM_MEMBERS,
  BP_HISTORY_TEAM_LOADING,
  BP_ADD_TEAM_LOADING,
  BP_ADD_SOCIETY_LOADING,
  GET_BP_ALL_SOCIETIES,
  BP_SOCIETIES_LOADING,
  ADD_BP_SOCIETY_CONFIRMED,
  ADD_BP_TEAM_MEMBERS_CONFIRMED,
  DELETE_SOLUTION_BY_ID_CONFIRMED,
  ADD_SOLUTION_REVENU_CONFIRMED,
  ADD_NEW_SOLUTION_CONFIRMED,
  GET_ALL_SOLUTIONS_INFORMATION_CONFIRMED,
  GET_ALL_SOLUTIONS_LOADING,
  ADD_NEW_SOLUTION_LOADING,
  ADD_NEW_SOLUTION_REVENU_LOADING,
  GET_BP_ALL_POSITIONING,
  BP_POSITIONING_LOADING,
  ADD_BP_POSITIONING,
  ADD_BP_POSITIONING_CONFIRMED,
  GET_ALL_VISION_INFORMATION,
  GET_ALL_VISIONS_INFORMATION_CONFIRMED,
  ADD_NEW_VISION,
  ADD_NEW_VISION_CONFIRMED,
  ADD_BP_CONCURRENCE_POSITIONING_CONFIRMED,
  BP_ADD_CONCURRENCE_POSITIONING_LOADING,
  ADD_NEW_VISION_LOADING,
  GET_VISION_BY_ID_INFORMATION,
  GET_VISION_BY_ID_INFORMATION_CONFIRMED,
  DELETE_VISION_BY_ID,
  DELETE_BP_POSITIONING,
  ADD_BP_ACTIVITY_CONFIRMED,
  BP_ADD_ACTIVITY_LOADING,
  ADD_BP_ACTIVITY,
  BP_MONTANT_ADD_LOADING,
  BP_MONTANT_ADD_CONFIRMED,
  ADD_BP_MONTANT,
  GET_ALL_BP_ACTIVITY,
  GET_ALL_ACTIVITY_LOADING,
  GET_ALL_ACTIVITY_CONFIRMED,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_LOADING,
  CREATE_CONCURRENT_COLOMN_ACTION,
  GET_BP_ALL_COLOMNS,
  BP_COLOMNS_LOADING,
  SELECT_VISION,
  GET_ALL_YEARS_SOLUTION,
  ADD_NEW_YEAR_SOLUTION_LOADING,
  ADD_NEW_YEAR_SOLUTION,
  GET_YEAR_BY_ID_SOLUTION,
  GET_YEAR_BY_ID_SOLUTION_LOADING,
  GET_ALL_YEARS_SOLUTION_LOADING,
  GET_BP_ALL_POSITIONING_LOADING,
  GET_SOCIETIES_LOADING,
  ADD_SOCIAL_CHARGE,
  ADD_NEW_SOCIAL_CHARGE_LOADING,
  ADD_SOCIAL_CHARGE_CONFIRMED,
  ADD_BP_MONTANT_ANNEE,
  ADD_BP_MONTANT_ANNEE_CONFIRMED,
  ADD_BP_MONTANT_ANNEE_LOADING,
  ADD_BP_MONTANT_TO_MONTH,
  ADD_BP_MONTANT_TO_MONTH_LOADING,
  ADD_BP_MONTANT_TO_MONTH_CONFIRMED,
  DELETE_MONTANT_ANNEE,
  GET_ALL_SOCIAL_CHARGE_LOADING,
  GET_ALL_SOCIAL_CHARGE_CONFIRMED_INFORMATION,
  GET_BP_VALUE_TO_MONTH,
  GET_BP_VALUE_TO_MONTH_LOADING,
  GET_BP_VALUE_TO_MONTH_CONFIRMED,
  UPDATE_ACTIVITY_NAME,
  UPDATE_ACTIVITY_NAME_LOADING,
  UPDATE_ACTIVITY_NAME_CONFIRMED,
  BP_ADD_EMPLOYEE_LOADING,
  ADD_BP_EMPLOYEE,
  ADD_BP_EMPLOYEE_CONFIRMED,
  GET_ALL_BP_EMPLOYEE,
  GET_BP_EMPLOYEE_CONFIRMED,
  GET_BP_EMPLOYEE_LOADING,
  ADD_SALARIE,
  BP_ADD_SALARIE_LOADING,
  ADD_BP_SALARIE_CONFIRMED,
  BP_ADD_EMPLOYEE_PROJECT_LOADING,
  ADD_BP_EMPLOYEE_PROJECT_CONFIRMED,
  ADD_EXTERNAL_CHARGE,
  ADD_EXTERNAL_CHARGE_CONFIRMED,
  ADD_NEW_EXTERNAL_CHARGE_LOADING,
  GET_ALL_EXTERNAL_CHARGES,
  GET_ALL_EXTERNAL_CHARGES_CONFIRMED,
  GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING,
  ADD_MONTANT_EXTERNAL_CHARGE,
  ADD_MONTANT_EXTERNAL_CHARGE_CONFIRMED,
  ADD_MONTANT_EXTERNAL_CHARGE_LOADING,
  ADD_MONTH_VALUE,
  ADD_MONTH_VALUE_CONFIRMED,
  ADD_MONTH_VALUE_LOADING,
  UPADATE_EXTERNAL_CHARGE_YEAR,
  UPADATE_EXTERNAL_CHARGE_YEAR_CONFIRMED,
  UPADATE_EXTERNAL_CHARGE_YEAR__LOADING,
  GET_ONE_CHARGE,
  GET_ONE_CHARGE_CONFIRMED,
  GET_ONE_CHARGE_LOADING,
  CONFIRMED_ADD_COLLAB_ACTION,
  ADD_COLLAB_LOADING,
  EDIT_HISTOIRE_EQUIPE,
  EDIT_HISTOIRE_EQUIPE_CONFIRMED,
  HISTOIRE_EQUIPE_MEMBER_CONFIRMED,
  EDIT_HISTOIRE_EQUIPE_LOADING,
  UPDATE_SOCIETY,
  DELETE_VISION,
  DELETE_VISION_BY_ID_CONFIRMED,
  DELETE_VISION_BY_ID_LOADING,
  GET_ONE_SOLUTION,
  GET_ONE_SOLUTION_CONFIRMED,
  GET_ONE_SOLUTION_LOADING,
  ADD_NEW_VISION_COMPLETE_CONFIRMED,
  HISTOIRE_EQUIPE_NEW_MEMBER_LOADING,
  HISTOIRE_EQUIPE_LOADING,
  GET_BUSINESS_PLAN_MEMBERS_LOADING,
  GET_BP_COLLABORATEURS,
  ADD_BP_DIRIGEANT_CONFIRMED,
  CLEAR_ERR,
} from "../actions/BusinessPlanActions";

const initialState = {
  err: "",
  param: "",
  historyInfo: null,
  concurrenceInfo: {},
  isLoading: false,
  updateMessage: "",
  members: [],
  members_collab: [],
  volume: [],
  colomns: [],
  societies: [],
  positioning: [],
  updateSocietyMessage: "",
  isGetSocietyLoading: false,
  isGetPositioningLoading: false,
  isGetEmployeeLoading: false,
  isGetColomnLoading: false,
  memberAddedMessage: "",
  updateMemberMessage: "",
  updatePositioningMessage: "",
  updateColomnMessage: "",
  isGetMemberLoading: false,
  getMemberLoading: false,

  addMemberLoading: false,
  addPositionigLoading: false,
  addColomnLoading: false,
  deletePositioningLoading: false,
  addSocietyLoading: false,
  addYearLoading: false,
  addEmployeeLoading: false,
  addEmployeeProjectLoading: false,
  addSalarieLoading: false,

  getSocietiesLoading: false,
  addActivityLoading: false,
  solutions: [],
  addSolutionsMessage: "",
  addVolumeMessage: "",

  yearsSolution: [],
  year: {},
  getSolutionsLoading: "",
  deleteSolutionsMessage: "",
  deletePositioningMessage: "",
  addSolutionLoading: false,
  addSolutionRevenuLoading: false,

  getAllYearsLoading: false,
  getYearLoading: false,
  employee: [],
  dirigeant: [],
  employeeProject: [],
  salarie: [],
  visions: [],
  vision: null,
  activities: [],
  addVisionMessage: "",
  getVisionsLoading: "",
  getVisionByIdLoading: "",
  addVisionLoading: "",
  addVolumeLoading: "",
  deleteVisionLoading: "",
  getVisionByIdLoading: "",
  montants: [],
  year: [],
  getEmployee: [],
  getEmployeeLoading: false,
  getAllActivity: [],
  deleteActivity: "",
  getAllActivityLoading: false,

  selectedVision: {},
  externalCharge: [],

  externalChargeloading: false,
  externalChargeconfirmed: "",

  externalChargeAnnee: [],

  externalChargeAnneeloading: false,
  externalChargeAnneeconfirmed: "",

  getAllExternalCharges: [],
  getAllExternalChargesloading: false,

  montantannee: [],
  sal: [],
  addMontantAnneeLoader: false,
  confirmedMontantAnnee: "",
  valuetomonths: [],
  addValueToMonthLoaderAction: false,
  addValueToMonthConfirmedAction: "",

  deleteMontantAnne: "",
  MonthsValue: [],
  getMonthsValuLoading: "",
  editMonthsValue: "",

  monthesValue: [],
  valueToMonthsConfirmed: "",
  valueToMonthsLoading: false,

  oneextranlchargyear: [],
  getOneYearextarnalChargeLoading: false,

  oneSolution: [],
  getOneSolutionLoading: false,
  getOneSolutionConfirmed: "",

  allMembers: [],
  editHistoireEquipeconfirmed: "",
  loadingeditHistoireEquipe: false,
  loadeditHistoireEquipe: false,

  deleteVisionStrategyByIdLoading: false,
  deletedVision: {},
};

export default function BusinessPlanReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EXTERNAL_CHARGES:
      return {
        ...state,
        getAllExternalCharges: action.payload,
        err: "",
      };
    case GET_ALL_EXTERNAL_CHARGES_CONFIRMED:
      return {
        ...state,
        getAllExternalChargesloading: false,
        getAllExternalCharges: action.payload,
        montantAnnee: action.montantAnnee,
        err: "",
      };
    case GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING:
      return {
        ...state,
        getAllExternalChargesloading: true,
        err: "",
      };

    ///////////

    case GET_ONE_CHARGE:
      return {
        ...state,
        oneextranlchargyear: action.payload,
      };
    case GET_ONE_CHARGE_CONFIRMED:
      return {
        ...state,
        err: "",

        getOneYearextarnalChargeLoading: false,
        oneextranlchargyear: action.payload,
        montantAnnee: action.montantAnnee,
        err: "",
      };

    case GET_ONE_CHARGE_LOADING:
      return {
        ...state,
        getOneYearextarnalChargeLoading: true,
        err: "",
      };
    //////////////

    case GET_ONE_SOLUTION:
      return {
        ...state,
        oneSolution: action.payload,
        err: "",
      };

    case GET_ONE_SOLUTION_CONFIRMED:
      return {
        ...state,

        getOneSolutionLoading: false,
        oneSolution: action.payload,
        err: "",
      };

    case GET_ONE_SOLUTION_LOADING:
      return {
        ...state,
        getOneSolutionLoading: true,
        err: "",
      };

    ////////////////////
    case GET_BP_EMPLOYEE_CONFIRMED:
      return {
        ...state,
        getEmployeeLoading: false,
        getEmployee: action.payload,
        err: "",
      };
    case GET_BP_EMPLOYEE_LOADING:
      return {
        ...state,
        getEmployeeLoading: false,
        err: "",
      };

    ///
    case BP_ADD_EMPLOYEE_PROJECT_LOADING:
      return {
        ...state,
        addEmployeeProjectLoading: action.payload,
        err: "",
      };
    case ADD_BP_EMPLOYEE_PROJECT_CONFIRMED:
      return {
        ...state,
        employeeProject: [...state.employeeProject, action.payload],

        addEmployeeProjectLoading: false,
        err: "",
      };

    //
    case ADD_BP_DIRIGEANT_CONFIRMED:
      return {
        ...state,
        dirigeant: [...state.dirigeant, action.payload],
        addEmployeeLoading: false,
        err: "",
      };
    case BP_ADD_EMPLOYEE_LOADING:
      return {
        ...state,
        addEmployeeLoading: action.payload,
        err: "",
      };
    case ADD_BP_EMPLOYEE_CONFIRMED:
      return {
        ...state,
        employee: [...state.employee, action.payload],
        addEmployeeLoading: false,
        err: "",
      };
    case "CREATE_ERROR":
      return {
        ...state,
        err: action.payload,
      };
    case "CREATE_SUCCESS":
      return {
        ...state,
        idProjet: action.payload,
        err: "",
      };

    case CLEAR_ERR:
      return {
        ...state,
        err: "",
      };
    // case "CREATE_ERROR_DIRIGEANT":
    //   return {
    //     ...state,
    //     err: action.payload,
    //   };
    // case "CREATE_SUCCESS_DIRIGEANT":
    //   return {
    //     ...state,
    //     idProjet: action.payload,
    //   };
    ///

    case BP_ADD_SALARIE_LOADING:
      return {
        ...state,
        addSalarieLoading: false,
        err: "",
      };
    case ADD_BP_SALARIE_CONFIRMED:
      return {
        ...state,
        addSalarieLoading: false,
        sal: [...state.sal, action.payload],
        err: "",
      };
    //
    case ADD_COLLAB_LOADING:
      return {
        ...state,
        addMemberLoading: false,
        err: "",
      };
    case CONFIRMED_ADD_COLLAB_ACTION:
      return {
        ...state,
        members: action.payload,
        updateMemberMessage: "Membre mis à jours.",
        err: "",
      };
    ///
    case GET_BP_VALUE_TO_MONTH:
      return {
        ...state,
        GetValueToMonth: action.payload,
        err: "",
      };
    case GET_BP_VALUE_TO_MONTH_CONFIRMED:
      return {
        ...state,
        getMonthsValuLoading: false,
        GetValueToMonth: action.payload,
        err: "",
      };
    case GET_BP_VALUE_TO_MONTH_LOADING:
      return {
        ...state,
        getMonthsValuLoading: true,
        err: "",
      };

    // delete Montanat anne
    case DELETE_MONTANT_ANNEE:
      return {
        ...state,
        montantannee: [...state.montantannee, action.payload],
        deleteMontantAnne: "anne supprimée.",
        err: "",
      };

    //// delete activity
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
        deleteActivity: "delte activity ",
        err: "",
      };
    case DELETE_ACTIVITY_LOADING:
      return {
        ...state,
        deleteActivityConfirmed: true,
        deleteActivity: action.payload,
        err: "",
      };

    ///EDIT ACTIVITY NAME

    case UPDATE_ACTIVITY_NAME:
      return {
        ...state,
        activities: [...state.activities, action.payload],
        editActivityName: "edit  activity ",
        err: "",
      };

    /////////////////////////

    case UPDATE_BP_HISTORY_INFORMATION:
      return {
        ...state,
        updateMessage: "Champ mis à jour!",
        err: "",
      };

    case GET_BP_HISTORY_INFORMATION:
      return {
        ...state,
        historyInfo: action.payload,
        isLoading: false,
        updateMessage: "Champ mis à jour!",
        err: "",
      };

    case BP_HISTORY_INFORMATION_LOADING:
      return {
        ...state,
        isLoading: true,
        err: "",
      };
    case BP_HISTORY_TEAM_LOADING:
      return {
        ...state,
        isGetMemberLoading: true,
        err: "",
      };
    case GET_BP_COLLABORATEURS:
      return {
        ...state,
        members_collab: action.payload,
        err: "",
      };
    case GET_BP_TEAM_MEMBERS:
      return {
        ...state,
        members: action.payload,
        updateMemberMessage: "",
        isGetMemberLoading: false,
        err: "",
      };
    case GET_BP_CONCURRENCE_INFORMATION:
      return {
        ...state,
        concurrenceInfo: action.payload,
        isLoading: false,
        updateMessage: "Champ mis à jour!",
        err: "",
      };
    case BP_CONCURRENCE_INFORMATION_LOADING:
      return {
        ...state,
        isLoading: true,
        err: "",
      };

    case DELETE_BP_TEAM_MEMBERS:
      return {
        ...state,
        members: action.payload,
        err: "",
      };
    case UPDATE_BP_TEAM_MEMBERS:
      return {
        ...state,
        members: action.payload,
        updateMemberMessage: "Membre mis à jours.",
        err: "",
      };
    case GET_SOCIETIES_LOADING:
      return {
        ...state,
        isGetSocietyLoading: true,
        err: "",
      };
    case GET_BP_ALL_SOCIETIES:
      return {
        ...state,
        societies: action.payload,
        updateSocietyMessage: "",
        isGetSocietyLoading: false,
        err: "",
      };

    case ADD_BP_SOCIETY:
      return {
        ...state,
        societies: [...state.societies, action.payload],
        addSocietyLoading: false,
        err: "",
      };
    case ADD_BP_SOCIETY_CONFIRMED:
      return {
        ...state,
        addSocietyLoading: false,
        err: "",
      };
    case BP_SOCIETIES_LOADING:
      return {
        ...state,
        addSocietyLoading: action.payload,
        err: "",
      };

    case GET_ALL_YEARS_SOLUTION:
      return {
        ...state,
        yearsSolution: action.payload,
        getAllYearsLoading: false,
        err: "",
      };
    case GET_ALL_YEARS_SOLUTION_LOADING:
      return {
        ...state,
        getAllYearsLoading: action.payload,
        err: "",
      };
    case ADD_NEW_YEAR_SOLUTION:
      return {
        ...state,
        yearsSolution: [...state.yearsSolution, action.payload],
        addYearLoading: false,
        err: "",
      };

    case ADD_NEW_YEAR_SOLUTION_LOADING:
      return {
        ...state,
        addYearLoading: action.payload,
        err: "",
      };
    case GET_YEAR_BY_ID_SOLUTION:
      return {
        ...state,
        year: action.payload,
        getYearLoading: false,
        err: "",
      };
    case GET_YEAR_BY_ID_SOLUTION_LOADING:
      return {
        ...state,
        getYearLoading: action.payload,
        err: "",
      };
    case GET_ALL_SOLUTIONS_INFORMATION_CONFIRMED:
      return {
        ...state,
        solutions: action.payload,
        addSolutionsMessage: "",
        deleteSolutionsMessage: "",
        getSolutionsLoading: false,
        err: "",
      };
    case GET_ALL_SOLUTIONS_LOADING:
      return {
        ...state,
        getSolutionsLoading: true,
        err: "",
      };
    case ADD_NEW_SOLUTION_CONFIRMED:
      return {
        ...state,
        solutions: [...state.solutions, action.payload],
        addSolutionsMessage: "",
        getSolutionsLoading: false,
        addSolutionLoading: false,
        err: "",
      };

    case ADD_SOLUTION_REVENU_CONFIRMED:
      return {
        ...state,
        solutions: [...state.solutions, action.payload],
        addSolutionsMessage: "Solution ajoutée.",
        addSolutionRevenuLoading: false,
        err: "",
      };
    case DELETE_SOLUTION_BY_ID_CONFIRMED:
      return {
        ...state,
        solutions: action.payload,
        deleteSolutionsMessage: "Solution supprimée.",
        err: "",
      };
    case ADD_NEW_SOLUTION_LOADING:
      return {
        ...state,
        addSolutionLoading: true,
        err: "",
      };
    case ADD_NEW_SOLUTION_REVENU_LOADING:
      return {
        ...state,
        addSolutionRevenuLoading: true,
        err: "",
      };
    case BP_ADD_SOCIETY_LOADING:
      return {
        ...state,
        addPositioningLoading: action.payload,
        err: "",
      };
    case ADD_BP_POSITIONING:
      return {
        ...state,
        positioning: [...state.positioning, action.payload],
        addPositioningLoading: false,
        err: "",
      };
    case ADD_BP_POSITIONING_CONFIRMED:
      return {
        ...state,
        addPositioningLoading: false,
        err: "",
      };

    case BP_POSITIONING_LOADING:
      return {
        ...state,
        addPositionigLoading: action.payload,
        err: "",
      };
    case GET_BP_ALL_POSITIONING:
      return {
        ...state,
        positioning: action.payload,
        updatePositioningMessage: "",
      };
    case GET_BP_ALL_POSITIONING_LOADING:
      return {
        ...state,
        isGetPositioningLoading: action.payload,
      };
    case DELETE_BP_POSITIONING:
      return {
        ...state,
        positioning: action.payload,
        deletePositioningMessage: "Besoin supprimé.",
      };
    case BP_ADD_CONCURRENCE_POSITIONING_LOADING:
      return {
        ...state,
        addVolumeLoading: action.payload,
      };
    case CREATE_CONCURRENT_COLOMN_ACTION:
      return {
        ...state,
        colomns: actions.payload,
      };
    case ADD_BP_CONCURRENCE_POSITIONING_CONFIRMED:
      return {
        ...state,
        volume: [...state.volume, action.payload],
        addVolumeMessage: "",
        addVolumeLoading: action.payload,
      };
    case BP_COLOMNS_LOADING:
      return {
        ...state,
        addColomnLoading: action.payload,
      };
    case GET_BP_ALL_COLOMNS:
      return {
        ...state,
        colomns: action.payload,
        updateColomnMessage: "",
        isGetColomnLoading: false,
      };
    // VISIONSSS ***

    case GET_ALL_VISION_INFORMATION:
      return {
        ...state,
        visions: action.payload,
        // updateSocietyMessage: "",
        getVisionsLoading: false,
      };
    case GET_ALL_VISIONS_INFORMATION_CONFIRMED:
      return {
        ...state,
        visions: action.payload,
        addVisionMessage: "",
        deleteVisionLoading: "",
        getVisionsLoading: false,
      };
    case ADD_NEW_VISION:
      return {
        ...state,
        visions: [...state.visions, action.payload],
        addVisionLoading: false,
      };
    case SELECT_VISION:
      return {
        ...state,
        selectedVision: action.payload,
        // addVisionLoading: false,
      };
    case ADD_NEW_VISION_CONFIRMED:
      return {
        ...state,
        addVisionLoading: false,
      };
    case ADD_NEW_VISION_LOADING:
      return {
        ...state,
        addVisionLoading: action.payload,
      };

    case SELECT_VISION:
      return {
        ...state,
        selectedVision: action.payload,
        // addVisionLoading: false,
      };
    case ADD_NEW_VISION_CONFIRMED:
      return {
        ...state,
        addVisionLoading: false,
      };
    case ADD_NEW_VISION_LOADING:
      return {
        ...state,
        addVisionLoading: action.payload,
      };
    //*/*/*/*/*/*/*/*/*/*/*/*/

    case DELETE_VISION:
      return {
        ...state,
        deletedVision: action.payload,
        // addVisionLoading: false,
      };
    case DELETE_VISION_BY_ID_CONFIRMED:
      return {
        ...state,
        deleteVisionStrategyByIdLoading: false,
      };
    case DELETE_VISION_BY_ID_LOADING:
      return {
        ...state,
        deleteVisionStrategyByIdLoading: action.payload,
      };

    //+++++++++++++++

    case GET_ALL_SOLUTIONS_LOADING:
      return {
        ...state,
        getSolutionsLoading: true,
      };
    case GET_VISION_BY_ID_INFORMATION:
      return {
        ...state,
        solutions: [...state.solutions, action.payload],
        addSolutionsMessage: "",
        getSolutionsLoading: false,
      };
    case GET_VISION_BY_ID_INFORMATION:
      return {
        ...state,
        vision: action.payload,
        addVisionMessage: "",
        deleteVisionLoading: "",
        getVisionByIdLoading: false,
      };
    case GET_VISION_BY_ID_INFORMATION_CONFIRMED:
      return {
        ...state,
        vision: action.payload,
        addVisionMessage: "",
        deleteVisionLoading: "",
        getVisionByIdLoading: false,
      };
    case ADD_NEW_VISION_COMPLETE_CONFIRMED:
      return {
        ...state,
        vision: action.payload,
        addVisionMessage: "",
        deleteVisionLoading: "",
        getVisionByIdLoading: false,
      };
    case DELETE_VISION_BY_ID:
      return {
        ...state,
        visions: action.payload,
        deleteSolutionsMessage: "Vignette supprimée.",
      };

    ////
    case GET_ALL_BP_ACTIVITY:
      return {
        ...state,
        getAllActivity: action.payload,
      };
    case GET_ALL_ACTIVITY_CONFIRMED:
      return {
        ...state,
        getAllActivityLoading: false,
        getAllActivity: action.payload,
      };
    case GET_ALL_ACTIVITY_LOADING:
      return {
        ...state,
        getAllActivityLoading: true,
      };

    ///////////get all external charges
    case GET_ALL_EXTERNAL_CHARGES:
      return {
        ...state,
        getAllExternalCharges: action.payload,
      };
    case GET_ALL_EXTERNAL_CHARGES_CONFIRMED:
      return {
        ...state,
        getAllExternalChargesloading: false,
        getAllExternalCharges: action.payload,
      };
    case GET_EXTERNAL_CHARGE_BY_ID_INFORMATION_LOADING:
      return {
        ...state,
        getAllExternalChargesloading: true,
      };
    //////////////////////////////////////////////////////////////

    ////addActivities

    case ADD_BP_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
        addMontantAnneeLoader: false,
      };
    case ADD_BP_ACTIVITY_CONFIRMED:
      return {
        ...state,
        addActivityLoading: false,
      };
    case BP_ADD_ACTIVITY_LOADING:
      return {
        ...state,
        addMontantAnneeLoader: action.payload,
      };

    //addMontantAnnee

    case ADD_BP_MONTANT_ANNEE:
      return {
        ...state,
        montantannee: [...state.montantannee, action.payload],
        addSocietyLoading: false,
        err: "",
      };
    case ADD_BP_MONTANT_ANNEE_CONFIRMED:
      return {
        ...state,
        confirmedMontantAnnee: false,
        err: "",
      };
    case ADD_BP_MONTANT_ANNEE_LOADING:
      return {
        ...state,
        addActivityLoading: action.payload,
        err: "",
      };

    //addMontant

    case ADD_BP_MONTANT_TO_MONTH:
      return {
        ...state,
        valuetomonths: [...state.valuetomonths, action.payload],
        addValueToMonthLoaderAction: false,
        err: "",
      };

    case ADD_BP_MONTANT_TO_MONTH_CONFIRMED:
      return {
        ...state,
        addValueToMonthConfirmedAction: false,
        err: "",
      };
    case ADD_BP_MONTANT_TO_MONTH_LOADING:
      return {
        ...state,
        addValueToMonthLoaderAction: action.payload,
        err: "",
      };

    ///////

    // External charges

    case ADD_EXTERNAL_CHARGE:
      return {
        ...state,
        externalCharge: [...state.externalCharge, action.payload],
        externalChargeloading: false,
      };

    case ADD_EXTERNAL_CHARGE_CONFIRMED:
      return {
        ...state,
        externalChargeloading: false,
      };
    case ADD_NEW_EXTERNAL_CHARGE_LOADING:
      return {
        ...state,
        externalChargeloading: action.payload,
      };

    ///////////////////// ANNEE

    case ADD_MONTANT_EXTERNAL_CHARGE:
      return {
        ...state,
        externalChargeAnnee: [...state.externalChargeAnnee, action.payload],
        externalChargeAnneeloading: false,
      };

    case ADD_MONTANT_EXTERNAL_CHARGE_CONFIRMED:
      return {
        ...state,
        externalChargeAnneeloading: false,
      };
    case ADD_MONTANT_EXTERNAL_CHARGE_LOADING:
      return {
        ...state,
        externalChargeAnneeloading: action.payload,
      };

    /////  monthesValue

    case UPADATE_EXTERNAL_CHARGE_YEAR:
      return {
        ...state,
        monthesValue: [...state.monthesValue, action.payload],
        valueToMonthsLoading: false,
      };

    case UPADATE_EXTERNAL_CHARGE_YEAR_CONFIRMED:
      return {
        ...state,
        valueToMonthsLoading: false,
      };
    case UPADATE_EXTERNAL_CHARGE_YEAR__LOADING:
      return {
        ...state,
        valueToMonthsLoading: action.payload,
      };
    ////////////////////////////

    case EDIT_HISTOIRE_EQUIPE:
      return {
        ...state,
        allMembers: [...state.allMembers, action.payload],
        loadingeditHistoireEquipe: false,
        err: "",
      };

    case EDIT_HISTOIRE_EQUIPE_CONFIRMED:
      return {
        ...state,
        loadingeditHistoireEquipe: false,
        err: "",
      };
    case EDIT_HISTOIRE_EQUIPE_LOADING:
      return {
        ...state,
        loadingeditHistoireEquipe: action.payload,
        err: "",
      };

    case HISTOIRE_EQUIPE_MEMBER_CONFIRMED:
      return {
        ...state,
        loadingeditHistoireEquipe: false,
        err: "",
      };
    ///////////

    case HISTOIRE_EQUIPE_NEW_MEMBER_LOADING:
      return {
        ...state,
        loadingeditHistoireEquipe: false,
        err: "",
      };
    case HISTOIRE_EQUIPE_LOADING:
      return {
        ...state,
        loadingeditHistoireEquipe: action.payload,
        err: "",
      };

    case GET_BUSINESS_PLAN_MEMBERS_LOADING:
      return {
        ...state,
        loadingeditHistoireEquipe: action.payload,
        err: "",
      };

    ///////

    case HISTOIRE_EQUIPE_NEW_MEMBER_LOADING:
      return {
        ...state,
        loadeditHistoireEquipe: action.payload,
        err: "",
      };

    ///

    case GET_ALL_VISIONS_INFORMATION_CONFIRMED:
      return {
        ...state,
        visions: action.payload,
        addVisionMessage: "",
        deleteVisionLoading: "",
        getVisionsLoading: false,
      };
    case ADD_NEW_VISION:
      return {
        ...state,
        visions: [...state.visions, action.payload],
        addVisionLoading: false,
      };
    case GET_ALL_SOCIAL_CHARGE_LOADING:
      return {
        ...state,
        socialChargeLoader: false,
        err: "",
      };
    // case GET_ALL_SOCIAL_CHARGE_CONFIRMED_INFORMATION:
    //   return {
    //     ...state,
    //     socialCharges: action.payload,
    //     socialChargeLoader: false,
    //   };

    case ADD_SOCIAL_CHARGE:
      return {
        ...state,
        year: [...state.year, action.payload],
        addYearLoading: false,
        err: "",
      };
    case ADD_NEW_SOCIAL_CHARGE_LOADING:
      return {
        ...state,
        addYearConfirmed: false,
        err: "",
      };
    case ADD_SOCIAL_CHARGE_CONFIRMED:
      return {
        ...state,
        addYearLoading: action.payload,
        err: "",
      };

    case ADD_SALARIE:
      return {
        ...state,
        salarie: [...state.salarie, action.payload],
        addSalarieLoading: false,
        err: "",
      };

    ///
    case UPDATE_SOCIETY:
      return {
        ...state,
        societies: [...state.societies, action.payload],
        err: "",
      };

    default:
      return state;
  }
}

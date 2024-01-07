const FETCH_TRES_ANNEES_SUCCESS = "FETCH_TRES_ANNEES_SUCCESS";
const FETCH_TRES_ANNEES_FAILURE = "FETCH_TRES_ANNEES_FAILURE";

const FETCH_DATA_PER_YEAR_SUCCESS = "FETCH_DATA_PER_YEAR_SUCCESS";
const FETCH_DATA_PER_YEAR_FAILURE = "FETCH_DATA_PER_YEAR_FAILURE";

const EDIT_TRES_DATA_PER_YEAR_SUCCESS = "EDIT_TRES_DATA_PER_YEAR_SUCCESS";
const EDIT_TRES_DATA_PER_YEAR_FAILURE = "EDIT_TRES_DATA_PER_YEAR_FAILURE";

const FETCH_BILAN_PER_YEAR_SUCCESS = "FETCH_BILAN_PER_YEAR_SUCCESS";
const FETCH_BILAN_PER_YEAR_FAILURE = "FETCH_BILAN_PER_YEAR_FAILURE";

const EDIT_BILAN_PER_YEAR_SUCCESS = "EDIT_BILAN_PER_YEAR_SUCCESS";
const EDIT_BILAN_PER_YEAR_FAILURE = "EDIT_BILAN_PER_YEAR_FAILURE";

const FETCH_RESULTAT_SUCCESS = "FETCH_RESULTAT_SUCCESS";
const FETCH_RESULTAT_FAILURE = "FETCH_RESULTAT_FAILURE";

const FETCH_PLAN_SUCCESS = "FETCH_PLAN_SUCCESS";
const FETCH_PLAN_FAILURE = "FETCH_PLAN_FAILURE";

const FETCH_PDF_SUCCESS = "FETCH_PDF_SUCCESS";
const FETCH_PDF_FAILURE = "FETCH_PDF_FAILURE";

const EDIT_PLAN_SUCCESS = "EDIT_PLAN_SUCCESS";
const EDIT_PLAN_FAILURE = "EDIT_PLAN_FAILURE";

const initialState = {
  TresAnnees: [],
  TresData: {},
  BilanData: {},
  ResultatData: {},
  PlanData: {},
  pdfData: {},
};

const TableauxFinancierReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRES_ANNEES_SUCCESS:
      return {
        ...state,
        TresAnnees: action.payload,
      };
    case FETCH_DATA_PER_YEAR_SUCCESS:
      return {
        ...state,
        TresData: action.payload,
      };
    case EDIT_TRES_DATA_PER_YEAR_SUCCESS:
      return {
        ...state,
        TresData: action.payload,
      };
    case FETCH_BILAN_PER_YEAR_SUCCESS:
      return {
        ...state,
        BilanData: action.payload,
      };
    /* case EDIT_BILAN_PER_YEAR_SUCCESS:
      return {
        ...state,
        BilanData: action.payload,
      }; */
    case FETCH_RESULTAT_SUCCESS:
      return {
        ...state,
        ResultatData: action.payload,
      };
    case FETCH_PLAN_SUCCESS:
      return {
        ...state,
        PlanData: action.payload,
      };
    case FETCH_PDF_SUCCESS:
      return {
        ...state,
        pdfData: action.payload,
      };
    case EDIT_PLAN_SUCCESS:
      return {
        ...state,
        PlanData: action.payload,
      };
    default:
      return state;
  }
};

export default TableauxFinancierReducer;

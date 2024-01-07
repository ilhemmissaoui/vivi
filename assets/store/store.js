import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
import { reducer as reduxFormReducer } from "redux-form";
import AccountReducer from "./reducers/AccountReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import BusinessModelReducer from "./reducers/BusinessModelReducer";
import PartnerReducer from "./reducers/PartnerReducer";
import BusinessPlanReducer from "./reducers/BusinessPlanReducer";
import faqReducer from "./reducers/FaqReducer";
import cguReducer from "./reducers/CguReducer";
import pcReducer from "./reducers/PcReducer";
import resourceReducer from "./reducers/ResourceReducer";
import aideReducer from "./reducers/AideReducer";
import TableauxFinancierReducer from "./reducers/TableauxFinancierReducer";
export default store;
const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: AuthReducer,
  todoReducers,
  form: reduxFormReducer,
  account: AccountReducer,
  project: ProjectReducer,
  partner: PartnerReducer,
  bmc: BusinessModelReducer,
  bp: BusinessPlanReducer,
  faq: faqReducer,
  cgu: cguReducer,
  pc: pcReducer,
  resource: resourceReducer,
  aide: aideReducer,
  tableauFinancier: TableauxFinancierReducer,
});
export const store = createStore(reducers, composeEnhancers(middleware));

import { combineReducers } from "redux";
import { userLoginReducer } from "./reducers/users";
import { getTransactionReducer } from "./reducers/transactions";
import { retrieveSopReducer } from "./reducers/sop";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  getTransactions: getTransactionReducer,
  retrieveSOP: retrieveSopReducer,
});

export default rootReducer;

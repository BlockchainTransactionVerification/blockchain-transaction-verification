import { combineReducers } from "redux";
import { userLoginReducer } from "./reducers/users";
import { getTransactionReducer } from "./reducers/transactions";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  getTransactions: getTransactionReducer,
});

export default rootReducer;

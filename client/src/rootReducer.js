import { combineReducers } from "redux";
import { userLoginReducer } from "./reducers/users";
import { getTransactionReducer } from "./reducers/transactions";
import { retrieveSopReducer } from "./reducers/sop";
import { uploadReducer } from "./reducers/upload";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  getTransactions: getTransactionReducer,
  retrieveSOP: retrieveSopReducer,
  uploadFile: uploadReducer,
});

export default rootReducer;

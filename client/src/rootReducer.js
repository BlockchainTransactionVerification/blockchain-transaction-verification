import { combineReducers } from "redux";
import { userLoginReducer, getWalletIdReducer } from "./reducers/users";
import { getTransactionReducer } from "./reducers/transactions";
import { retrieveSopReducer } from "./reducers/sop";
import { uploadReducer } from "./reducers/upload";
import { createFileReducer, getFileCidReducer } from "./reducers/file";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  walletID: getWalletIdReducer,
  getTransactions: getTransactionReducer,
  retrieveSOP: retrieveSopReducer,
  uploadFile: uploadReducer,
  createFileStatus: createFileReducer,
  fileCID: getFileCidReducer,
});

export default rootReducer;

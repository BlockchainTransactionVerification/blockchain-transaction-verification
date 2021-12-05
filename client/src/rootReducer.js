import { combineReducers } from "redux";
import { userLoginReducer, getWalletIdReducer } from "./reducers/users";
import {
  getTransactionReducer,
  updateTransactionStatusReducer,
} from "./reducers/transactions";
import {
  createSopReducer,
  retrieveSopReducer,
  updateSopDocReducer,
} from "./reducers/sop";
import { uploadReducer } from "./reducers/upload";
import { createFileReducer, getFileCidReducer } from "./reducers/file";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  walletID: getWalletIdReducer,
  getTransactions: getTransactionReducer,
  updateTransactionStatus: updateTransactionStatusReducer,
  createSop: createSopReducer,
  retrieveSOP: retrieveSopReducer,
  updateSopDoc: updateSopDocReducer,
  uploadFile: uploadReducer,
  createFileStatus: createFileReducer,
  fileCID: getFileCidReducer,
});

export default rootReducer;

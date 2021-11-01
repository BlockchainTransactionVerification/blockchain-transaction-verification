import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
} from "../constants/transactionConstants";

export const getTransactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case GET_TRANSACTION_REQUEST:
      return {};
    case GET_TRANSACTION_SUCCESS:
      return { transactions: action.payload };
    case GET_TRANSACTION_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

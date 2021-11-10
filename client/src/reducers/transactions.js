import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
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

export const addTransactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_REQUEST:
      return {};
    case ADD_TRANSACTION_SUCCESS:
      return { transactions: action.payload };
    case ADD_TRANSACTION_FAIL:
      return {};
    default:
      return state;
  }
};

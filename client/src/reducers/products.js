import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getTransactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {};
    case ADD_PRODUCT_SUCCESS:
      return {};
    case ADD_PRODUCT_FAIL:
      return {};
    default:
      return state;
  }
};

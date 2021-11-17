import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  RETRIEVE_WALLETID_REQUEST,
  RETRIEVE_WALLETID_SUCCESS,
  RETRIEVE_WALLETID_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {};
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return {};
    case USER_LOGOUT:
      return {};
    case USER_REGISTER_REQUEST:
      return {};
    case USER_REGISTER_SUCCESS:
      return {};
    case USER_REGISTER_FAIL:
      return {};
    default:
      return state;
  }
};

export const getWalletIdReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_WALLETID_REQUEST:
      return {};
    case RETRIEVE_WALLETID_SUCCESS:
      return { walletID: action.payload };
    case RETRIEVE_WALLETID_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
export default userLoginReducer;

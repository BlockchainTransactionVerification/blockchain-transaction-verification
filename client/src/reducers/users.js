import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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

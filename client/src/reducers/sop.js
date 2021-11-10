import {
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
} from "../constants/sopConstants";

export const retrieveSopReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_SOP_REQUEST:
      return {};
    case RETRIEVE_SOP_SUCCESS:
      return { sops: action.payload };
    case RETRIEVE_SOP_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

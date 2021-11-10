import {
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
} from "../constants/sopConstants";

export const retrieveSopReducer = (state = { sops: [] }, action) => {
  console.log("Inside SOP reducer");
  console.log(action.payload);
  switch (action.type) {
    case RETRIEVE_SOP_REQUEST:
      return { loading: true, sops: [] };
    case RETRIEVE_SOP_SUCCESS:
      return { loading: false, sops: action.payload };
    case RETRIEVE_SOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "../constants/uploadConstants";

export const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return {};
    case UPLOAD_FILE_SUCCESS:
      return { uploadFile: action.payload };
    case UPLOAD_FILE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

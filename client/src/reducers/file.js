import {
  CREATE_FILE_REQUEST,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
  GET_FILE_CID_REQUEST,
  GET_FILE_CID_SUCCESS,
  GET_FILE_CID_FAIL,
} from "../constants/fileConstants";

export const createFileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FILE_REQUEST:
      return { loading: true };
    case CREATE_FILE_SUCCESS:
      return { loading: false, createFileStatus: action.payload };
    case CREATE_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFileCidReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FILE_CID_REQUEST:
      return { loading: true };
    case GET_FILE_CID_SUCCESS:
      return { loading: false, fileCID: action.payload };
    case GET_FILE_CID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

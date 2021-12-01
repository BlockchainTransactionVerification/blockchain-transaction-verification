import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "../constants/uploadConstants";
import { BASE_URL } from "../constants/URLConstant";
import axios from "axios";

export const uploadFileAction = (file) => async (dispatch) => {
  // try
  // dispatch upload request
  // axios send file to upload endpoint
  // dispatch upload success
  // catch error
  // error
  // dispatch upload fail

  for (var p of file) {
    console.log("In upload action");
    console.log(p);
  }

  try {
    dispatch({ type: UPLOAD_FILE_REQUEST });

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("apiupload/files", file, config);

    console.log("Upload action res data");
    console.log(data);

    dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data });
  } catch (error) {
    alert(
      "An error occured uploading your file. Please upload the file again."
    );
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPLOAD_FILE_FAIL,
      payload: message,
    });
  }
};

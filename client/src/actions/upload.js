import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
} from "../constants/uploadConstants";
import axios from "axios";

// <local> const url = "http://localhost:5000";
// <production> const url = "https://blkchn-trxn-verif.herokuapp.com";
const url = "https://blkchn-trxn-verif.herokuapp.com";

export const uploadFileAction = (file) => async (dispatch) => {
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

    const { data } = await axios
      .post(url + "/apiupload/files", file, config)
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });

    console.log("Upload action res data");
    console.log(data);

    dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data });
  } catch (error) {
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

import {
  CREATE_FILE_REQUEST,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_FAIL,
  GET_FILE_CID_REQUEST,
  GET_FILE_CID_SUCCESS,
  GET_FILE_CID_FAIL,
} from "../constants/fileConstants";
import axios from "axios";

export const createFileAction =
  (tid, sopid, rdid, ownerid, owneradd, cid, shared) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_FILE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const payload = {
        TransactionID: tid,
        SopID: sopid,
        RDID: rdid,
        OwnerID: ownerid,
        OwnerAddress: owneradd,
        CID: cid,
        SharedWith: shared,
      };

      const { data } = await axios.post(
        // "http://localhost:5000/apifiles/createfile"
        "https://blkchn-trxn-verif.herokuapp.com/apifiles/createfile",
        payload,
        config
      );

      dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_FILE_FAIL,
        payload: message,
      });
    }
  };

export const getFileCidAction = (cid) => async (dispatch) => {
  try {
    dispatch({ type: GET_FILE_CID_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const payload = {
      CID: cid,
    };

    const { data } = await axios.post(
      //"http://localhost:5000/apifiles/getcid"
      "https://blkchn-trxn-verif.herokuapp.com/apifiles/getcid",
      payload,
      config
    );

    dispatch({
      type: GET_FILE_CID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_FILE_CID_FAIL,
      payload: message,
    });
  }
};

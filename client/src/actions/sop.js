import {
  CREATE_SOP_REQUEST,
  CREATE_SOP_SUCCESS,
  CREATE_SOP_FAIL,
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
  UPDATE_DOC_REQUEST,
  UPDATE_DOC_SUCCESS,
  UPDATE_DOC_FAIL,
  VIEW_DOCS_UPDATE,
} from "../constants/sopConstants";
import { MAKE_TRANSACTION_ACTIVE } from "../constants/transactionConstants";
import { BASE_URL } from "../constants/URLConstant";
import axios from "axios";

export const retrieveSopAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: RETRIEVE_SOP_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const payload = { TransactionID: id };

    const { data } = await axios.post("apisop/retrieveSOP", payload, config);

    dispatch({
      type: RETRIEVE_SOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RETRIEVE_SOP_FAIL,
      payload: message,
    });
  }
};

export const createSopAction =
  (sid, bid, tid, title, docs) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SOP_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const payload = {
        SupplierID: sid,
        BuyerID: bid,
        TransactionID: tid,
        SopTitle: title,
        RequiredDocs: docs,
      };

      console.log("Trying to get data...");
      const { data } = await axios.post("apisop/createSOP", payload, config);

      if (data) {
        console.log("Create Sop res Data " + data);
      } else {
        console.log("No res data from createSOP");
      }

      dispatch({
        type: MAKE_TRANSACTION_ACTIVE,
        payload: tid,
      });

      dispatch({
        type: CREATE_SOP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_SOP_FAIL,
        payload: message,
      });
    }
  };

export const updateSopDocAction = (sopid, docid) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DOC_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const payload = {
      id: sopid,
      DocID: docid,
    };

    //console.log("Trying to get data...");
    const { data } = await axios.post("apisop/updateSopDoc", payload, config);

    /*           if (data) {
            console.log("Update Doc res Data " + data);
          } else {
            console.log("No res data from createSOP");
          } */

    dispatch({
      type: UPDATE_DOC_SUCCESS,
      payload: data,
    });

    dispatch({
      type: VIEW_DOCS_UPDATE,
      payload: { id: sopid, DocID: docid },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_DOC_FAIL,
      payload: message,
    });
  }
};

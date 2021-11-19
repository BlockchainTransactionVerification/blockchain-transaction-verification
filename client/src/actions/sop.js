import {
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
} from "../constants/sopConstants";
import { BASE_URL } from "../constants/URLConstant";
import axios from "axios";

export const retrieveSopAction = (id) => async (dispatch) => {
  try {
    console.log("in actionsSOP : " + axios.defaults.baseURL);
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

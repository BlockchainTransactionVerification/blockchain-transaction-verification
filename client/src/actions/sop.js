import {
  RETRIEVE_SOP_REQUEST,
  RETRIEVE_SOP_SUCCESS,
  RETRIEVE_SOP_FAIL,
} from "../constants/sopConstants";
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

    const { data } = await axios.get(
      "http://localhost:5000/apisop/retrieveSOP",
      payload,
      config
    );

    console.log("Inside SOP action");
    console.log(data);
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

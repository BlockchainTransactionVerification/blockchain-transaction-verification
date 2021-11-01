import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
} from "../constants/transactionConstants";
import axios from "axios";

export const getTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TRANSACTION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/apitra/getTransaction",
      { BuyerId: userInfo.id },
      config
    );

    dispatch({
      type: GET_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TRANSACTION_FAIL,
      payload: message,
    });
  }
};

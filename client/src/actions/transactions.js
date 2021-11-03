import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
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

export const addTransaction =
  (/*some kind of way to get the product they are interested in*/) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_TRANSACTION_REQUEST,
      });
      console.log("you are in addTransaction frontside");
      const {
        userLogin: { userInfo },
      } = getState();
      /*check to make sure ProdID, SellerID and BuyerID exist */
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": userInfo.token,
        },
      };
      console.log("headers got made:" + config.headers);
      const { data } = await axios.post(
        "http://localhost:5000/apitra/addTransaction",
        { BuyerId: userInfo.id },
        config
      );
      console.log("post get request:" + data);
      dispatch({
        type: ADD_TRANSACTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ADD_TRANSACTION_FAIL,
        payload: message,
      });
    }
  };

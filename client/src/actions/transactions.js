import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_STATUS_REQUEST,
  UPDATE_TRANSACTION_STATUS_SUCCESS,
  UPDATE_TRANSACTION_STATUS_FAIL,
} from "../constants/transactionConstants";
import { BASE_URL } from "../constants/URLConstant";
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

    const fieldName = userInfo.isSeller ? "SellerID" : "BuyerID";

    const { data } = await axios.post(
      "apitra/getTransaction",
      { [fieldName]: userInfo.id },
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
  (title, supplier) => async (dispatch, getState) => {
    console.log("you are in addTransaction frontside");
    try {
      dispatch({
        type: ADD_TRANSACTION_REQUEST,
      });
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
      console.log("addTransaction frontside supplier:" + supplier.SellerID);
      console.log("addTransaction frontside supplier:" + supplier.ProdID);
      console.log("addTransaction frontside supplier:" + userInfo.id);
      const { data } = await axios.post(
        "apitra/addTransaction",
        {
          BuyerID: userInfo.id,
          SellerID: supplier.SellerID,
          ProdID: supplier.ProdID,
          Title: title,
        },
        config
      );
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

export const updateTransactionStatusAction =
  (tid, active, pending) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRANSACTION_STATUS_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log("Trying to get transaction data...");
      const { data } = await axios.post(
        "apitra/updateTransactionStatus",
        {
          id: tid,
          Active: active,
          Pending: pending,
        },
        config
      );

      console.log("data " + data);

      dispatch({
        type: UPDATE_TRANSACTION_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: UPDATE_TRANSACTION_STATUS_FAIL,
        payload: message,
      });
    }
  };

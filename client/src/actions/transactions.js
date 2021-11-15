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

    const fieldName = userInfo.isSeller ? "SellerID" : "BuyerID";

    const { data } = await axios.post(
      //"http://localhost:5000/apitra/getTransaction",
      "https://blkchn-trxn-verif.herokuapp.com/apitra/getTransaction",
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
    try {
      dispatch({
        type: ADD_TRANSACTION_REQUEST,
      });
      console.log("you are in addTransaction frontside");
      console.log("addTransaction frontside supplier:" + supplier.SellerID);
      console.log("addTransaction frontside supplier:" + supplier.ProdID);
      console.log("addTransaction frontside supplier:" + userInfo.id);
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
      const { data } = await axios.post(
        //"http://localhost:5000/apitra/addTransaction",
        "https://blkchn-trxn-verif.herokuapp.com/apitra/addTransaction",
        {
          BuyerId: userInfo.id,
          SellerID: supplier.SellerID,
          ProdID: supplier.ProdID,
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

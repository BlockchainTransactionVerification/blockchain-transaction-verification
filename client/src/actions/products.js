import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const addProduct =
  (ItemName, Quantity, Quality, Price, Brand, Region, ProdRate, ShipRestrict) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_PRODUCT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      var token = userInfo.token;
      var SellerID = userInfo.id;
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      };
      //var SellerID = userInfo.id;
      const { data } = await axios.post(
        //"http://localhost:5000/apisup/addProduct",
        "https://blkchn-trxn-verif.herokuapp.com/",
        {
          SellerID,
          ItemName,
          Quantity,
          Quality,
          Price,
          Brand,
          Region,
          ProdRate,
          ShipRestrict,
        },
        config
      );

      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

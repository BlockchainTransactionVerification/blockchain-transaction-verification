import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/URLConstant";

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
        "apisup/addProduct",
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

export const getItems =
  (ItemName, Quantity, Price, Supplier, Brand, isOnGround) =>
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

      //console.log("getItems baseURL: " + axios.defaults.baseURL);
      //axios.defaults.baseURL = "wownice.club/";
      const { data } = await axios.post(
        "apisup/getItem",
        {
          ItemName,
          Quantity,
          Price,
          Supplier,
          Brand,
          isOnGround,
        },
        config
      );
      console.log(data);
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

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  RETRIEVE_WALLETID_REQUEST,
  RETRIEVE_WALLETID_SUCCESS,
  RETRIEVE_WALLETID_FAIL,
} from "../constants/userConstants";
import { BASE_URL } from "../constants/URLConstant";
import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("login frontend base url: " + BASE_URL);
    console.log("plus api: " + BASE_URL + "api/login");
    const { data } = await axios.post(
      BASE_URL + "api/login",
      { Username: username, Password: password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (
    username,
    password,
    email,
    CompanyName,
    BusinessAddress,
    RepFirstName,
    RepLastName,
    Position,
    isSeller,
    WalletID
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        BASE_URL + "api/register",
        {
          Username: username,
          Password: password,
          Email: email,
          CompanyName: CompanyName,
          BusinessAddress: BusinessAddress,
          RepFirstName: RepFirstName,
          RepLastName: RepLastName,
          Position: Position,
          isSeller: isSeller,
          WalletID: WalletID,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      if (data) {
        return true;
      }

      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const getWalletIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: RETRIEVE_WALLETID_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const payload = { id: id };

    const { data } = await axios.post(
      BASE_URL + "api/getwalletid",
      payload,
      config
    );

    dispatch({
      type: RETRIEVE_WALLETID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: RETRIEVE_WALLETID_FAIL,
      payload: message,
    });
  }
};

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      //"http://localhost:5000/api/login",
      "https://blkchn-trxn-verif.herokuapp.com/api/login",
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
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("Username" + username);
      console.log("Password" + password);
      console.log("email" + email);
      console.log("CompanyName" + CompanyName);
      console.log("BusinessAddress" + BusinessAddress);
      console.log("RepFirstName" + RepFirstName);
      console.log("RepLastName" + RepLastName);
      console.log("Position" + Position);
      console.log("isSeller" + isSeller);
      console.log("WalletID" + WalletID);
      const { data } = await axios.post(
        //"http://localhost:5000/api/login",
        "https://blkchn-trxn-verif.herokuapp.com/api/register",
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
          WalletID,
        },
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

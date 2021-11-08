import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
//import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
  //const BASE_URL = "http://localhost:5000";
  const BASE_URL = "https://blkchn-trxn-verif.herokuapp.com/";
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    CompanyName: "",
    BusinessAddress: "",
    RepFirstName: "",
    RepLastName: "",
    Position: "",
    isSeller: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = async () => {
    if (state.email.length && state.password.length) {
      props.showError(null);
      const payload = {
        Username: state.username,
        Password: state.password,
        Email: state.email,
        CompanyName: state.CompanyName,
        BusinessAddress: state.BusinessAddress,
        RepFirstName: state.RepFirstName,
        RepLastName: state.RepLastName,
        Position: state.Position,
        isSeller: state.isSeller,
      };
      axios
        .post(BASE_URL + "api/register", payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            //localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToLogin();
            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <div className="registration form">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputCompanyName1">Company Name</label>
          <input
            type="CompanyName"
            className="form-control"
            id="CompanyName"
            placeholder="Company Name"
            value={state.CompanyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputBusinessAddress1">Business Address</label>
          <input
            type="BusinessAddress"
            className="form-control"
            id="BusinessAddress"
            placeholder="Business Address"
            value={state.BusinessAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputRepFirstName1">First Name</label>
          <input
            type="RepFirstName"
            className="form-control"
            id="RepFirstName"
            placeholder="First Name"
            value={state.RepFirstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputRepLastName1">Last Name</label>
          <input
            type="RepLastName"
            className="form-control"
            id="RepLastName"
            placeholder="Last Name"
            value={state.RepLastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPosition1">Position</label>
          <input
            type="Position"
            className="form-control"
            id="Position"
            placeholder="Position"
            value={state.Position}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelectIsSeller1">
            Buy or Sell Product?
          </label>
          <select class="form-control" id="isSeller">
            <option>Seller</option>
            <option>Purchaser</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Login here
        </span>
      </div>
    </div>
  );
}

export default withRouter(RegistrationForm);

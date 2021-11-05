import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/users";
import { Form, Button } from "react-bootstrap";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      console.log("seller:" + userInfo.seller);
      if (userInfo.isSeller) {
        history.push("/sellerhome");
      } else {
        history.push("/buyerhome");
      }
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="loginContainer">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="btn_container">
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;

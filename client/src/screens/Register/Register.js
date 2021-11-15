import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/users";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const RegistrationForm = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [BusinessAddress, setBusinessAddress] = useState("");
  const [RepFirstName, setRepFirstName] = useState("");
  const [RepLastName, setRepLastName] = useState("");
  const [Position, setPosition] = useState("");
  const [isSeller, setisSeller] = useState("");
  const [WalletID, setWalletID] = useState("");
  const [isRegistered, setIsRegistered] = useState("");

  const dispatch = useDispatch();
  const formStyle = {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
  };

  useEffect(() => {}, [history]);

  const submitHandler = (e, history) => {
    e.preventDefault();
    if (
      password == confirmPassword &&
      email == confirmEmail &&
      isSeller != ""
    ) {
      if (
        dispatch(
          register(
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
          ),
          setIsRegistered(true)
        )
      ) {
      } else {
        console.log("error");
      }
    }
  };

  if (isRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="loginContainer">
      <div className="formContainer">
        <Form onSubmit={submitHandler} style={formStyle}>
          <Form.Group>
            <Row>
              <div className="formInput">
                <Form.Control
                  id="Username"
                  type="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Email"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Confirm Email"
                    type="email"
                    value={confirmEmail}
                    placeholder="Confirm Email"
                    onChange={(e) => setconfirmEmail(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Company Name"
                    type="CompanyName"
                    value={CompanyName}
                    placeholder="Company Name"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Company Address"
                    type="address"
                    value={BusinessAddress}
                    placeholder="Company Address"
                    onChange={(e) => setBusinessAddress(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="First Name"
                    type="RepFirstName"
                    value={RepFirstName}
                    placeholder="First Name"
                    onChange={(e) => setRepFirstName(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="formInput">
                  <Form.Control
                    id="Last Name"
                    type="Last Name"
                    value={RepLastName}
                    placeholder="Last Name"
                    onChange={(e) => setRepLastName(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <div className="formInput">
              <Form.Control
                id="Position"
                type="test"
                value={Position}
                placeholder="Enter your Position in the Company"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="formInput">
              <Form.Control
                id="WalletID"
                type="text"
                value={WalletID}
                placeholder="Enter Your Wallet ID"
                onChange={(e) => setWalletID(e.target.value)}
              />
            </div>
            <div className="formInput">
              <Form.Label>
                Are you Selling Product or Buying Product?
              </Form.Label>
              <Form.Control
                as="select"
                aria-label="Default select example"
                value={isSeller}
                defaultValue={"Choose..."}
                onChange={(e) => setisSeller(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="0">Buyer</option>
                <option value="1">Seller</option>
              </Form.Control>
            </div>
          </Form.Group>
          <div className="btn_container">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;

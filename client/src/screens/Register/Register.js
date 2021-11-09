import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/users";
import { Form, Button, Col, Row } from "react-bootstrap";

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

  const dispatch = useDispatch();

  useEffect(() => {}, [history]);

  const submitHandler = (e, history) => {
    e.preventDefault();
    if (password == confirmPassword && email == confirmEmail) {
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
          )
        )
      ) {
      } else {
        console.log("error");
      }
    }
  };

  return (
    <div className="loginContainer">
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Row>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              id="Username"
              type="username"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="Email"
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Confirm Email</Form.Label>
              <Form.Control
                id="Confirm Email"
                type="email"
                value={confirmEmail}
                placeholder="Enter Email"
                onChange={(e) => setconfirmEmail(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="Password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                id="Confirm Password"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                id="Company Name"
                type="CompanyName"
                value={CompanyName}
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                id="Company Address"
                type="address"
                value={BusinessAddress}
                placeholder="Company Address"
                onChange={(e) => setBusinessAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                id="First Name"
                type="RepFirstName"
                value={RepFirstName}
                placeholder="First Name"
                onChange={(e) => setRepFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                id="Last Name"
                type="Last Name"
                value={RepLastName}
                placeholder="Last Name"
                onChange={(e) => setRepLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Form.Label>Position in Company</Form.Label>
          <Form.Control
            id="Position"
            type="test"
            value={Position}
            placeholder="Enter your Position in the Company"
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Label>WalletID</Form.Label>
          <Form.Control
            id="WalletID"
            type="text"
            value={WalletID}
            placeholder="Enter Your Wallet ID"
            onChange={(e) => setWalletID(e.target.value)}
          />
          <Form.Label>Are you Selling Product or Buying Product?</Form.Label>
          <Form.Control
            as="select"
            aria-label="Default select example"
            value={isSeller}
            defaultValue={"Buyer"}
            onChange={(e) => setisSeller(e.target.value)}
          >
            <option value="0">Buyer</option>
            <option value="1">Seller</option>
          </Form.Control>
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

export default RegistrationForm;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";
import { getTransactions } from "../../actions/transactions";
import { Tabs, Tab, ListGroup } from "react-bootstrap";

function BuyerHome({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const transactionsList = useSelector((state) => state.getTransactions);
  const { transactions } = transactionsList;

  /*
  const activeTransactions = transactions.map((transaction, id) => {
    if (transaction.Active == true) {
      return (
        <div key={id}>
          <ListGroup.Item>{transaction._id}</ListGroup.Item>
        </div>
      );
    }
  });
  */

  useEffect(() => {
    dispatch(getTransactions());
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, transactions, history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  //<Tab eventKey="active" title="Active Transactions">
  //  <p>Active</p>
  //  <ListGroup>{activeTransactions}</ListGroup>
  //</Tab>;

  return (
    <div>
      {userInfo.username} is loggged in
      <button onClick={logoutHandler}>logout</button>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="active" title="Active Transactions">
          <p>Active</p>
        </Tab>
        <Tab eventKey="pending" title="Pending Transactions">
          <p>Pending</p>
        </Tab>
        <Tab eventKey="completed" title="Completed Transactions">
          <p>Complete</p>
        </Tab>
        <Tab eventKey="messages" title="Messages">
          <p>Messages</p>
        </Tab>
      </Tabs>
    </div>
  );
}

export default BuyerHome;
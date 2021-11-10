import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";
import { getTransactions } from "../../actions/transactions";
import { Button, Tabs, Tab, ListGroup } from "react-bootstrap";
// This could be used instead of the href in ListGroup components
import { Link } from "react-router-dom";
import VerticallyCenteredModal from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";

function BuyerHome({ history }) {
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const transactionsList = useSelector((state) => state.getTransactions);
  const { transactions } = transactionsList;

  const pendingTransactions =
    transactions &&
    transactions.map((transaction, id) => {
      if (
        transaction.Pending == true &&
        (transaction.BuyerID || transaction.SellerID) == userInfo.id
      ) {
        return (
          <div key={id}>
            <ListGroup.Item>
              <div>{transaction.Title}</div>
            </ListGroup.Item>
          </div>
        );
      }
    });

  const activeTransactions =
    transactions &&
    transactions.map((transaction, id) => {
      if (
        transaction.Active == true &&
        (transaction.BuyerID || transaction.SellerID) == userInfo.id
      ) {
        return (
          <div key={id}>
            <ListGroup.Item>
              <Link
                to={{
                  pathname: transaction.TransactionURL,
                  state: { TransactionID: transaction._id },
                }}
              >
                {transaction.Title}
              </Link>
            </ListGroup.Item>
          </div>
        );
      }
    });

  useEffect(() => {
    dispatch(getTransactions());
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div>
      {userInfo.username} is loggged in
      <button onClick={logoutHandler}>logout</button>
      <Tabs
        defaultActiveKey="active"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="active" title="Active Transactions">
          <p>Active</p>
          <ListGroup>{activeTransactions}</ListGroup>
        </Tab>
        <Tab eventKey="pending" title="Pending Transactions">
          <p>Pending</p>
          <ListGroup>{pendingTransactions}</ListGroup>
          <VerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
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

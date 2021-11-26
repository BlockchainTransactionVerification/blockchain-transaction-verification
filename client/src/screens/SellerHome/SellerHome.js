import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/users";
import { addTransaction, getTransactions } from "../../actions/transactions";
import { Button, Tabs, Tab, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import VerticallyCenteredModal from "../../components/VerticallyCenteredModal/VerticallyCenteredModal";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

function SellerHome({ history }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [AddProductModalShow, setAddProductModalShow] = React.useState(false);
  const [currentTID, setCurrentTID] = React.useState("");
  const [currentBID, setCurrentBID] = React.useState("");
  const [currentSID, setCurrentSID] = React.useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const transactionsList = useSelector((state) => state.getTransactions);
  const { transactions } = transactionsList;

  const acceptHandler = (bid, sid, id) => {
    console.log("accept handler id " + id);
    console.log("accept handler bid " + bid);
    console.log("accept handler sid " + sid);
    setModalShow(true);
    setCurrentTID(id);
    setCurrentBID(bid);
    setCurrentSID(sid);
  };

  const pendingTransactions =
    transactions &&
    transactions.map((transaction) => {
      if (
        transaction.Pending == true &&
        (transaction.BuyerID === userInfo.id ||
          transaction.SellerID === userInfo.id)
      ) {
        return (
          <div key={transaction._id}>
            <ListGroup.Item>
              <div>{transaction.Title}</div>
              <div>
                <Button
                  variant="primary"
                  style={{ float: "right" }}
                  onClick={() =>
                    acceptHandler(
                      transaction.BuyerID,
                      transaction.SellerID,
                      transaction._id
                    )
                  }
                >
                  Accept
                </Button>
              </div>
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
        (transaction.BuyerID === userInfo.id ||
          transaction.SellerID === userInfo.id)
      ) {
        return (
          <div key={id}>
            <ListGroup.Item>
              <a href={transaction.TransactionURL}>{transaction.Title}</a>
            </ListGroup.Item>
          </div>
        );
      }
    });

  const completeTransactions =
    transactions &&
    transactions.map((transaction) => {
      if (
        transaction.Active == false &&
        transaction.Pending == false &&
        (transaction.BuyerID === userInfo.id ||
          transaction.SellerID === userInfo.id)
      ) {
        console.log("Transaction ID");
        console.log(transaction._id);
        return (
          <div key={transaction._id}>
            <ListGroup.Item>
              <a href={transaction.TransactionURL}>{transaction.Title}</a>
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
            buyid={currentBID}
            supid={currentSID}
            cid={currentTID}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed Transactions">
          <p>Complete</p>
          <ListGroup>{completeTransactions}</ListGroup>
        </Tab>
      </Tabs>
      <Button variant="primary" onClick={() => setAddProductModalShow(true)}>
        Add Product
      </Button>
      <AddProductModal
        show={AddProductModalShow}
        onHide={() => setAddProductModalShow(false)}
      />
    </div>
  );
}

export default SellerHome;

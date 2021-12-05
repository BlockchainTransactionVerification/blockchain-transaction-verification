import React, { useState } from "react";
import { addTransaction, getTransactions } from "../../actions/transactions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
function Card({ supplier }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const addTransactionHandler = (title) => {
    if (title) {
      dispatch(addTransaction(title, supplier));
    }
    setTitle("");
    handleClose();
  };
  return (
    <div className="tc bg-washed-blue dib br3 pa3 ma2 grow bw2 shadow-5">
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            Enter the title for transaction
          </Modal.Header>
          <Modal.Body>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => addTransactionHandler(title)}>
              Add transaction
            </Button>
          </Modal.Footer>
        </Modal>
        <p>Item Name: {supplier.ItemName}</p>
        <p>Price: ${supplier.Price}</p>
        <p>Quantity: {supplier.Quantity}</p>
        <p>Brand: {supplier.Brand}</p>
        <p>Percent Match: {supplier.PercentMatch}</p>
        <button onClick={() => setShow(true)}>Request</button>
      </div>
    </div>
  );
}

export default Card;

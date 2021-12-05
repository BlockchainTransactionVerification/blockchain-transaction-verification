import React, { useState } from 'react'
import { addTransaction, getTransactions } from '../../actions/transactions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Accordion } from 'react-bootstrap'

function CustomAccordionItem({ supplier }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const addTransactionHandler = (title) => {
    if (title) {
      dispatch(addTransaction(title, supplier))
    }
    setTitle('')
    handleClose()
  }
  let defaultKey = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

  return (
    <Accordion.Item eventKey={defaultKey}>
      <Accordion.Header>
        <strong>{'Item Name: '}&nbsp;</strong>
        {supplier.ItemName}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>{' Percent Match: '}&nbsp;</strong>
        {supplier.PercentMatch}
      </Accordion.Header>
      <Accordion.Body>
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
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button onClick={() => addTransactionHandler(title)}>
                Add transaction
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <p>
          <strong>{'Price: \n'}</strong> {supplier.Price}
        </p>
        <p>
          <strong>{' Brand: \n'}</strong> {supplier.Brand}
        </p>
        <Button onClick={() => setShow(true)}>Request</Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default CustomAccordionItem

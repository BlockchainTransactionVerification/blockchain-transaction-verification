import React from "react";
import { Button, Modal } from "react-bootstrap";

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New SOP
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Required Documents</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerticallyCenteredModal;
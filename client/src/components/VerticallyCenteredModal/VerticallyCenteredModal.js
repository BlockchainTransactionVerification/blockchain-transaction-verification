import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import { uploadFileAction } from "../../actions/upload";
import { updateTransactionStatusAction } from "../../actions/transactions";
import { createSopAction } from "../../actions/sop";
import "./VerticallyCenteredModal.css";
import axios from "axios";
import { BASE_URL } from "../../constants/URLConstant";

function VerticallyCenteredModal(props) {
  var docs = [
    {
      Type: "Non-Disclosure Agreement (NCNDA)",
      Required: false,
      Responsible: "",
      Done: false,
    },
    {
      Type: "Irrevocable Corporate Purchase Order (ICPO)",
      Required: false,
      Responsible: "",
      Done: false,
    },
    {
      Type: "Letter of Intent (LOI)",
      Required: false,
      Responsible: "",
      Done: false,
    },
    {
      Type: "Letter of Attestation (LOA)",
      Required: false,
      Responsible: "",
      Done: false,
    },
    {
      Type: "Bank Confirmation Letter (BCL)",
      Required: false,
      Responsible: "",
      Done: false,
    },
    {
      Type: "Bill of Sale",
      Required: false,
      Responsible: "",
      Done: false,
    },
  ];

  //const [sopChecklist, setSopChecklist] = useState(docs);
  const [sopTitle, setSopTitle] = useState("");
  const [files, setFiles] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [prevHash, setPrevHash] = useState("");
  const [hashes, setHashes] = useState([]);

  const fileUpload = useSelector((state) => state.uploadFile);
  const { uploadFile } = fileUpload;

  const createSOP = useSelector((state) => state.createSop);
  const { createSop } = createSOP;

  const transactionStatus = useSelector(
    (state) => state.updateTransactionStatus
  );
  const { updateTransactionStatus } = transactionStatus;

  const dispatch = useDispatch();

  // Transaction IDs
  /* console.log("BuyerID is " + props.buyid);
  console.log("SupplierID is " + props.supid);
  console.log("CurrentID is " + props.cid); */

  const selectHandler = (value, id) => {
    console.log("selectHandler value is " + value);

    docs[id.id].Responsible = value;
    console.log("Responsible at id " + id.id);
    console.log("docs.Responsible " + docs[id.id].Responsible);
  };

  const handleCheck = (e, id) => {
    const checked = e.target.value;
    if (checked) {
      console.log("Required doc checked");
      console.log(checked);
      docs[id.id].Required = true;
      console.log("Required set to " + docs[id.id].Required);
    } else {
      docs[id.id].Required = false;
      console.log("Required set to " + docs[id.id].Required);
    }
  };

  const updateStatus = async () => {
    const { data } = await axios.post(
      "apitra/updateTransactionStatus",
      {
        id: props.cid,
        Active: true,
        Pending: false,
      },
      {
        "Content-type": "application/json",
      }
    );
  };

  const onCreateHandler = async () => {
    props.onHide();
    dispatch(
      createSopAction(props.supid, props.buyid, props.cid, sopTitle, docs)
    );
  };

  const listDocs = docs.map((doc, id) => {
    return (
      <Form.Group className="sopDocsFG" controlId={id} key={id}>
        <hr id="hrSeperators"></hr>
        <Form.Label className="SopFgLabelT">{doc.Type}</Form.Label>
        <br></br>
        <Form.Label className="SopFgLabelS">Responsible party</Form.Label>
        <Form.Control
          className="SopFgSelect"
          as="select"
          aria-label="Default select example"
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            selectHandler(e.target.value, { id });
          }}
        >
          <option>Choose one...</option>
          <option value="Buyer">Buyer</option>
          <option value="Supplier">Supplier</option>
        </Form.Control>
        <Form.Check
          onClick={(e) => {
            handleCheck(e, { id });
          }}
          className="SopFgCheck"
          type="checkbox"
          label="Require"
          value="1"
        />
      </Form.Group>
    );
  });

  return (
    <Modal
      {...props}
      contentClassName="CreateSopModal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      scrollable={true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New SOP
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="CheckListBody">
        <Form>
          <Form.Group controlId="title">
            <Form.Label id="stLabel">SOP Title</Form.Label>
            <Form.Control
              className="SopTitle"
              type="sopTitle"
              value={sopTitle}
              placeholder="Enter the title"
              onChange={(e) => setSopTitle(e.target.value)}
            />
          </Form.Group>
          {listDocs}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCreateHandler}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerticallyCenteredModal;

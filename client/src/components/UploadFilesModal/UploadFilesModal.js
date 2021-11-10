import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUploader from "../FileUploader/FileUploader.component";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../actions/upload";

function UploadFilesModal(props) {
  const [documents, setDocuments] = useState([]);

  const updateUploadedFiles = (files) =>
    setDocuments((documents, { docs: files }));

  const fileInfo = useSelector((state) => state.uploadFile);
  const { file } = fileInfo;

  const dispatch = useDispatch();

  if (documents) {
    if (documents.docs) {
      console.log(documents.docs[0]);
    }
  }

  if (file) {
    console.log("res fleek info");
    console.log(file);
  } else {
    console.log("no res fleek info yet");
  }

  const uploadHandler = () => {
    let formdata = new FormData();

    // This is one way to grab values from JSON objects, <object>.map() can also be used
    if (documents) {
      if (documents.docs) {
        if (documents.docs[0]) {
          formdata.append("file", documents.docs[0]);
          for (var p of formdata) {
            console.log("formdata in upload modal");
            console.log(p);
          }
          console.log(documents.docs[0].name);
          dispatch(uploadFileAction(formdata));
        }
      }
    }
  };

  console.log("Inside upload files modal");
  console.log(props.modalrowid);
  console.log(props.tid);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FileUploader
          accept=".pdf"
          label="Document(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide && uploadHandler}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadFilesModal;

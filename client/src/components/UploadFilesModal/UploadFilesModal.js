import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FileUploader from "../FileUploader/FileUploader.component";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../actions/upload";
import { getWalletIdAction } from "../../actions/users";
import { updateSopDocAction } from "../../actions/sop";
import { createFileAction, getFileCidAction } from "../../actions/file";
import { BASE_URL } from "../../constants/URLConstant";
import axios from "axios";
import {
  init,
  addBlockToAcl,
  grantAccessToFile,
} from "../../components/Web3Client/Web3Client.js";

function UploadFilesModal(props) {
  const [previousHash, setPreviousHash] = useState("");
  const [documents, setDocuments] = useState([]);

  const updateUploadedFiles = (files) =>
    setDocuments((documents, { docs: files }));

  const fileUpload = useSelector((state) => state.uploadFile);
  // Here uploadFile needs to be the same name as what is in rootReducer and reducer
  // The structure is the same for all redux states
  const { uploadFile } = fileUpload;

  const userWalletID = useSelector((state) => state.walletID);
  const { walletID } = userWalletID;

  const fileStatus = useSelector((state) => state.createFileStatus);
  const { createFileStatus } = fileStatus;

  const updateDoc = useSelector((state) => state.updateSopDoc);
  const { updateSopDoc } = updateDoc;

  const dispatch = useDispatch();

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
          //console.log(documents.docs[0].name);
          dispatch(uploadFileAction(formdata));
        }
      }
    }
  };

  const createFileHandler = (CID) => {
    // Which user is the owner?
    var OwnerID;
    var OwnerAddress = props.currentacct.toString();
    var ufmUID; // Shared User ID
    var ufmAddress; // Shared User Address

    if (props.thisuid.toString() === props.supid[0]) {
      // Supplier is the file uploader
      OwnerID = props.supid[0];
      ufmUID = props.buyid[0];
      //dispatch(getWalletIdAction(props.buyid[0]));
      if (walletID) {
        if (walletID.WalletID) {
          ufmAddress = walletID.WalletID.toString();
        }
      }
    } else {
      // Buyer is the file uploader
      OwnerID = props.buyid[0];
      ufmUID = props.supid[0];
      //dispatch(getWalletIdAction(props.supid[0]));
      if (walletID) {
        if (walletID.WalletID) {
          ufmAddress = walletID.WalletID.toString();
        }
      }
    }

    dispatch(
      createFileAction(
        props.tid,
        props.sopid[0],
        props.modalrowid,
        OwnerID,
        OwnerAddress,
        CID,
        { UID: ufmUID, Address: ufmAddress }
      )
    );
  };

  const updateDocHandler = async () => {
    dispatch(updateSopDocAction(props.sopid[0], props.modalrowid));

    const { data } = await axios.post(
      "apisop/updateSopDoc",
      {
        id: props.sopid[0],
        DocID: props.modalrowid,
      },
      {
        "Content-type": "application/json",
      }
    );

    if (data) {
      if (data.success == true) {
        console.log("Required document's Done property has been set to true");
      }
    }
  };

  const grantAccess = async (hash) => {
    if (props.thisuid.toString() === props.supid[0]) {
      //dispatch(getWalletIdAction(props.buyid[0]));

      const { data } = await axios.post(
        "api/getwalletid",
        { id: props.supid[0] },
        { "Content-type": "application/json" }
      );

      if (data) {
        console.log("data.WalletID: " + data.WalletID);
        grantAccessToFile(data.WalletID, hash).catch((err) => {
          console.log(err);
        });
      }
    } else {
      //dispatch(getWalletIdAction(props.supid[0]));

      const { data } = await axios.post(
        "api/getwalletid",
        { id: props.buyid[0] },
        { "Content-type": "application/json" }
      );

      if (data) {
        console.log("data.WalletID: " + data.WalletID);
        grantAccessToFile(data.WalletID, hash).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const onClickHandler = () => {
    props.onHide();
    uploadHandler();
  };

  if (uploadFile) {
    var fileHash;
    //console.log("res fleek info");
    fileHash = uploadFile.hash.toString();
    if (fileHash) {
      console.log("There is a file");
      console.log(fileHash);
      console.log("previous hash");
      console.log(previousHash);
      if (fileHash !== previousHash) {
        console.log("Should dispatch create file handler");
        /*         createFileHandler(fileHash);
        console.log("FileHash before addBlock");
        console.log(fileHash);
        addBlockToAcl(fileHash).catch((err) => {
          console.log(err);
        });
        grantAccess(fileHash);
        updateDocHandler(); */
        setPreviousHash(fileHash);
      } else {
        console.log("Can't upload file twice");
      }
    }
  } else {
    console.log("no res fleek info yet");
  }

  // make a function to display a message if file is successful (createFileStatus.success == true)

  useEffect(() => {
    init();
  }, []);

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
        <Button onClick={onClickHandler}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadFilesModal;

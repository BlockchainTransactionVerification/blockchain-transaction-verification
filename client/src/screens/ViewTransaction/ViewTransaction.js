import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveSopAction } from "../../actions/sop";
import { getFileCidAction } from "../../actions/file";
//import { getWalletIdAction } from "../../actions/users";
import { Alert, Button, Table } from "react-bootstrap";
import { MdPendingActions } from "react-icons/md";
import { GrDocumentVerified } from "react-icons/gr";
import UploadFilesModal from "../../components/UploadFilesModal/UploadFilesModal";
import axios from "axios";
import { BASE_URL } from "../../constants/URLConstant";
import "./ViewTransaction.css";
import {
  init,
  getSelectedAccount,
  checkAccessToFile,
} from "../../components/Web3Client/Web3Client.js";

const ViewTransaction = ({ match, history }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalRowID, setModalRowID] = useState("");
  const location = useLocation();
  const TransactionID = match.params.id;

  // Invalid hook call error will be thrown if you do not add () to useDispatch!
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const retrieveSOP = useSelector((state) => state.retrieveSOP);
  const { sops } = retrieveSOP;

  const getCID = useSelector((state) => state.fileCID);
  const { fileCID } = getCID;

  /* const userWalletID = useSelector((state) => state.walletID);
  const { walletID } = userWalletID; */

  const displaySopTitle =
    sops &&
    sops.map((sop) => {
      if (TransactionID === sop.TransactionID) return sop.SopTitle;
    });

  const SopID =
    sops &&
    sops.map((sop) => {
      return sop._id;
    });

  const SupID =
    sops &&
    sops.map((sop) => {
      return sop.SupplierID;
    });

  const BuyID =
    sops &&
    sops.map((sop) => {
      return sop.BuyerID;
    });

  const openModal = (flag, id) => {
    setModalShow(flag);
    setModalRowID(id);
  };

  const handleClose = () => setModalShow(false);

  const handleViewDoc = async (rowID) => {
    var account = getSelectedAccount();
    var hasAccess;

    if (account) {
      const { data } = await axios.post(
        BASE_URL + "apifiles/getcid",
        {
          rdid: rowID,
        },
        {
          "Content-type": "application/json",
        }
      );

      if (data) {
        hasAccess = await checkAccessToFile(account, data.CID);
      }

      if (hasAccess == true) {
        window.open("https://ipfs.fleek.co/ipfs/" + data.CID);
      } else {
        console.log("hasAccess is false");
      }
    }
  };

  let displaySOP;
  if (!sops) {
    displaySOP = "Loading...";
  } else {
    displaySOP = sops.map((sop) => {
      if (TransactionID == sop.TransactionID) {
        return sop.RequiredDocs.map((doc) => {
          if (doc.Required == true) {
            if (doc.Done == true) {
              return (
                <tr key={doc._id}>
                  <td>{doc.Type}</td>
                  <td>{doc.Responsible}</td>
                  <td>
                    Completed
                    <div className="completed-action">
                      <GrDocumentVerified size="1.5em" />
                    </div>
                  </td>
                  <td>
                    <Button
                      className="vtViewBtn"
                      variant="success"
                      onClick={() => handleViewDoc(doc._id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={doc._id}>
                  <td>{doc.Type}</td>
                  <td>{doc.Responsible}</td>
                  <td>
                    Pending
                    <div className="pending-action">
                      <MdPendingActions size="2em" />
                    </div>
                  </td>
                  <td>
                    <Button
                      className="vtUploadBtn"
                      variant="outline-success"
                      onClick={() => openModal(true, doc._id)}
                    >
                      Upload
                    </Button>
                  </td>
                </tr>
              );
            }
          }
        });
      }
    });
  }

  const updateStatus = async () => {
    const { data } = await axios.post(
      BASE_URL + "apitra/updateTransactionStatus",
      {
        id: TransactionID,
        Active: false,
        Pending: false,
      },
      {
        "Content-type": "application/json",
      }
    );
  };

  const CheckIfComplete = () => {
    var allDone = [];
    var doneFlag = false;

    if (sops) {
      sops.map((sop) => {
        sop.RequiredDocs.map((doc) => {
          console.log("There are docs");
          if (doc.Required === true) {
            if (doc.Done === true) {
              console.log("Doc done is true");
              allDone.push(true);
            } else {
              console.log("Doc done is false");
              allDone.push(false);
            }
          }
        });
      });
    }

    for (const element of allDone) {
      if (element === false) {
        doneFlag = false;
      } else {
        doneFlag = true;
      }
    }

    if (doneFlag === true) {
      console.log("Updating transaction status to complete.");
      updateStatus();
      return (
        <Alert variant="success" id="alertC">
          Transaction complete.
        </Alert>
      );
    } else {
      return (
        <Alert variant="warning" id="alertP">
          Please upload all required files.
        </Alert>
      );
    }
  };

  let currentSelectedAccount = getSelectedAccount();

  useEffect(() => {
    dispatch(retrieveSopAction(TransactionID));
    init();
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, TransactionID]);

  //<tbody>{displaySOP}</tbody>
  return (
    <div className="bgimg">
      <h1 className="vtTitle">{displaySopTitle}</h1>
      <Table striped bordered hover id="vtTable">
        <thead className="vtHead">
          <tr>
            <th className="vtHeadText">Document Type</th>
            <th className="vtHeadText">Responsible Party</th>
            <th className="vtHeadText">Status</th>
            <th className="vtHeadText">File</th>
          </tr>
        </thead>
        <tbody>{displaySOP}</tbody>
      </Table>
      <CheckIfComplete />
      <UploadFilesModal
        show={modalShow}
        onHide={handleClose}
        modalrowid={modalRowID}
        tid={TransactionID}
        sopid={SopID}
        supid={SupID}
        buyid={BuyID}
        thisuid={userInfo.id}
        currentacct={currentSelectedAccount}
      />
    </div>
  );
};

export default ViewTransaction;

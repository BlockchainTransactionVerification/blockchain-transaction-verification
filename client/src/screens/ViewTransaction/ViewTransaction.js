import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveSopAction } from "../../actions/sop";
import { Button, Table } from "react-bootstrap";
import { MdPendingActions } from "react-icons/md";
import UploadFilesModal from "../../components/UploadFilesModal/UploadFilesModal";
import {
  init,
  getSelectedAccount,
} from "../../components/Web3Client/Web3Client.js";

const ViewTransaction = ({ match, history }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalRowID, setModalRowID] = useState("");
  const { TransactionID } = match.params.id;

  // Invalid hook call error will be thrown if you do not add () to useDispatch!
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const retrieveSOP = useSelector((state) => state.retrieveSOP);
  const { sops } = retrieveSOP;

  const displaySopTitle =
    sops &&
    sops.map((sop) => {
      return sop.SopTitle;
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

  let displaySOP;
  if (!sops) {
    displaySOP = "Loading...";
  } else {
    displaySOP = sops.map((sop) => {
      return sop.RequiredDocs.map((doc) => {
        return (
          <tr key={doc._id}>
            <td>{doc.Type}</td>
            <td>{doc.Responsible}</td>
            <td>
              <a href={doc.Template}>{doc.Type} Template</a>
            </td>
            <td>
              Pending
              <div className="pending-action">
                <MdPendingActions size="2em" />
              </div>
            </td>
            <td>
              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={() => openModal(true, doc._id)}
              >
                Upload
              </Button>
            </td>
          </tr>
        );
      });
    });
  }

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
    <div>
      <h2>{displaySopTitle}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Document Type</th>
            <th>Responsible Party</th>
            <th>Template</th>
            <th>Status</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>{displaySOP}</tbody>
      </Table>
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

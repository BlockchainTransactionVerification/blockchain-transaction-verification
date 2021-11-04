import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveSopAction } from "../../actions/sop";
import { Button, Table } from "react-bootstrap";
import { MdPendingActions } from "react-icons/md";

const ViewTransaction = ({ history }) => {
  const location = useLocation();
  const { TransactionID } = location.state;

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

  const displaySOP =
    sops &&
    sops.map((sop) => {
      sop.RequiredDocs.map((doc) => {
        if (doc.Done === false) {
          let status = "Pending Upload";
          <tr>
            <td>{doc.Type}</td>
            <td>{doc.Responsible}</td>
            <td>
              <a href={doc.Template}>{doc.Type} Template</a>
            </td>
            <td>{status}</td>
            <td>
              <div className="pending-action">
                <MdPendingActions size="2em" />
              </div>
            </td>
          </tr>;
        } else {
          let status = "Pending Upload";
          <tr>
            <td>{doc.Type}</td>
            <td>{doc.Responsible}</td>
            <td>{doc.Template}</td>
            <td>{status}</td>
            <td>
              <Button href="#">View</Button>
            </td>
          </tr>;
        }
      });
    });

  useEffect(() => {
    dispatch(retrieveSopAction(TransactionID));
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, TransactionID]);

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
    </div>
  );
};

export default ViewTransaction;

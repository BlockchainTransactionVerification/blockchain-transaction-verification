import React from "react";
import { ListGroup } from "react-bootstrap";
import "./ViewTemplates.css";

const ViewTemplates = () => {
  return (
    <div id="bgimg">
      <h1 id="TemplatesTitle">SOP Document Templates</h1>
      <div id="TemplateContainer">
        <ListGroup className="tGroup">
          <ListGroup.Item className="tItem">
            <h2 className="tHeader">Non-Disclosure Agreement (NCNDA):</h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeiabrmsyklfctbtdpif2btb7ku73ypp223e5iszgisejb3pauf7rmy"
              target="_blank"
              className="tLink"
            >
              Sample NCNDA
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 className="tHeader">
              Irrevocable Corporate Purchase Order (ICPO):
            </h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeicmx4vtliu5hlqro2ut27pvzmsn532pqjksoyi4d2n3526r3nnjwe"
              target="_blank"
              className="tLink"
            >
              Sample ICPO
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 className="tHeader">Letter of Intent (LOI):</h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeidnjnnoenjlf66rq2ovrbpaed4ymajpv73gk3qtptrzhpbg2ao3em"
              target="_blank"
              className="tLink"
            >
              Sample LOI
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 className="tHeader">Letter of Attestation (LOA):</h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeidz4uiz3h4w2qitla2b5itrj5f4rfxpslxnmx6fcxnvf3xodlv7ua"
              target="_blank"
              className="tLink"
            >
              Sample LOA
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 className="tHeader">Bank Confirmation Letter (BCL):</h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeib6vz6rkkz7hnokkjopma7c6xoo2qkx2j75rtqx6ovakg46ljbrlu"
              target="_blank"
              className="tLink"
            >
              Sample BCL
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 className="tHeader">Bill of Sale:</h2>
            <a
              href="https://ipfs.fleek.co/ipfs/bafybeigtx2xhieekl3gk7ayjmmhaiwhhhuwjuh3crraem4qgszylfxohga"
              target="_blank"
              className="tLink"
            >
              Sample Bill of Sale
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default ViewTemplates;

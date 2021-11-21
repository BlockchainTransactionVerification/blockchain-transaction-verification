import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { addProduct } from "../../actions/products.js";

function AddProductModal(props) {
  const [ItemName, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Quality, setQuality] = useState("");
  const [Price, setPrice] = useState("");
  const [Brand, setBrand] = useState("");
  const [Region, setRegion] = useState("");
  const [ProdRate, setProdRate] = useState("");
  const [ShipRestrict, setShipRestrict] = useState("");
  const [isOnGround, setisOnGround] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    const form = e.currentTarget;
    console.log("just made form");
    if (form.checkValidity() === false) {
      console.log("validity is false");
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      console.log("validity else");
      e.preventDefault();
      console.log("hitting handler");
      console.log("inside IF");
      dispatch(
        addProduct(
          ItemName,
          Quantity,
          Quality,
          Price,
          Brand,
          Region,
          ProdRate,
          ShipRestrict,
          isOnGround
        )
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Add Product</h4>
        <div className="AddProductContainer">
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicItemName">
                  <Form.Label className="addProductInput">Item Name</Form.Label>
                  <Form.Control
                    required
                    type="ItemName"
                    value={ItemName}
                    placeholder="Enter the Name of the Item"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                  <Form.Label className="addProductInput">Quantity</Form.Label>
                  <Form.Control
                    required
                    type="Quantity"
                    value={Quantity}
                    placeholder="Enter the Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicQuality">
                  <Form.Label className="addProductInput">Quality</Form.Label>
                  <Form.Control
                    required
                    type="Quality"
                    value={Quality}
                    placeholder="Enter the Item Quality"
                    onChange={(e) => setQuality(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type="Price"
                    value={Price}
                    placeholder="Enter the Item Price per Unit"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    required
                    type="Brand"
                    value={Brand}
                    placeholder="Enter the Item Brand"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicRegion">
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    required
                    type="Region"
                    value={Region}
                    placeholder="Enter the Region the product will ship from"
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicProdRate">
                  <Form.Label>Production Rate</Form.Label>
                  <Form.Control
                    required
                    type="ProdRate"
                    value={ProdRate}
                    placeholder="Enter the Item Production Rate"
                    onChange={(e) => setProdRate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicShipRestrict">
                  <Form.Label>Shipping Restrictions</Form.Label>
                  <Form.Control
                    required
                    type="ShipRestrict"
                    value={ShipRestrict}
                    placeholder="Enter any Shipping Restrictions"
                    onChange={(e) => setShipRestrict(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicIsOnGround">
              <Form.Label>Is this Product on the Ground?</Form.Label>
              <Form.Control
                required
                as="select"
                aria-label="Default select example"
                value={isOnGround}
                defaultValue={"Choose..."}
                onChange={(e) => setisOnGround(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Control>
            </Form.Group>
            <Button className="btn btn-primary me-auto" type="submit">
              Add Product
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddProductModal;

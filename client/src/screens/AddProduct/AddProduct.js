import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addProduct } from "../../actions/products.js";
import "./formInput.css";

const AddProduct = ({ history }) => {
  const [ItemName, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Quality, setQuality] = useState("");
  const [Price, setPrice] = useState("");
  const [Brand, setBrand] = useState("");
  const [Region, setRegion] = useState("");
  const [ProdRate, setProdRate] = useState("");
  const [ShipRestrict, setShipRestrict] = useState("");
  const [isOnGround, setisOnGround] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      ItemName &&
      Quantity &&
      Quality &&
      Price &&
      Brand &&
      Region &&
      ProdRate &&
      ShipRestrict
    ) {
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

  const HomeHandler = () => {
    history.push("/sellerhome");
  };
  return (
    <div className="AddProductContainer">
      <div>
        <button onClick={HomeHandler} type="button" class="btn btn-secondary">
          Home
        </button>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicItemName">
          <Form.Label className="addProductInput">Item Name</Form.Label>
          <Form.Control
            type="ItemName"
            value={ItemName}
            placeholder="Enter the Name of the Item"
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicQuantity">
          <Form.Label className="addProductInput">Quantity</Form.Label>
          <Form.Control
            type="Quantity"
            value={Quantity}
            placeholder="Enter the Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicQuality">
          <Form.Label className="addProductInput">Quality</Form.Label>
          <Form.Control
            type="Quality"
            value={Quality}
            placeholder="Enter the Item Quality"
            onChange={(e) => setQuality(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="Price"
            value={Price}
            placeholder="Enter the Item Price per Unit"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="Brand"
            value={Brand}
            placeholder="Enter the Item Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRegion">
          <Form.Label>Region</Form.Label>
          <Form.Control
            type="Region"
            value={Region}
            placeholder="Enter the Region the product will ship from"
            onChange={(e) => setRegion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicProdRate">
          <Form.Label>Production Rate</Form.Label>
          <Form.Control
            type="ProdRate"
            value={ProdRate}
            placeholder="Enter the Item Production Rate"
            onChange={(e) => setProdRate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicShipRestrict">
          <Form.Label>Shipping Restrictions</Form.Label>
          <Form.Control
            type="ShipRestrict"
            value={ShipRestrict}
            placeholder="Enter any Shipping Restrictions"
            onChange={(e) => setShipRestrict(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicIsOnGround">
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

        <div className="btn_container">
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;

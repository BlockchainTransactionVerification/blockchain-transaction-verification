import React, { useState } from "react";
import Scroll from "./Scroll";
import SearchList from "./SearchList.js";
import axios from "axios";
//import SupplyInfo from "./SupplyInfo";
import { BASE_URL } from "../../constants/URLConstant";

var dataResponse = "";

function apiTest(itemName, price, quantity, brand) {
  var payload = {
    ItemName: itemName,
    Quantity: quantity,
    Price: price,
    Brand: brand,
  };
  axios({
    method: "post",
    url: "apisup/getItem",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      //handle success
      dataResponse = response;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

function getFilteredItems(itemName, price, quantity, brand) {
  if (itemName == "" || price == "" || quantity == "" || brand == "") {
    return [];
  }

  console.log(apiTest(itemName, price, quantity, brand));
  console.log("LOG RESPONSE: " + JSON.stringify(dataResponse.data));

  var filteredItems = [];

  if (dataResponse.data != null) {
    for (let index = 0; index < dataResponse.data.length; ++index) {
      let _itemName = dataResponse.data[index]["ItemName"];
      let _quantity = parseInt(dataResponse.data[index]["Quantity"]);
      let _price = parseFloat(dataResponse.data[index]["Price"]);
      let _brand = dataResponse.data[index]["Brand"];
      let _SellerID = dataResponse.data[index]["SellerID"];
      let _ProdID = dataResponse.data[index]["_id"];

      let matchCount = 0;
      if (itemName == _itemName) {
        matchCount++;
      }

      if (quantity == _quantity) {
        matchCount++;
      }

      if (price == _price) {
        matchCount++;
      }

      if (brand == _brand) {
        matchCount++;
      }

      let _percentMatch = String((matchCount / 4) * 100) + " %";

      let itemInfo = {
        ItemName: _itemName,
        Quantity: _quantity,
        Price: _price,
        Brand: _brand,
        ProdID: _ProdID,
        SellerID: _SellerID,
        PercentMatch: _percentMatch,
      };

      filteredItems.push(itemInfo);
      console.log(itemInfo);
    }
  }

  return filteredItems;
}

function Search({ details }) {
  const [itemNameText, setItemName] = useState("");
  const [quantityText, setQuantity] = useState(0);
  const [priceText, setPrice] = useState(0.0);
  const [brandText, setBrand] = useState("");
  const [percentMatchText, setPercentMatch] = useState("");

  let filteredPersons = getFilteredItems(
    itemNameText,
    parseFloat(priceText),
    parseInt(quantityText),
    brandText
  );

  const handleChange = (e) => {
    const value = e.target.value;

    switch (e.target.id) {
      case "ItemNameInputId":
        setItemName(value);
        break;
      case "PriceInputId":
        setPrice(value);
        break;
      case "QuantityInputId":
        setQuantity(value);
        break;
      case "BrandInputId":
        setBrand(value);
        break;
    }
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredItems={filteredPersons} />
      </Scroll>
    );
  }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow"></div>
      <div className="pa2">
        <input
          id="ItemNameInputId"
          className="pa3 bl br3 grow b--none bg-light-blue ma3"
          type="search"
          placeholder="Item Name"
          onChange={handleChange}
        />{" "}
        <input
          id="PriceInputId"
          className="pa3 bb br3 grow b--none bg-light-blue ma3"
          type="search"
          placeholder="Price"
          onChange={handleChange}
        />{" "}
        <input
          id="QuantityInputId"
          className="pa3 bb br3 grow b--none bg-light-blue ma3"
          type="search"
          placeholder="Quantity"
          onChange={handleChange}
        />{" "}
        <input
          id="BrandInputId"
          className="pa3 bb br3 grow b--none bg-light-blue ma3"
          type="search"
          placeholder="Brand"
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default Search;

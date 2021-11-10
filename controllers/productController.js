import Supply from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const addProduct = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("you are in saveItem api");
  const {
    SellerID,
    ItemName,
    Quantity,
    Quality,
    Price,
    Brand,
    Region,
    ProdRate,
    ShipRestrict,
  } = req.body;
  if (!SellerID || !ItemName) {
    return res.status(442).json({ error: "please add all the fields" });
  }
  // to be made required. Taken out for ease of testing.
  //|| !Quantity || !Quality || !LevelSafety || !Region || !NDA
  const Supplies = new Supply({
    SellerID,
    ItemName,
    Quantity,
    Quality,
    Price,
    Brand,
    Region,
    ProdRate,
    ShipRestrict,
  });
  Supplies.save()
    .then(() => {
      console.log("save successful");
      res.json({
        success: true,
        msg: "This Item has been saved Successfully",
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

//input: ItemName, Quantity, Price, supplier

export const getItems = asyncHandler(async (req, res) => {
  //if(req.body.supplier)
  //send back all
  //else
  //return limited

  res.set("Access-Control-Allow-Origin", "*");
  const Supplies = await Supply.find(req.body);
  res.json(Supplies);
});

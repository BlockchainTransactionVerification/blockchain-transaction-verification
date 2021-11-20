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
    isOnGround,
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
    isOnGround,
  });
  Supplies.save()
    .then(() => {
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
//input: ItemName, Quantity, Price, supplier
export const getItems = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  var { ItemName, Quantity, Price, Brand, isOnGround } = req.body;
  /* if (!ItemName || !Quantity || !Price || !Brand) {
    return res.status(442).json({ error: "please add all the fields" });
  } */

  var query = [];

  if (ItemName === "" || ItemName == null) {
    console.log("query name");
    ItemName = " ";
  }
  if (Quantity == null) {
    Quantity = 0;
  }
  if (Price == null) {
    Price = 0;
  }
  if (Brand === "" || Brand == null) {
    Brand = " ";
  }

  /*   if (isOnGround) {
    if (query.length == 4) {
      return res.json(groundAllFields(ItemName, Quantity, Price, Brand));
    } else if (null) {
    }
  } else {
  }*/
  console.log("query name: " + ItemName);
  console.log("query quan: " + Quantity);
  console.log("query price: " + Price);
  console.log("query brand: " + Brand);

  if (isOnGround) {
    Supply.find({
      ItemName: ItemName,
      isOnGround: isOnGround,
      $or: [
        { Quantity: { $lte: Quantity } },
        { Price: { $lte: Price } },
        { Brand: Brand },
      ],
    })
      .then((savedItems) => {
        if (savedItems.length > 0) {
          return res.json(savedItems);
        } else {
          Supply.find({
            ItemName: ItemName,
            isOnGround: isOnGround,
          })
            .then((savedItems) => {
              if (savedItems.length > 0) {
                return res.json(savedItems);
              } else {
                return res
                  .status(442)
                  .json({ error: "no Items found by that criteria" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Supply.find({
      ItemName: ItemName,
      $or: [
        { Quantity: { $lte: Quantity } },
        { Price: { $lte: Price } },
        { Brand: Brand },
      ],
    })
      .then((savedItems) => {
        if (savedItems.length > 0) {
          return res.json(savedItems);
        } else {
          Supply.find({
            ItemName: ItemName,
          })
            .then((savedItems) => {
              if (savedItems.length > 0) {
                return res.json(savedItems);
              } else {
                return res
                  .status(442)
                  .json({ error: "no Items found by that name" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

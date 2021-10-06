import Supply from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const saveItem = asyncHandler(async(req, res) => {
    console.log("you are in saveItem api");
    const {
        SellerID,
        ItemName,
        Quantity,
        Quality,
        Price,
        Brand,
        NDA,
        Region,
        ProdRate,
        ShipRestrict
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
        NDA,
        Region,
        ProdRate,
        ShipRestrict
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

    const {ItemName, Quantity, Price, supplier} = req.body;
    if (!ItemName || !Quantity || !Price || (supplier == null)) {
        return res.status(442).json({ error: "please add all the fields" });
    }


    if(req.body.supplier){
        Supply.find({ItemName: req.body.ItemName, 
                     Quantity: {$lte: req.body.Quantity}, 
                     Price: {$lte: req.body.Price}})
        .then(savedItems =>{
            return res.json(savedItems);
        }).catch(err=>{console.log(err)})
    } else{
        //return limited fields
        Supply.find({ItemName: req.body.ItemName, 
            Quantity: {$lte: req.body.Quantity}, 
            Price: {$lte: req.body.Price}}, 'ItemName Quantity Price')
        .then(savedItems =>{
            return res.json(savedItems);
        }).catch(err=>{console.log(err)})
    }
});

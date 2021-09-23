import Supply from '../models/supplierModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'


export const saveItem = asyncHandler(async (req, res) => {
    console.log("you are in saveItem api")
    const { SellerID, ItemName, Quantity, Quality, LevelSafety, Region, NDA, Comission } = req.body
    if (!SellerID || !ItemName) {
        return res.status(442).json({ error: "please add all the fields" })
    }
    // to be made required. Taken out for ease of testing.
    //|| !Quantity || !Quality || !LevelSafety || !Region || !NDA
    const Supplies = new Supply({
        SellerID,
        ItemName,
        Quantity,
        Quality,
        LevelSafety,
        Region,
        NDA,
        Comission
    })
    Supplies.save()
        .then(() => {
            console.log('save successful')
            res.json({
                success: true,
                msg: "This Item has been saved Successfully"
            })
        })
        .catch((error) => { console.error(error) })
})

export const getItems = asyncHandler(async (req,res) =>  {
    return res.json({
        worked: "WIP"
    })
})
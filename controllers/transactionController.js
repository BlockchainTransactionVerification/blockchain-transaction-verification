import Transaction from '../models/transactionModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

//register function to register a user
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const addTransaction = asyncHandler(async(req, res) => {
    console.log("you are in addTransaction")
    const {BuyerID, SellerID} = req.body
    if(!BuyerID || !SellerID){
        return res.status(442).json({error:"please add all the fields"})
    }
    
    const transaction =new Transaction({
          BuyerID,
          SellerID
    })
    const buyer = await User.findById(BuyerID)
    const seller = await User.findById(SellerID)
    console.log(buyer)
    console.log(seller)
    if(!buyer || !seller){
        return res.status(442).json({error:"User not found"})
    }
    
    updates.save()
    .then((result, err) => {
        if(err){
            return res.status(442).json({error: err})
        }
    })
        
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const hrefLink = "https://blkchn-trxn-verif.herokuapp.com/;
    const msg = {
        to: seller.Email, // Change to your recipient
        from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
        subject: 'New Pending Transaction',
        text: `Hello ${seller.RepFirstName}, You have a new Pending Transaction`,
        //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here`,
        html: `Hello<strong> ${Users.Username}</strong>,<br><br><a href=${hrefLink}> Click Here </a> and Log in to check out 
               your new pending transaction from ${buyer.RepFirstName} from Company Stand in`,
    }
    sgMail.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
     res.json({
         //ID: user.id,
         success: true,
         msg: "User has been successfully activated"
     })
})

//update documents
//input - id and Documents
//output -
        // success - status: 200; success: true, msg: "User has been successfully edited"
        // failed - status: 442; error:"some message"

export const updateDocuments = asyncHandler(async(req, res) => {
    if(!req.body.id){
          return res.status(442).json({error:"Transaction ID is missing"})
      }
      if(!req.body.Documents){
        //to be added
      }
      const updates = await User.findById(req.body.id)
      if(!updates){
            return res.status(442).json({error:"Transaction not found"})
      }
      updates[Documents] = req.body[Documents]
      updates.save()
      .then((result, err) => {
          if(err){
              return res.status(442).json({error: err})
          }else{
              return res.json({
                  success: true,
                  msg: "User has been successfully edited"
              })
          }
      })
  

})

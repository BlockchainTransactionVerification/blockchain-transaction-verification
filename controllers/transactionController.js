import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

//register function to register a user
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const registerUser = asyncHandler(async(req, res) => {
    console.log("you are in register api")
    const {Username, Password, Email, CompanyName, BusinessAddress, 
           RepFirstName, RepLastName, Position} = req.body
    if(!Username || !Password || !Email){
        return res.status(442).json({error:"please add all the fields"})
    }
    //checks database for a user with this username
    User.findOne({Username:Username})
    .then(savedUser=>{
        //if a user by this username exists, error
        if(savedUser){
            return res.status(442).json({error:"Username Taken"})
        }
        //if it does not exist, hash the password
       bcrypt.hash(Password,12)
         .then(hashedPassword=>{
             const Users = new User({
                 Username,
                 Password:hashedPassword,
                 Email,
                 CompanyName,
                 BusinessAddress,
                 RepFirstName,
                 RepLastName,
                 Position,
                 // temporarytoken: jwt.sign(Username, JWT_SECRET)
                 temporarytoken: jwt.sign(Username, process.env.JWT_SECRET),
                 active: false
             })
             Users.save()
             .then(user=>{
                 console.log("saved successfully")
                 sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                 const hrefLink = "https://blkchn-trxn-verif.herokuapp.com/api/verify/" + Users.temporarytoken;
                 const msg = {
                     to: user.Email, // Change to your recipient
                     from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                     subject: 'Thank you For Registering with BlockChain Transaction Verification',
                     text: `Hello ${Users.Username}, Click Here to Activate your Account.`,
                     //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
                     html: `Hello<strong> ${Users.Username}</strong>,<br><br><a href=${hrefLink}> Click Here to Activate your Account.</a>`,
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
                 });
              })
             .catch(err=>{console.log(err)})
         }).catch(err=>{console.log(err)})
    })
})

//update transaction
//input - id and any other valid field for users
//output -
        // success - status: 200; success: true, msg: "User has been successfully edited"
        // failed - status: 442; error:"some message"

export const updateUser = asyncHandler(async(req, res) => {
  if(!req.body.id){
      return res.status(442).json({error:"Transaction ID is missing"})
  }
  if(req.body.Documents){
    //to be added
  }
  const updates = await User.findById(req.body.id)
  if(!updates){
        return res.status(442).json({error:"Transaction not found"})
  }
  
  
  
  
  
  

})

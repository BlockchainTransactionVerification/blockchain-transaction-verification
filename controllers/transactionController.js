import Transaction from "../models/transactionModel.js";
import User from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import expressAsyncHandler from "express-async-handler";

//register function to register a user
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"

export const addTransaction = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("you are in addTransaction");
  const {
    BuyerID,
    SellerID,
    ProdID,
    Active,
    Pending,
    TransactionURL,
    Title,
    Documents,
  } = req.body;
  if (!BuyerID || !SellerID || !ProdID) {
    return res.status(442).json({ error: "please add all the fields" });
  }

  const transaction = new Transaction({
    ProdID,
    BuyerID,
    SellerID,
    Active,
    Pending,
    TransactionURL,
    Title,
    Documents,
  });
  const buyer = await User.findById(BuyerID);
  const seller = await User.findById(SellerID);
  if (!buyer || !seller) {
    return res.status(442).json({ error: "User not found" });
  }
  transaction.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    }
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const hrefLink = "https://blkchn-trxn-verif.herokuapp.com/";
  const msg = {
    to: seller.Email, // Change to your recipient
    from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
    subject: "New Pending Transaction",
    text: `Hello ${seller.RepFirstName}, You have a new Pending Transaction`,
    //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here`,
    html: `Hello<strong> ${seller.RepFirstName}</strong>,<br><br><a href=${hrefLink}> Click Here </a> and Log in to check out 
               your new pending transaction from ${buyer.RepFirstName} from ${buyer.CompanyName}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  res.json({
    //ID: user.id,
    success: true,
    msg: "User has been successfully activated",
  });
});

//get transaction
//input - id and Documents
//output -
// success - status: 200; the list of documents and their statuses
// failed - status: 442; error:"some message"

export const getTransaction = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body) {
    return res.status(442).json({ error: "ID is missing" });
  }
  const updates = await Transaction.find(req.body);
  if (!updates) {
    return res.status(442).json({ error: "User not found" });
  }
  return res.json(updates);
});

//get documents
//input - id
//output -
// success - status: 200; the list of documents and their statuses
// failed - status: 442; error:"some message"

export const getDocuments = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.id) {
    return res.status(442).json({ error: "Transaction ID is missing" });
  }
  const updates = await Transaction.findById(req.body.id, "Documents");
  if (!updates) {
    return res.status(442).json({ error: "User not found" });
  }
  return res.json(updates);
});

//update documents
//input - id and Documents
//output -
// success - status: 200; success: true, msg: "User has been successfully edited"
// failed - status: 442; error:"some message"

export const updateDocuments = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.id) {
    return res.status(442).json({ error: "Transaction ID is missing" });
  }
  if (!req.body.Documents) {
    //to be added
  }
  const updates = await Transaction.findById(req.body.id);
  if (!updates) {
    return res.status(442).json({ error: "Transaction not found" });
  }
  updates.Documents = req.body.Documents;
  updates.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      return res.json({
        success: true,
        msg: "User has been successfully edited",
      });
    }
  });
});

//Set the Title
//input - id and Title
//output -
// success - status: 200; success: true, msg: "title has been successfully edited"
// failed - status: 442; error:"some message"

export const setTitle = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.Title || !req.body.id) {
    return res.status(442).json({ error: "Transaction ID is missing" });
  }
  const updates = await Transaction.findById(req.body.id);
  if (!updates) {
    return res.status(442).json({ error: "Transaction not found" });
  }
  updates.Title = req.body.Title;
  updates.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      return res.json({
        success: true,
        msg: "Title has been successfully edited",
      });
    }
  });
});

//Set the Transaction URL for IPFS
//input - id and TransactionURL
//output -
// success - status: 200; success: true, msg: "transactionurl has been successfully edited"
// failed - status: 442; error:"some message"

export const setURL = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.TransactionURL || !req.body.id) {
    return res.status(442).json({ error: "Transaction ID is missing" });
  }
  const updates = await Transaction.findById(req.body.id);
  if (!updates) {
    return res.status(442).json({ error: "Transaction not found" });
  }
  updates.TransactionURL = req.body.TransactionURL;
  updates.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      return res.json({
        success: true,
        msg: "TransactionURL has been successfully edited",
      });
    }
  });
});

export const updateTransactionStatus = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.id)
    return res.status(442).json({
      error: "Transaction ID is empty. Please pass in a Transaction ID",
    });

  if (!req.body.Active || !req.body.Pending) {
    if (!req.body.Active) {
      return res.status(442).json({
        error: "Please set Active to true or false.",
      });
    } else {
      return res.status(442).json({
        error: "Please set Pending to false.",
      });
    }
  }

  const updates = await Transaction.findById(req.body.id);

  if (!updates) {
    return res.status(442).json({ error: "Transaction not found." });
  }

  updates.Active = req.body.Active;
  updates.Pending = req.body.Pending;

  updates.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      return res.json({
        success: true,
        msg: "Transaction status has been successfully updated.",
      });
    }
  });
});

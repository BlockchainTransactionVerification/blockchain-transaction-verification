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
  console.log("you are in addTransaction backend");
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
  console.log("addTransaction backend supplier:" + typeof SellerID);
  console.log("addTransaction backend supplier:" + typeof ProdID);
  console.log("addTransaction backend supplier:" + typeof BuyerID);
  console.log("addTransaction backend supplier:" + Title);
  if (!BuyerID || !SellerID || !ProdID) {
    console.log("One of the fields is missing");
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
  //const buyIDString = String.toString(BuyerID);
  //const sellIDString = String.toString(SellerID);

  try {
    const buyer = await User.findById(BuyerID);
    console.log("found buyer");
    const seller = await User.findById(SellerID);
    console.log("found seller");
    if (!buyer || !seller) {
      console.log("User not found");
      return res.status(442).json({ error: "User not found" });
    }

    transaction.save().then((result, err) => {
      if (err) {
        console.log("error saving the transaction");
        return res.status(442).json({ error: err });
      }
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const hrefLink = process.env.BASE_URL;
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
      transaction,
      success: true,
      msg: "User has been successfully activated",
    });
  } catch {
    console.log("something happened trying to find buyer and seller");
    return res.status(442).json({ error: "Buyer or Seller was not found" });
  }
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
  try {
    const updates = await Transaction.find(req.body);
    if (!updates) {
      return res.status(442).json({ error: "User not found" });
    }
    return res.json(updates);
  } catch {
    console.log("something happened finding the transaction");
    return res.status(442).json({ error: "Transactions not found." });
  }
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
  try {
    const updates = await Transaction.findById(req.body.id, "Documents");
    if (!updates) {
      return res.status(442).json({ error: "User not found" });
    }
    return res.json(updates);
  } catch {
    console.log("something happened retrieving the documents");
    return res.status(442).json({ error: "documents could not be found." });
  }
});

export const getPendingTransaction = asyncHandler(async (req, res) => {
  const document = await Transaction.find({ Pending: false });
  console.log(document);
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
    return res.status(442).json({ error: "Documents is missing" });
  }

  try {
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
  } catch {
    console.log("something happened retrieving the transaction");
    return res
      .status(442)
      .json({ error: "something happened retrieving the transaction" });
  }
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

  try {
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
  } catch {
    console.log("something happened retrieving the transaction");
    return res
      .status(442)
      .json({ error: "something happened retrieving the transaction" });
  }
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

  try {
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
  } catch {
    console.log("something happened retrieving the transaction");
    return res
      .status(442)
      .json({ error: "something happened retrieving the transaction" });
  }
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

  try {
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
  } catch {
    console.log("something happened retrieving the transaction");
    return res
      .status(442)
      .json({ error: "something happened retrieving the transaction" });
  }
});

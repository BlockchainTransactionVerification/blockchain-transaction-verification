import sop from "../models/sopModel.js";
import User from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import sgMail from "@sendgrid/mail";

// Create SOP Controller

export const createSOP = asyncHandler(async (req, res) => {
  // CORS policy allow localhost
  res.set("Access-Control-Allow-Origin", "*");

  console.log("Inside Sop Controller");

  const { SupplierID, BuyerID, TransactionID, SopTitle, RequiredDocs } =
    req.body;

  if (!SupplierID || !SopTitle) {
    if (!SupplierID) {
      return res.status(442).json({
        error: "SupplierID is empty. Please pass in a SupplierID.",
      });
    } else {
      return res.status(442).json({
        error: "No Title was given. Please give the SOP a Title.",
      });
    }
  }

  const supplier = await User.findById(SupplierID);
  if (!supplier) return res.status(442).json({ error: "Supplier not found." });

  if (!BuyerID) {
    return res
      .status(442)
      .json({ error: "BuyerID is empty. Please pass in a BuyerID." });
  }

  const buyer = await User.findById(BuyerID);
  if (!buyer) {
    return res.status(442).json({ error: "Buyer not found." });
  }

  const SOP = new sop({
    SupplierID,
    BuyerID,
    TransactionID,
    SopTitle,
    RequiredDocs,
  });

  SOP.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: "Failed to save." });
    }
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const hrefLink = process.env.BASE_URL;
  const msg = {
    to: buyer.Email, // Change to your recipient
    from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
    subject: "New Active Transaction",
    text: `Hello ${buyer.RepFirstName}, You have a new Active Transaction`,
    //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here`,
    html: `Hello<strong> ${buyer.RepFirstName}</strong>,<br><br>${
      supplier.RepFirstName
    } from ${
      supplier.CompanyName
    } has accepted your transaction request.<br><br><a href=${
      hrefLink + "login"
    }> Click Here </a> and Log in to view 
               your new active transaction.`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("New active transaction notification sent.");
    })
    .catch((error) => {
      console.error(error);
    });

  return res.json({ success: true });
});

// Retrieve SOP Controller
export const retrieveSOP = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const SOPs = await sop.find(req.body);
  res.json(SOPs);
});

// Update SOP required document done field to true
export const updateSopDoc = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // Wrap this in a try catch
  try {
    const SOP = await sop.findById(req.body.id);

    if (!SOP) {
      return res.status(442).json({ error: "SOP not found." });
    }

    SOP.RequiredDocs.map((doc) => {
      if (doc._id == req.body.DocID) {
        doc.Done = true;
      }
    });

    SOP.save().then((result, err) => {
      if (err) {
        return res.status(442).json({ error: err });
      } else {
        return res.json({
          success: true,
          msg: "SOP status has been successfully updated.",
        });
      }
    });
  } catch {
    console.log("something happened retrieving the SOP for updates");
    return res.status(442).json({
      error: "something happened retrieving the SOP for updates",
    });
  }
});

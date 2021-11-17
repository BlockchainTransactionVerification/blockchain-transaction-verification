import file from "../models/fileModel.js";
// import User from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

// Create file controller
export const createFile = asyncHandler(async (req, res) => {
  // CORS policy allow localhost
  res.set("Access-Control-Allow-Origin", "*");

  const { TransactionID, SopID, RDID, OwnerID, OwnerAddress, CID, SharedWith } =
    req.body;

  var id;

  if (
    !TransactionID ||
    !SopID ||
    !RDID ||
    !OwnerID ||
    !OwnerAddress ||
    !CID ||
    !SharedWith
  ) {
    return res.status(442).json({ error: "Please add all of the fields" });
  }

  var encryptedCID = CryptoJS.AES.encrypt(
    CID,
    process.env.CJS_SECRET
  ).toString();

  const FILE = new file({
    TransactionID,
    SopID,
    RDID,
    OwnerID,
    OwnerAddress,
    CID: encryptedCID,
    SharedWith,
  });

  FILE.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    }
  });

  return res.status(200).json({
    success: true,
    message: "File created successfully.",
    CID: encryptedCID,
  });
});

// Retrieve files controller
export const retrieveFiles = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const FILES = await file.find(req.body);
  return res.json(FILES);
});

// Get a file's CID controller
export const getFileCID = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { CID } = req.body;
  if (!CID) {
    return res.status(442).json({ error: "A file CID must be passed in." });
  }
  const FILE = await file.findOne({ CID: CID });

  if (FILE) {
    var bytes = CryptoJS.AES.decrypt(FILE.CID, process.env.CJS_SECRET);
    var decryptedCID = bytes.toString(CryptoJS.enc.Utf8);
    return res.json({ CID: decryptedCID });
  } else {
    return res.status(404).json({ message: "File not found." });
  }
});

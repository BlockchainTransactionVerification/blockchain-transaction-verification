import express from "express";
import {
  createFile,
  retrieveFiles,
  getFileCID,
} from "../controllers/fileController.js";

const fileRouter = express.Router();

// Create a file
fileRouter.route("/createfile").post(createFile);

// Retrieve a file
fileRouter.route("/retrievefiles").post(retrieveFiles);

// Get a file's CID
fileRouter.route("/getcid").post(getFileCID);

// Update a file

export default fileRouter;

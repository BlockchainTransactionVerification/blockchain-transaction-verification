import express from "express";
import {
  createSOP,
  retrieveSOP,
  updateSopDoc,
} from "../controllers/sopController.js";

const sopRouter = express.Router();

// Create SOP
sopRouter.route("/createSOP").post(createSOP);

// Retrieve SOP
sopRouter.route("/retrieveSOP").post(retrieveSOP);

// Update SOP
//sopRouter.route("updateSOP").put(updateSOP);

// Delete SOP
//sopRouter.route("deleteSOP").delete(deleteSOP);

// Update Required Document
sopRouter.route("/updateSopDoc").post(updateSopDoc);

export default sopRouter;

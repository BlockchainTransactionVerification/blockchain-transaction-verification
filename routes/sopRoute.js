import express from "express";
import { createSOP, retrieveSOP } from "../controllers/sopController.js";

const sopRouter = express.Router();

// Create SOP
sopRouter.route("/createSOP").post(createSOP);

// Retrieve SOP
sopRouter.route("/retrieveSOP").get(retrieveSOP);

// Update SOP
//sopRouter.route("updateSOP").put(updateSOP);

// Delete SOP
//sopRouter.route("deleteSOP").delete(deleteSOP);

export default sopRouter;

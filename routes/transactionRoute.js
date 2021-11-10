import {
  addTransaction,
  getTransaction,
  getDocuments,
  updateDocuments,
  updateTransactionStatus,
} from "../controllers/transactionController.js";
import express from "express";

import transaction from "../models/transactionModel.js";
const transactionRouter = express.Router();

// express router method to create route to create a transaction
transactionRouter.route("/addTransaction").post(addTransaction);

// express router method to create route for updating transaction documents
transactionRouter.route("/updateDocuments").post(updateDocuments);

// express router method to create route for getting transactions documents
transactionRouter.route("/getDocuments").post(getDocuments);

transactionRouter.route("/getTransaction").post(getTransaction);

// express router method to create a route to update a transaction from pending to active, or from active to complete
transactionRouter
  .route("updateTransactionStatus")
  .post(updateTransactionStatus);

export default transactionRouter;

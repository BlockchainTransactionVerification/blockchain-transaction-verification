import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  ProdID: {
    type: String,
    required: true,
  },
  BuyerID: {
    type: String,
    required: true,
  },
  SellerID: {
    type: String,
    required: true,
  },
  Active: {
    type: Boolean,
    default: false,
    required: true,
  },
  Pending: {
    type: Boolean,
    default: true,
    required: true,
  },
  TransactionURL: {
    type: String,
    default: "",
  },
  Title: {
    type: String,
    default: "",
  },
  Documents: [
    {
      DocName: String,
      Responsible: String,
      Done: Boolean,
    },
  ],
});

const Transaction = mongoose.model("Transactions", transactionSchema);

export default Transaction;

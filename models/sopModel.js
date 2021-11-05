import mongoose from "mongoose";

const sopSchema = mongoose.Schema({
  SupplierID: {
    type: String,
    required: true,
  },
  BuyerID: {
    type: String,
    required: true,
  },
  TransactionID: {
    type: String,
    required: true,
  },
  SopTitle: {
    type: String,
    required: true,
    unique: true,
  },
  RequiredDocs: [
    {
      Type: String,
      Required: Boolean,
      Responsible: String,
      Template: String,
      Done: Boolean,
    },
  ],
});

const sop = mongoose.model("sop", sopSchema);

export default sop;

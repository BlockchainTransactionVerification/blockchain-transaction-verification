import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  TransactionID: {
    type: String,
    required: true,
  },
  SopID: {
    type: String,
    required: true,
  },
  RDID: {
    type: String,
    required: true,
  },
  OwnerID: {
    type: String,
    required: true,
  },
  OwnerAddress: {
    type: String,
    required: true,
  },
  CID: {
    type: String,
    required: true,
  },
  SharedWith: [
    {
      UID: String,
      Address: String,
    },
  ],
});

const file = mongoose.model("file", fileSchema);

export default file;

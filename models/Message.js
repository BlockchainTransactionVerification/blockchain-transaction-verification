//const mongoose = require("mongoose");
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Message", MessageSchema);
const Message = mongoose.model("Message", MessageSchema);
export default Message;
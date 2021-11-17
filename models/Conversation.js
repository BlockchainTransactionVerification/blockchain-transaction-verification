//const mongoose = require("mongoose");
import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Conversation", ConversationSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;



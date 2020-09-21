import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  people: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
});

const model = mongoose.model("Message", MessageSchema);

export default model;

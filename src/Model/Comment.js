import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
});

const model = mongoose.model("Comment", CommentSchema);

export default model;

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  content: String,
  time: String,
  imageUrls: [
    {
      type: String,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const model = mongoose.model("Post", PostSchema);

export default model;

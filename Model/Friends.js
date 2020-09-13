import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: String,
  avatarUrl: String,
  message: String,
});

const model = mongoose.model("Friends", FriendSchema);

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  avatarUrl: String,
  title: {
    type: String,
  },
  peoples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const model = mongoose.model("Room", RoomSchema);
export default model;

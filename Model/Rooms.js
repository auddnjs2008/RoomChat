import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: Number,
    required: "roomId is required",
  },
  title: {
    type: String,
    required: "title is required",
  },
  peoples: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const model = mongoose.model("Rooms", RoomSchema);
export default model;

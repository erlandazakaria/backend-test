import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: function () { return new mongoose.Types.ObjectId}
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants"
  }],
}, {versionKey: false});

const Collection = mongoose.model("collections", collectionSchema, "collections");
export default Collection;

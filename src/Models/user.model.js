import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: function () { return new mongoose.Types.ObjectId}
  },
  role: {
    type: Number
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: Number
  }
}, {versionKey: false});

const User = mongoose.model("users", userSchema, "users");
export default User;

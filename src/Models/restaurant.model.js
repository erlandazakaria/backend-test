import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: function () { return new mongoose.Types.ObjectId}
  },
  name: {
    type: String,
  },
  opening: {
    Sunday: {
      start: {type: String},
      end: {type: String},
    },
    Monday: {
      start: {type: String},
      end: {type: String},
    },
    Tuesday: {
      start: {type: String},
      end: {type: String},
    },
    Wednesday: {
      start: {type: String},
      end: {type: String},
    },
    Thursday: {
      start: {type: String},
      end: {type: String},
    },
    Friday: {
      start: {type: String},
      end: {type: String},
    },
    Saturday: {
      start: {type: String},
      end: {type: String},
    }
  }
}, {versionKey: false});

const Restaurant = mongoose.model("restaurants", restaurantSchema, "restaurants");
export default Restaurant;

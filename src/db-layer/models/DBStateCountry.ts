import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const DBCountry = new Schema({

  name: {
    type: String
  },
  createdTS: {
    type: Number,
    default: (new Date()).getTime()
  },
  updatedTS: {
    type: Number,
    default: (new Date()).getTime()
  }
},
  {
    timestamps: true
  }
);

DBCountry.index({}); // schema level

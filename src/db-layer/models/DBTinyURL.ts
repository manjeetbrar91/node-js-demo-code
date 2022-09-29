import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
export const DBTinyURLSchema = new Schema({

  code: {
    type: String
  },
  url: {
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
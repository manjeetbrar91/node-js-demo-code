import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";

const Schema = mongoose.Schema;

export const DBCity = new Schema({

  name: {
    type: String,
  },
  latitude: {
    type: Number,
    default: []
  },
  longitude: {
    type: Number,
    default: []
  },
  createdTS: {
    type: Number,
    default: (new Date()).getTime()
  },
  updatedTS: {
    type: Number,
    default: (new Date()).getTime()
  }
}, { _id: true });

export const DBStateCity = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: DBConstants.CountryCollection
  },
  name: {
    type: String
  },
  state_code: {
    type: String,
    default: []
  },
  cities: {
    type: [DBCity],
    default: []
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


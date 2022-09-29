

import * as mongoose from "mongoose";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBUserWishListSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.VehicleOwnersCollection,
        require: true
    },
    products: {
        type: [],
        default: []
    },


}, { timestamps: true })

DBUserWishListSchema.index({ userId: 1 });
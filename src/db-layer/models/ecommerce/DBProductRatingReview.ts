

import * as mongoose from "mongoose";
import { ProductType } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBProductRatingReviewSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.ProductCollection,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.VehicleOwnersCollection,
        require: true
    },

    rating: {
        type: Number,
        default: 1
    },

    review: {
        type: String,
        default: "",
    },


}, { timestamps: true })

DBProductRatingReviewSchema.index({ productId: 1 });
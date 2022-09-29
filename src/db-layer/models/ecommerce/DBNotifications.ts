

import * as mongoose from "mongoose";
import { ProductType } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBNotificationsSchema = new Schema({

    title: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
    clickAction: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    extra: {
        type: Schema.Types.Mixed
    },
    receiver: {
        type: String,
        default: ""
    }


}, { timestamps: true })

DBNotificationsSchema.index({ receiver: 1, userId: 1 });
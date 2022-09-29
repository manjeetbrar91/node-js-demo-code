
import * as mongoose from "mongoose";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;

export const DBProductVariantSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.ProductCollection,
        require: true
    },
    variantName: {
        type: String,
        require: true
    },
    variantType: {
        type: String,
        default: "Size"
    },
    msp: {
        type: Number,
        default: 0
    },
    mrp: {
        type: Number,
        default: 0
    },
    sellingPrice: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
    },
    productWeight: {
        type: String,
    },
    enableInventory: {
        type: Boolean,
        default: false
    },
    quantityAvailable: {
        type: Number,
        default: 0
    },
    stockAlertAt: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    qty: {
        type: Number,
        default: -1
    },
    qtyUnit: {
        type: String,
        default: ""
    },

}, { timestamps: true })

DBProductVariantSchema.index({ productId: 1 });

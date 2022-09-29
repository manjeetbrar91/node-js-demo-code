import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;

export const DBInventoryStoreStockClosingModel = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.InventoryItemCollection
    },
    unitId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.InventoryUnitMeasurementConverstion
    },
    variantId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.InventoryItemVariantCollection,
    },
    qty: {
        type: Number,
    },
    qtyUnit: {
        type: String,
    },

    priceQtyUnit: {
        type: Number,
    },
    averagePrice: {
        type: Number,
    },
    closingDate: {
        type: String
    },

    variantQTY: {
        type: Number,
    },
    variantAveragePrice: {
        type: Number,
    },
    variantLatestPrice: {
        type: Number,
    },
    variantQTYUnit: {
        type: String,
    },
    variantCurrentStockQTY: {
        type: Number,
    },

}, {
    timestamps: true
});

DBInventoryStoreStockClosingModel.index({ restaurantId: 1, itemId: 1, variantId: 1 }); // schema level


import * as mongoose from "mongoose";
import { ProductType } from "../../../service-layer/models/ecommerce/response/ProductModel";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBProductsSchema = new Schema({

    businessId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessCollection,
        require: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.CategoryCollection,
        require: true
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.SubCategoryCollection,
        require: true
    },
    productType: {
        type: String,
        default: ProductType.Regular
    },
    isVeg: {
        type: Boolean,
    },
    countryOfOrigin: {
        type: String,
    },
    productBrand: {
        type: String,
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
    showInTopProduct: {
        type: Boolean,
        default: false
    },
    showRecommend: {
        type: Boolean,
        default: false
    },
    productName: {
        type: String,
    },
    productCode: {
        type: String,//auto-generate
    },
    description: {
        type: String,
    },
    productFeatures: {
        type: String,
    },
    howToUse: {
        type: String,
    },


    averageRating: {
        type: Number,
        default: 0
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    thumbnailImage: {
        type: String,
    },
    defaultImage: {
        type: String,
    },
    totalViews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    photos: {
        type: [String],
        default: []
    },

    gstRate: {
        type: Number,
        default: 0
    },
    estimatedTime: {
        type: Number,
        default: 0
    },

    appointmentRequired: {
        type: Boolean,
        default: false
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

DBProductsSchema.index({ productId: 1 });
import * as mongoose from "mongoose";
import { BusinessTypeEnum } from "../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBProductSubCategorySchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.CategoryCollection,
        require: true
    },
    // businessType: {
    //     type: BusinessTypeEnum,
    //     default: BusinessTypeEnum.GroceryStore
    // },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessCollection
    },
    subCategoryName: {
        type: String,
        require: true,
        unique: true,
        index: true,
    },
    defaultImage: {
        type: String,
    },
    icon: {
        type: String
    },
    photos: {
        type: [String],
        default: []
    },
    sortingOrder: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        default: DBConstants.activeStatus
    },
    remarks: {
        type: String
    },
    categoryStatus: {
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

}, { timestamps: true });

DBProductSubCategorySchema.index({ subCategoryName: 1 }); // schema level
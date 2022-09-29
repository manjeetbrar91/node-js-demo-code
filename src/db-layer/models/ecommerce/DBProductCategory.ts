import * as mongoose from "mongoose";
import { BusinessTypeEnum } from "../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;


export const DBProductCategorySchema = new Schema({

    businessType: {
        type: BusinessTypeEnum,
        default: BusinessTypeEnum.GroceryStore
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessCollection
    },
    categoryName: {
        type: String,
        require:true
    },
    icon: {
        type: String
    },
    defaultImage: {
        type: String,
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
    categoryStatus: {
        type: String,
        default:"Pending"
    },
    remarks: {
        type: String
    },
    createdTS: {
        type: Number,
        default: (new Date()).getTime()
    },
    updatedTS: {
        type: Number,
        default: (new Date()).getTime()
    },


}, { timestamps: true });

DBProductCategorySchema.index({ accountId: 1 }); // schema level
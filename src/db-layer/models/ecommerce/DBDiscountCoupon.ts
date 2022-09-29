import * as mongoose from "mongoose";
import { DiscountType } from "../../../service-layer/models/Discount";
import { DBConstants } from "../DBConstants";

const Schema = mongoose.Schema;
export const DBDiscountCoupon = new Schema({
    businessId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessCollection,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    dontShowToCustomer: {
        type: Boolean,
        default: false
    },
    customerEligibility: {
        type: Object
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.FuelStation
    },
    discountType: {
        type: DiscountType
    },
    unusableCount: {
        type: Number
    },
    actualUsage: {
        type: Number
    },
    perCustomerUsage: {
        type: Boolean
    },
    limitTotalUsage: {
        type: Boolean
    },
    usageLimit: {
        type: Number
    },
    discountMetadata: {
        type: Object
    },
    orderTypes: {
        type: [],
        default: []
    },
    enable: {
        type: Boolean,
        default:true
    },
    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    },
    scheduleDays: {
        type: [],
        default: []
    },
    summaryCardList: {
        type: [],
        default: []
    },
}, { timestamps: true });

DBDiscountCoupon.index({ businessId: 1 }); // schema level
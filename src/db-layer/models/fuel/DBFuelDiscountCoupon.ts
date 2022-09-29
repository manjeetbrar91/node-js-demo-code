import * as mongoose from "mongoose";
import { DiscountType } from "../../../service-layer/models/Discount";
import { DBConstants } from "../DBConstants";

const Schema = mongoose.Schema;
export const DBFuelDiscountCoupon = new Schema({
    fuelStationId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.FuelStation,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.StationOwnersCollection,
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
    fuelTypes: {
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

DBFuelDiscountCoupon.index({ businessId: 1 }); // schema level
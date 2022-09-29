import * as mongoose from "mongoose";
import { Constants } from "../../../common/utils/ecommerce/Constants";
import { DBConstants } from "../DBConstants";
const Schema = mongoose.Schema;
export const DBUserDeliveryAddressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.VehicleOwnersCollection,
        required: true
    },

    status: {
        type: String,
        default: DBConstants.activeStatus
    },

    firstName: {
        type: String,
        required: true
    },
    primaryAddress: {
        type: Boolean,
        default: true
    },
    lastName: {
        type: String,
        required: true
    },
    addressType: {
        type: String,
        // required: true,
        default: "Home"
    },




    addressLine1: {
        type: String,
        require: true
    },
    addressLine2: {
        type: String,
        default: ""
    },
    locality: {
        type: String,
        default: ""
    },
    state: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India",
        required: true
    },
    countryAbbreviation: {
        type: String,
        default: "IN",
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    latitude: {
        type: Number,
        default: 0
    },
    longitude: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        require: true
    },
    countryCode: {
        type: Number,
        default: 91,
        require: true
    },



}, { timestamps: true })

DBUserDeliveryAddressSchema.index({ userId: 1 });
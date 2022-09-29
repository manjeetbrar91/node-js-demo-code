import * as mongoose from "mongoose";
import { BusinessUserAccountStatus, BusinessUserTypes } from "../../../service-layer/models/fuel/BusinessUserModel";

const Schema = mongoose.Schema;
export const DBBusinessUsers = new Schema({
    profileCompleted: {
        type: Boolean,
        default: false
    },
    pinUpdated: {
        type: Boolean,
        default: false
    },
    mobileVerified: {
        type: Boolean,
        default: false
    },

    countryCode: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },
    pin: {
        type: String
    },
    countryShortName: {
        type: String
    },

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    userType: {
        type: String, default: BusinessUserTypes.Owner
    },
    country: {
        type: String
    },
    pincode: {
        type: String
    },
    language: {
        type: String
    },
    image: {
        type: String
    },
    altMobileNumber: { type: String },
    dob: {
        type: String
    },
    latitude: {
        type: Number, default: 0
    },
    longitude: {
        type: Number, default: 0
    },
    status: {
        type: String,
    },
    accountStatus: {
        type: String,
        default: BusinessUserAccountStatus.pending
    },
}, { timestamps: true });

DBBusinessUsers.index({ businessId: 1 }); // schema level
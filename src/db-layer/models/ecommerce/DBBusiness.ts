import { Constants } from "../../../common/utils/ecommerce/Constants";
import * as mongoose from "mongoose";
import { BusinessTypeEnum } from "../../../service-layer/models/ecommerce/BusinessTypeEnum";
import { DBConstants } from "../DBConstants";
import { BusinessAvailabilityEnum } from "../../../service-layer/models/ecommerce/BusinessAvailabilityEnum";
const Schema = mongoose.Schema;
const DBUPIDetailsSchema = new Schema({
    primary: {
        type: Boolean,
        default: false
    },
    payeeAdress: {
        type: String,
        default: ""
    },
    payeeName: {
        type: String,
        default: ""
    },
    upiType: {
        type: String,
        default: "upi"
    },
    merchantCode: {
        type: String,
        default: ""
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        default: "active"
    },


}, { _id: false });
const DBBankDetailsSchema = new Schema({

    accountName: {
        type: String,
        default: ""
    },
    accountNumber: {
        type: String,
        default: ""
    },
    bankName: {
        type: String,
        default: ""
    },
    bankBranchName: {
        type: String,
        default: ""
    },
    bankIFSC: {
        type: String,
        default: ""
    },

}, { _id: false });
const DBPaymentSettingsSchema = new Schema({
    online: {
        type: Boolean,
        default: false
    },
    cod: {
        type: Boolean,
        default: false
    },
    bankDetails: {
        type: DBBankDetailsSchema,
        default: null
    },
    upi: {
        type: [DBUPIDetailsSchema],
        default: []
    }
}, { _id: false });

const DBDeliverySettingsSchema = new Schema({
    homeDelivery: {
        type: Boolean,
        default: false
    },
    inCarDelivery: {
        type: Boolean,
        default: false
    },
    inStorePickUp: {
        type: Boolean,
        default: false
    },
    homeDeliveryChargesEnabled: {
        type: Boolean,
        default: false
    },
    homeDeliveryCharges: {
        type: Object,
        default: false
    },
    freeHomeDelivery: {
        type: Boolean,
        default: 0
    },
    freeHomeDeliveryOrderAmount: {
        type: Number,
        default: 0
    },
    maxHomeDevliveryDistance: {
        type: Number,
        default: 0
    },
    packagingCharges: {
        type: Number,
        default: 0
    },
    packagingChargesPerItems: {
        type: Boolean,
        default: false
    },
    
    packagingChargesICD: {
        type: Number,
        default: 0
    },
    packagingChargesPerItemsICD: {
        type: Boolean,
        default: false
    },
    packagingChargesISP: {
        type: Number,
        default: 0
    },
    packagingChargesPerItemsISP: {
        type: Boolean,
        default: false
    },

}, { _id: false });



export const DBBusinessSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.BusinessOwners,
        required: true
    },
    fuelStation: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.FuelStation,
        required: true
    },
    status: {
        type: String,
        default: DBConstants.activeStatus
    },
    businessId: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessLegalName: {
        type: String,
        required: true
    },
    altNumber: {
        type: String,
        required: false,
        default: ""
    },
    gstNumber: {
        type: String,
        required: true,
        unique: true,
    },
    businessType: {
        type: BusinessTypeEnum,
        default: BusinessTypeEnum.GroceryStore,
        required: true
    },
    orderSequenceNumber: {
        type: Number,
        default: 100
    },
    orderSequenceNumberPrefix: {
        type: String,
        default: DBConstants.defaultSequenceNumberPreFix
    },
    startTime: {
        type: String,
        default: Constants.DEFAULT_START_TIME
    },
    endTime: {
        type: String,
        default: Constants.DEFAULT_END_TIME
    },
    countryCode: {
        type: String,
        default: "+91",
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    emailAddress: {
        type: String,
        default: ""
    },
    primaryLanguage: {
        type: String,
        default: Constants.DEFAULT_LANGUAGE
    },
    primaryCurrency: {
        type: String,
        default: Constants.DEFAULT_CURRENCY
    },
    primaryCurrencySymbol: {
        type: String,
        default: Constants.DEFAULT_CURRENCY_SYMBOL
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
    // geoLocation: {
    //     type: String,
    //     coordinates: []
    // },
    geoLocation: {
        type: { type: String },
        coordinates: [Number],
    },
    latitude: {
        type: Number,
        default: 0
    },
    longitude: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    availabilityStatus: {
        type: String,
        default: BusinessAvailabilityEnum.Open
    },
    deliverySettings: {
        type: DBDeliverySettingsSchema,
    },
    paymentSettings: {
        type: DBPaymentSettingsSchema,
    },
    businessTiming: {
        type: [],
        default: []
    },
    businessCurrencySettings: {
        type: [],
        default: []
    }
}, { timestamps: true })

DBBusinessSchema.index({ geoLocation: "2dsphere", ownerId: 1 });
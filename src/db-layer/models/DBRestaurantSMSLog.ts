import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;

const DBRecipientSchema = new Schema({
        phoneNumber: {
            type: Number
        },
        deliveryStatus: {
            type: String
        },
        message: {
            type: String
        },
        creditsUsed: {
            type: Number
        }
    }, 
    { 
        _id: false 
    });

// to be deleted
export const DBRestaurantSMSLogSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    message: {
        type: String
    },
    recipients: {
        type: [DBRecipientSchema]
    },
    creditUsed: {
        type: Number
    },
    sentOn: {
        type: Date
    },
    transactionId: {
        type: String
    }
},
    {
        timestamps: true
    }
);

DBRestaurantSMSLogSchema.index({ accountId: 1 }); // schema level
DBRestaurantSMSLogSchema.index({ accountId: 1, transactionId: 1 });
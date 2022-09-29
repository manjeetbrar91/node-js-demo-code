import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;
const DBSmsConfigurationSchema = new Schema({
    channel: {
        type: String
    },
    smsType: {
        type: String
    },
    deliveryMode: {
        type: String
    },
    templateName: {
        type: String
    },
    isEnabled: {
        type: Boolean
    }
}
);

export const DBRestaurantSMSSettingSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    accountType: {
        type: String
    },
    credit: {
        type: Number
    },
    creditExpiry: {
        type: Date
    },
    senderId: {
        type: String
    },
    isEnabled: {
        type: Boolean
    },
    smsConfiguration: {
        type: [DBSmsConfigurationSchema]
    }
},
    {
        timestamps: true
    }
);

DBRestaurantSMSSettingSchema.index({ accountId: 1 }); // schema level


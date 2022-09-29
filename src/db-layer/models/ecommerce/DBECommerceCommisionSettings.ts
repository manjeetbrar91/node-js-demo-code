import { DBConstants } from "../../../db-layer/models/DBConstants";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommisionSetting = new Schema({
    fixedFee: {
        type: Number,
        default: 0
    },
    ihf: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    },
}, { _id: false });

export const DBECommerceCommisionSettings = new Schema({

    userCommisionSettings: {
        type: CommisionSetting
    },
    businessCommisionSettings: {
        type: CommisionSetting
    },
    status: {
        type: String,
        default: DBConstants.activeStatus
    }
},
    {
        timestamps: true
    }
);



import * as mongoose from "mongoose";
const Schema = mongoose.Schema;


export const DBDevicesSchema = new Schema({
    deviceId: {
        type: String,
        default: ""
    },
    pushToken: {
        type: String,
        default: ""
    },
    deviceType: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    userId1: {
        type: String,
        default: ""
    },
    userId2: {
        type: String,
        default: ""
    },
    badge: {
        type: Number,
        default: 0
    },


}, { timestamps: true })

DBDevicesSchema.index({ receiver: 1, userId: 1 });
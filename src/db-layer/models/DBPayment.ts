import * as mongoose from "mongoose";
import { DBConstants } from "./DBConstants";
const Schema = mongoose.Schema;
export const DBPaymentSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.UserOrdersCollection
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.CustomersCollection
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: DBConstants.RestaurantsCollection
    },
    paymentGatewayRefId: {
        type: String
    },
    paymentAmount: {
        type: Number
    },
    usedPointsAmount: {
        type: Number
    },
    eligiblePointsAmount: {
        type: Number
    },
    paymentStatus: {
        type: String
    },
    postPaymentRefId: {
        type: String
    },
    paymentGatewaySignature: {
        type: String
    },
    currency: {
        type: String
    }
}, { timestamps: true })

DBPaymentSchema.index({ orderId: 1 });